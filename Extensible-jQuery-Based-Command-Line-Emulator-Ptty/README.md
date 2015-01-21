# Ptty.jquery.js

[Ptty](http://code.patxipierce.com/jquery-plugin/ptty/) is a jQuery plugin that creates an expansible terminal emulator. It is small, it is fast and it is fully customizable by adding commands and callbacks.

* Current version 0.0.3
* Size 9.9 Kb (minified)

## Features

Ptty comes with a set of little helpers so to be as light and scalable as possible, It can:

* Expand on demmand using the <code>$.register_command()</code> method.
* It auto-documents all commands and usage by requiring command descriptions and usage.
* Add callbacks (including other jQuery plugins) with the <code>$.register_callback()</code> command.
* Sub-routines are available.
* Command refreshing by using the <code>$.flush_commands()</code> method.
* Fully CSS themable.
* Upload files via AJAX.
* Its not perfect but its readable.
* Command History, help and clear commands.

## Usage

To start Ptty simply do the following:

    $(document).ready(function(){
        $('#terminal').Ptty();
    });

Or you can use [options](http://code.patxipierce.com/jquery-plugin/ptty/#options):
    
    $(document).ready(function(){
	    $('#terminal').Ptty({
	        url    : 'ajax/',
	        ps     : '',
	        theme  : 'boring',
	        welcome: 'Welcome to the matrix.'
	    });
	});
## Demo & Docs

Please see the [online documentation](http://code.patxipierce.com/jquery-plugin/ptty/) to learn about the plugin options and response structure or look at the [Demo](http://code.patxipierce.com/jquery-plugin/ptty/demo) for a full screen example.
