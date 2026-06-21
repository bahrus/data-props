//@ts-check

/** @import {EMC} from './types/mount-observer/types' */;
/** @import {AllProps, Actions} from './types/data-props/types' */
/** @import {RAConfig} from './types/roundabout/types' */
/** @import {PatternConfig} from './types/nested-regex-groups/types' */

/** @type {PatternConfig[]} */
const parsePatterns = [
    {
        name: 'idReference',
        pattern: String.raw `^#(?<id>\S+)`,
        description: 'Element reference by ID: #elementId'
    }
];

/**
 * @type {EMC<any, AllProps, Element, RAConfig<AllProps, Actions> >}
 */
export const emc = {
    enhConfig: {
        enhKey: 'DataProps',
        spawn: 'data-props/data-props.js',
        withAttrs: {
            base: 'data-props',
            _base: {
                mapsTo: 'parsedStatements',
                parser: 'parse-pattern-statements',
                instanceOf: 'Array',
                parserConfig: parsePatterns
            }
        }
    },
    customData: {
        weakRef: {
            properties: ['enhancedElement']
        },
        compacts: {
            when_parsedStatements_changes_call_hydrate: 0,
        }
    }
}

export function render(){
    return JSON.stringify(emc, null, 4);
}

console.log(render());
