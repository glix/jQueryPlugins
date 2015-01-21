Version 0.0.2

Explainys was my first jQuery plugin. When I wrote it I was fairly new to programming.
It would benefit from a complete rewrite. But since I never used it I have little interest in doing so.
This latest version is a massive cleanup. I have also introduced build tools.

# explainys.js
jQuery plugin to add sidenotes for your articles. It might be described as the opposite to hover bubbles.

## Usage
Add plugin to page, after jQuery.

```js
jQuery().ready(function() {
  jQuery('#main').explainys({
    // options
    textFail: 'Write your own failtext'
  });
});
```

```html
<span class="explain" data-title="" data-explain=""></span>
```

## Note
Implemented with html5 details element.
Chrome 12 and up is the only browser that has full support for this element.
No fallback methods implemented.
