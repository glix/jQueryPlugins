# c_alert
c_alert.js is a jQuery plugin to simply create custom alert.

<h1>Getting started:</h1>

<h3>1. Load jQuery and include c_alert's plugin files</h3>

After you download c_alert, move c_alert.css and c_alert.js to your root's CSS and JavaScript directories.
Next, load jQuery and include c_alert's CSS and JavaScript files inside of your tags:
<pre>
<code>&#x3C;head&#x3E;
  ...
    &#x3C;script src=&#x22;jquery.js&#x22;&#x3E;&#x3C;/script&#x3E;&#x9;
    &#x3C;script src=&#x22;c_alert.js&#x22;&#x3E;&#x3C;/script&#x3E;
    &#x3C;link href=&#x22;http://fonts.googleapis.com/css?family=Montserrat:400,700&#x22; rel=&#x22;stylesheet&#x22; type=&#x22;text/css&#x22;&#x3E;
    &#x3C;link rel=&#x22;stylesheet&#x22; type=&#x22;text/css&#x22; href=&#x22;css/c_alert.css&#x22; /&#x3E;
  ...
&#x3C;/head&#x3E;</code></pre>
<h3>2. Set up the alert</h3>
This is an example of alert setup, for all values and properties click <a href="#properties">here</a>
<pre>
<code class="js">var options = {
  scrollbar: false,
  width: "50%",
  color: "#ffffff",
  font: "'Montserrat', sans-serif",
  uppercase: true,
  x_toclose: true
}
c_alert_settings(options);
</code>
</pre>
<h3 style="color:#0078c9">3. Manage the alert</h3>
<pre>
<code class="js">/*c_alert have two optional parameters:
-First one: "html" -&#x3E; the simple text or html text that will appear in the alert.
-Second one: "button" -&#x3E; the text for the window button[default: "Ok"], if you put put an empty string for this parameter, there's no button.
If you call the function without both parameters, this will return the text into it.
*/
//Examples
c_alert('Heyyy, this is first example!'); //it will show you the alert with simple text:"Heyyy, this is first example!".
c_alert(); //in this case it will return "Heyyy, this is first example!".
c_alert_close(); //this will close the alert.
</code>
</pre>
for all documentation open documentation.html
