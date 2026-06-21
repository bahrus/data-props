// @ts-check
/** @import {Actions, PAP, AllProps, AP} from './types/data-props/types' */;
/** @import {RoundaboutOptions} from './types/roundabout/types' */;
/** @import {ElementEnhancementGateway, SpawnContext} from './types/assign-gingerly/types' */;
/** @import {EMC} from './types/mount-observer/types' */;
/** @import {RAConfig} from './types/roundabout/types' */;
/** @import {Infer} from './types/inferencer/types' */;

/**
 * @implements {Actions}
 */
class DataProps {

    /**
     * @this {AllProps & Actions}
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    constructor(enhancedElement, ctx, initVals){
        this.init(this, enhancedElement, ctx, initVals);
    }

    /**
     * @param {AllProps} self 
     * @param {Element & ElementEnhancementGateway} enhancedElement 
     * @param {SpawnContext} ctx 
     * @param {PAP} initVals 
     */
    async init(self, enhancedElement, ctx, initVals){
        const {customData} = /** @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions>>} */ (ctx.emc);
        /**
         * @type {RoundaboutOptions}
         */
        const raOptions = {
            ...customData,
            vm: self,
            initialPropVals: {
                enhancedElement,
                ...customData?.defaultPropVals,
                ...initVals
            }
        };
        (await import('roundabout-lib/roundabout.js')).roundabout(raOptions);
    }

    /**
     * @param {AP} self 
     * @returns {Promise<PAP>}
     */
    async hydrate(self){
        const {parsedStatements, enhancedElement} = self;
        const {success, statements} = parsedStatements;
        if(!success) throw 400;
        const {inferEventType, inferValueProperty} = await import('inferencer/inferencer.js');
        for(const statement of statements){
            const {value} = statement;
            if(!value) continue;
            const {remoteSpecifiers} = value;
            if(!remoteSpecifiers) continue;
            for(const remoteSpecifier of remoteSpecifiers){
                const {id} = remoteSpecifier;
                if(!id) continue;
                const rootNode = enhancedElement.getRootNode();
                const remoteEl = /** @type {Document | ShadowRoot} */ (rootNode).getElementById(id);
                if(!remoteEl){
                    console.warn(404, enhancedElement, remoteSpecifier);
                    continue;
                }
                const datasetName = lispToCamel(id);
                const evtType = inferEventType(remoteEl);
                const propName = inferValueProperty(remoteEl);
                // Set initial value
                setDataAttr(enhancedElement, datasetName, remoteEl[propName]);
                // Listen for changes
                remoteEl.addEventListener(evtType, () => {
                    setDataAttr(enhancedElement, datasetName, remoteEl[propName]);
                });
            }
        }
        return /** @type {PAP} */({
            resolved: true,
        });
    }
}

/**
 * @param {Element} el 
 * @param {string} name 
 * @param {any} val 
 */
function setDataAttr(el, name, val){
    if(val === undefined || val === null){
        delete /** @type {HTMLElement} */ (el).dataset[name];
    } else {
        /** @type {HTMLElement} */ (el).dataset[name] = val.toString();
    }
}

/**
 * Converts lisp-case string to camelCase
 * @param {string} s 
 * @returns {string}
 */
function lispToCamel(s){
    return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export {DataProps};
