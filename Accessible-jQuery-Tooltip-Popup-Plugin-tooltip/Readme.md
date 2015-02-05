# An Accessible jQuery Tooltip Plugin

Accessibility is one aspect often lacking in web development. Tooltip popups should happen when a user hovers or focuses over a given target element.

## Browser Support

IE8+, Chrome, Firefox, Opera, Safari, iOS Safari, Android

## Markup

When creating a tooltip, make sure the actual tooltip (the element containing `role="tooltip"`) has a unique `id`, and that source element points to that `id` in its `aria-describedby`. 
```html
<a
  href="#"
  class="tooltip"
  aria-haspopup="true"
  aria-describedby="tip1">
  <span
    class="anchor-text"
    role="presentation">I contain a tooltip
  </span>
</a>

<div role="tooltip" id="tip1" aria-hidden="true">
  Tooltip text goes <strong>here</strong>
</div>
```

### On Hover
<p align="center">
  <img src="https://dl.dropboxusercontent.com/u/24799515/img_share/on_hover.jpg" alt="">
</p>

### On Focus
<p align="center">
  <img src="https://dl.dropboxusercontent.com/u/24799515/img_share/on_focus.jpg" alt="">
</p>


## Initialize

```javascript
$(".tooltip").tooltip(); // Initialize n tooltips
```
