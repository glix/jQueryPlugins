Curtail
=======

A small jQuery plugin that truncates text to a specific number of characters, and allows for show more text.

Features
--------

* set character limit
* ellipsis at the end of text
* show more text enabled
* ~ 1kb minified

Usage
-----

Specify the parent container of the text as a selector, and then set the limit parameter to the amount of characters you would like to be displayed.

HTML

```html
<div class="foo">
	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste dolor odio fugit nostrum, doloribus, earum. Ducimus cum vel amet quas earum ullam, minus, minima hic, est fuga culpa eius provident.</p>
	<a href="#">Show More</a>
</div>
```

JS

```html
<script>
    $(function(){
        $('.foo').curtail({
            limit: 128
        });
    });
</script>
```

Result

![Image of plugin working](https://cloud.githubusercontent.com/assets/9528895/5794136/9f786b30-9f58-11e4-8adb-5d8a22c07ed9.PNG)

By default, the plugin limits text to 250 characters.

Demo
----

http://arniekoz.github.io/projects/curtail

Details
-------

* You will need [jQuery](http://jquery.com/) to run this plugin.

License
-------

Public domain.
