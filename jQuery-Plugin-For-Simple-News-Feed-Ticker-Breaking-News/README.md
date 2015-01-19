#jQuery Breaking News Plugin

A basic plugin for accessing data from feed URL by [Google Feed APIs](https://developers.google.com/feed/) .


## Get Started



### Load jQuery and breakingNews plugin

After you download breaking-news plugin, move breakingNews.css and jquery.breakingNews.min.js into your CSS and JavaScript directories. Next, load jQuery and breakingNews's CSS and JavaScript files inside of your html page:

```
<!doctype html>
<html>
	<head>
		...

		<link rel="stylesheet" href="css/breakingNews.css">
	</head>
	<body>
	  	... 

		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="js/jquery.breakingNews.min.js"></script>
	</body>
</html>

```

### Set up your HTML
For showing the results in `div.feed` tag you should activate the plugin

```<div class="feed"></div>```

### Activate breakingNews

```
<!doctype html>
<html>
	<head>
		...
		<link rel="stylesheet" href="css/breakingNews.css">
		...
	</head>
	<body>
	  	... 
	  	<div class="feed"></div>
		
		...
		<script src="http://code.jquery.com/jquery.js"></script>
		<script src="js/jquery.breakingNews.min.js"></script>
		...

		<script>
			$('.feed').breakingNews('your feed URL');
		</script>
	</body>
</html>

```
###Customizing breakingNews's Functionality

breakingNews's options gives you a wide range of ability to control your breakingNews plugin. To learn more about what each of these options do, read the [documentation section](http://mehral.com/projects/jquery-breakingnews/#options).



## Demo
[Demo](http://m3hrdadfi.github.io/jquery-bn/)
