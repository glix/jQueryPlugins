# jQuery Hmbrgr Plugin

jQuery Plugin to achieve the "Hamburger effect"

## Usage

##### Create the element in your HTML:

 ```html
	<a href="#" class="hmbrgr"></a>
 ```

##### Include jQuery:

 ```html
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
 ```

##### Include plugin's code:

 ```html
	<link rel="stylesheet" type="text/css" href="assets/js/hmbrgr.min.css" />
	<script src="assets/js/jquery.hmbrgr.min.js"></script>
 ```

##### Call the plugin:

 ```javascript
	$('.hmbrgr').hmbrgr({
		width     : 60, 		// optional - set hamburger width
		height    : 50, 		// optional - set hamburger height
		speed     : 200,		// optional - set animation speed
		barHeight : 8,			// optional - set bars height
		barRadius : 0,			// optional - set bars border radius
		barColor  : '#ffffff'	// optional - set bars color
	});    
 ```

## License

MIT: http://mdd.mit-license.org
