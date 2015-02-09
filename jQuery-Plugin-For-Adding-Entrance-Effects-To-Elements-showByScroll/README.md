Show by scroll
========

JQuery plugin for display blocks by scrolling window

Need JQuery http://jquery.com/download/

#### 1. First need connect jquery.showbyscroll plugin

```html
<script src=”jquery.showbyscroll.min.js”></script>
```

#### 2. Initialization function for the desired element
```javascript
$(function() {
	$( '.showbyscroll' ).showByScroll({
		'class': 'show',
		'onlyView': false,
		'offsetIndex': 1.5
	});
});
```
- **class** *[string]* - which class add when the object is visible (default: "show");
- **onlyView** *[boolean]* - handle the items above viewport? (default: false)
- **offsetIndex** *[float]* - screen height divided by the Index (default: 2).

#### 3. Trigger for added class and element showed
```javascript
$( '.showbyscroll' ).on('showedByScroll', function() {
	console.log('element.trigger("showedByScroll")')
});
```