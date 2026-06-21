# data-props

data-props is an HTML enhancement that reflects peer elements or the host's properties to data-* attributes.  This is useful for styling, among other reasons.

[![NPM version](https://badge.fury.io/js/data-props.png)](http://badge.fury.io/js/data-props)
[![How big is this package in your project?](https://img.shields.io/bundlephobia/minzip/data-props?style=for-the-badge)](https://bundlephobia.com/result?p=data-props)
<img src="http://img.badgesize.io/https://cdn.jsdelivr.net/npm/data-props?compression=gzip">
[![Playwright Tests](https://github.com/bahrus/data-props/actions/workflows/CI.yml/badge.svg?branch=baseline)](https://github.com/bahrus/data-props/actions/workflows/CI.yml)

```html
<label>
    a: <input id=a>
</label>
<label>
    b: <input id=b type=checkbox>
</label>
<label>
    c: <input id=c type=number>
</label>
<label>
    d: <input id=d type=date>
</label>
<div data-props="#a #b #c #d"></div>
```

What this does:

sets data-[id] of the adorned element to the value of the input element:

```html
<div data-a=... data-b=... data-c=... data-d=...>
```

## Viewing Locally

Any web server that serves static files with server-side includes will do but...

1. Install git
2. Fork/clone this repo
3. Install node.js
4. Open command window to folder where you cloned this repo
5. > git submodule add https://github.com/bahrus/types.git types
6. > git submodule update --init --recursive
7. > npm install
8. > npm run serve
9. Open http://localhost:8000/demo/ in a modern browser

## Running Tests

```
> npm run test
```

## Using from ESM Module:

```JavaScript
import 'data-props/emc.js';
```

## Using from CDN:

```html
<script type=module crossorigin=anonymous>
    import 'https://esm.run/data-props';
</script>
```

