/**
 * @file   : Ptty.jquery.js
 * @ver    : 0.1
 * @Author : Patxi Pierce
 * @url    : http://code.patxipierce.com/jquery-plugin/ptty/
 * @desc   : Ptty (Pachanka's teletype). A terminal emulator plugin for jQuery. 
 * @note   : Based on wterm.js by Venkatakrishnan Ganesh.
 * @license: Copyright 2014 Patxi Pierce <mail@patxipierce.com>
 *           This work is free. You can redistribute it and/or modify it under the
 *           terms of the Do What The Fuck You Want To Public License, Version 2,
 *           as published by Sam Hocevar. See the COPYING file for more details.
 *
 * */

( function( $ ) {
     
    var version = '0.0.1';

    /**
    * @function : get_defaults
    * @returns  : Object
    * @desc     : Returns Global Defaults
    * */
    var get_defaults = function() {

        return {
            // The standard url that should be used to make requests
            url          : window.location.pathname,

            // The HTTP Method that must be used for Ajax Requests
            method       : 'POST',

            // The GET/POST parameter that should be used to make requests
            param        : 'cmd',

            // Class of the the primary terminal container
            tty_class    : 'cmd_terminal',

            // ps : The Primary Prompt
            ps           : '',

            // The theme that is applied by default
            theme        : 'boring',

            // Explicitly set width and height of the terminal
            // container. This may also be done in tty_class
            width        : '100%',
            height       : '100%', 

            // Message to be shown when the terminal is first 
            welcome      : 'Ptty v.' + version,

            // The password placeholder symbol
            placeholder  : '*',

            // When command is not found: "CMD" will be replaced
            not_found    : '<div> CMD: Command Not Found </div>',

            // Prefix for error messages
            error_prefix : 'An Error Occured: ',

            // Is Autocomplete feature Enabled
            autocomplete : true,

            // Is Command History Enabled
            history      : true,

            // Number of entries to be stored in history
            history_max  : 800,
        };
    };

 
    /**
    * @property : dispatch
    * @accessor : $.register_command ( See Below )
    * @private
    * @desc     : Stores command name and action to be taken when user enters a command.
    **/
    var dispatch = {};

    /**
    * @property : callbacks
    * @accessor : $.register_callback ( See Below )
    * @private
    * @desc     : Callbacks object that stores callback methods.
    **/
    var callbacks = {};

    /**
    * @property : history
    * @accessor : $.fn.Ptty
    * @private
    * @desc     : Mantains the record of called commands
    **/
    var history  = [ ];

    /**
    * @property : cmd_opts
    * @accessor : $.set_command_option ( See Below )
    * @private
    * @desc     : Options of current command.
    **/
    var cmd_opts = {
        // If set, edits the subroutine name
        cmd_name  : null,
        // Command class
        cmd_class : null,
        // The ps value
        cmd_ps    : null,
        // The command string
        cmd_in    : null,
        // The output of the command.
        cmd_out   : null,
        // Set to true when you don't want cmd_in to be recorded
        cmd_quiet : null, 
        // Set to a unique sting for secure transactions
        cmd_token : null, 
        // Acumulates a string for a subroutine to use
        cmd_query : null,
    };

    /**
    * @method   : native_commands
    * @accessor : $.flush_commands and $.fn.Ptty
    * @private
    * @desc     : Registers the native Ptty commands
    **/
    var native_commands = function(options){
        // Merge defaults with options
        var settings = get_defaults();
        $.extend( true, settings, options );
        
        $.register_command(
            'clear',
            'Cleans the screen leaving a new command prompt ready.',
            'clear [no options]',
            function() {
                //cmd_opts.cmd_quiet = true;
                $('.' + settings.tty_class + '_content').html( '' );
                return { type : 'print', out : '', quiet : 'clear' };
            }
        );

        $.register_command(
            'history',
            'Shows list of typed in commands.',
            'history [no options]',
            function() {
                var hist_out = '';
                if(settings.history && history.length > 0){
                    var i, tmp;
                    for( i in history ) {
                        tmp = history[i];
                        hist_out += '<li>' + tmp + '</li>';
                    }
                    hist_out = '<ul class="ve-li">' + hist_out + '</ul>';
                }
                return { type : 'print', out : hist_out };
            }
        );

        $.register_command(
            'help',
            'Displays a list of useful information.',
            'help [ [-a | --all] | [command] ]',
            function(tokens) {
                var help_out = '';
                if(typeof tokens[1] === 'string' && tokens[1].length > 0){
                    var cmd_to_show = $.trim(tokens[1]);
                    if(cmd_to_show == '-a' || cmd_to_show == '--all'){
                        help_out = 'Available commands are:</br><ul class="ve-li">'
                        for( i in dispatch ){
                            help_out += '<li><p><b>'+i+'</b> - '+dispatch[i].desc+'</br>';
                            help_out += 'Usage: '+dispatch[i].usage+'</p></li>';
                        }
                        help_out += '</ul>'+"\n";
                    }else if(typeof dispatch[cmd_to_show] !== 'undefined'){
                        help_out  = '<b>'+cmd_to_show+'</b> - '+dispatch[cmd_to_show].desc+'</br>';
                        help_out += 'Usage: '+dispatch[cmd_to_show].usage+"\n";
                    }else{
                        help_out = 'help:</br>The "' + cmd_to_show + '" option does not exist.'+"\n";
                    }
                }else{
                    help_out  = 'Use "help [comand name]" to display specific info about a command.</br>'+"\n";
                    help_out += 'Available commands are:</br><ul class="sq-li">';
                    for( i in dispatch ){
                        help_out += '<li>'+i+'</li>';
                    }
                    help_out += '</ul>'+"\n";   
                }
                return { type : 'print', out : help_out };
            }
        );
    };

    /**
    * @method : Ptty
    * @public
    * @desc   : Sets up the terminal on the jQuery object that represents a group of HTML nodes
    * @args   : object
    **/
    $.fn.Ptty = function( options ) {

        // Merge defaults with options
        var settings = get_defaults();
        $.extend( true, settings, options );

        // jQuery Plugin
        return this.each( function() {

            var element  = $( this );
            var hcurrent = null;

            // Setup some markup in the element
            // required for terminal emulation
            element.addClass( settings.tty_class ).addClass( settings.tty_class +'_theme_'+ settings.theme );
            if( settings.width && settings.height ){
                element.css( { width: settings.width, height: settings.height } );
            }

            element.html( '' ).append( '<div class="'+settings.tty_class+'_loading"><span></span></div>' );
            element.append( '<div class="' + settings.tty_class + '_content"><div>' + settings.welcome + '</div></div>' );
            element.append( '<div class="' + settings.tty_class + '_prompt"><span class="' + settings.tty_class + '_ps">'
            + '<span class="' + settings.tty_class + '_active">' + settings.ps + '</span>&nbsp;</span>'
            + '<form><input type="text" /><input type="password" /></form></div>');
            
            // Representing prompt, form, input and content section in the terminal
            var prompt     = element.find( 'div:last span:last' );
            var input_form = element.find( 'div:last form' );
            var input      = input_form.find( 'input' );
            var txt_input  = input_form.find( 'input[type=text]' );
            var psw_input  = input_form.find( 'input[type=password]' );
            var content    = element.find( 'div.' + settings.tty_class + '_content' );
            var loading    = element.find( 'div.' + settings.tty_class + '_loading' );
            
            // Custom Dispatcher
            var cdispatch  = null;

            // Storage for autocomplete and history
            var saved      = { ac_save : null, h_save : null };

            // Cursor always needs to be on the prompt
            $(function() { txt_input.focus(); });
            element.bind('select focus click', function(){
                if(txt_input.is(':visible')){
                    txt_input.focus();
                }else if(psw_input.is(':visible')){
                    psw_input.focus();
                }
            });

            // Register commands
            native_commands(options);

            /**
            * @method   : update_content
            * @private  :
            * @desc     : Updates the content section. Must be the last function called.
            * @args     : p, command, data
            **/
            var update_content = function( p, command, data ) {
                // Override command options if any.
                var command_name = command_class = ps = null;
                var input = output = quiet = token = query = null;
                var option, value;
                for(option in cmd_opts){
                    value = cmd_opts[option];
                    if(value !== null){
                        switch( option ) {
                            case 'cmd_name':
                                command_name = value;
                            break;
                            case 'cmd_class':
                                command_class = value;
                            break;
                            case 'cmd_ps':
                                ps = value;
                            break;
                            case 'cmd_in':
                                input = value;
                            break;
                            case 'cmd_out':
                                output = value;
                            break;
                            case 'cmd_quiet':
                                quiet = value;
                            break;
                            case 'cmd_token':
                                token = value;
                            break;
                            case 'cmd_query':
                                query = value;
                            break;
                        }
                    }
                    // Reset all options
                    cmd_opts[option] = null;
                }

                // These options are persistent
                cmd_opts.cmd_name  = command_name;
                cmd_opts.cmd_token = token;
                cmd_opts.cmd_query = query;
                cmd_opts.cmd_ps    = ps;

                // out
                cmd_opts.cmd_class = (cdispatch) ? settings.tty_class + '_sub' : settings.tty_class + '_ps';
                if(command_class === null) command_class = cmd_opts.cmd_class;
                if( output ) data   = output;
                if( input !== null ) command = input;

                if( quiet == 'clear' ){
                    content.html('');
                    p = '';
                }else if( quiet == 'password'){
                    p = '<span class="' + command_class + '"><span>' + p + '</span>&nbsp;'
                    + Array(command.length+1).join(settings.placeholder) +'</span>';
                }else if( quiet == 'blank' ){
                    p = '<span class="' + command_class + '"><span>' + p + '</span>&nbsp;</span>';
                }else{
                    p = '<span class="' + command_class + '"><span>' + p + '</span>&nbsp;' + command +'</span>';
                }

                content.append( '<div>' + p + '<div>' + data + '</div></div>' );

                // End loading.
                loading.fadeOut(300);
                prompt.show();
            };

            /**
            * @method   : get_prompt 
            * @private  :
            * @desc     : Get the current prompt
            **/
            var get_prompt = function() {
                return (cmd_opts.cmd_ps !== null) ? cmd_opts.cmd_ps : settings.ps;
                //return prompt.html();
            };

            /**
            * @method   : set_prompt 
            * @private  :
            * @desc     : Set the current prompt
            **/
            var set_prompt = function() {
                return (cmd_opts.cmd_ps) ? prompt.html(cmd_opts.cmd_ps) : prompt.html(settings.ps);
            };
            
            /**
            * @method   : cmd_do_ajax 
            * @private  :
            * @desc     : Do ajax request
            * @args     : key, value, tokens, ajax_url
            **/
            var cmd_do_ajax = function(key, value, ajax_url){

                // Prepare data
                var ajax_data = { cmd : value };
                // Check for options
                if(cmd_opts.cmd_query !== null){
                    ajax_data['cmd_query'] = cmd_opts.cmd_query;
                    ajax_data['cmd']       = cmd_opts.cmd_in;
                }
                if(cmd_opts.cmd_token !== null){
                    ajax_data['cmd_token'] = cmd_opts.cmd_token;
                }
                // Check URL
                if(ajax_url === false || ajax_url == '' || typeof ajax_url === 'undefined'){
                    ajax_url = (dispatch[key].type_of) ? dispatch[key].type_of : settings.url;
                }
                // Send
                $.ajax({
                    type: settings.method,
                    url: ajax_url,
                    data: ajax_data
                })
                .done(function( data ){
                    // Add called URL to result
                    data['ajax_url'] = ajax_url;
                    data = data || '';
                    cmd_callback( value, data );
                })
                .fail(function() {
                    // Error
                    update_content(
                        get_prompt(),
                        value,
                        '<div>' + settings.error_prefix + ' Invalid server response. </div>'
                    );
                });               
            };

            /**
            * @method   : cmd_execute
            * @private  :
            * @desc     : Called after submit(). Separates request types.
            * @args     : key, value, tokens, ajax_url (optional)
            **/
            var cmd_execute = function( key, value, tokens, ajax_url ) {

                if( key == '' ) {
                    // empty command
                    update_content( get_prompt(), value, '');

                }else if( cdispatch !== null ){
                    // Custom Dispatch
                    cmd_custom_dispatch( key, value, tokens );
                
                }else if(typeof dispatch[key] === 'undefined'){
                    // Command not found
                    update_content( get_prompt(), value, settings.not_found.replace( 'CMD', tokens[0] ));
                
                }else if( typeof dispatch[key].type_of === 'object' ) {
                    // Start hook for custom dispatch. (AJAX to different URLs)
                    cmd_custom_dispatch( key, value, tokens );

                }else if( typeof dispatch[key].type_of === 'string' ) {
                    // use AJAX method
                    cmd_do_ajax( key, value, ajax_url);

                }else if( typeof dispatch[key].type_of === 'function' ) {
                    // use javascript
                    cmd_dispatch_js( dispatch[key].type_of, tokens, value );

                }else{
                    // typeof dispatch[key].type_of === 'boolean' || 'symbol' || 'number'
                    cmd_do_ajax( key, value, settings.url );
                }
            };

            /**
            * @method   : start_subroutine
            * @private  :
            * @desc     : Starts Sub-routine.
            * @args     : key
            **/
            var start_subroutine = function(key){
                cdispatch = dispatch[ key ].type_of;
                prompt.html(cdispatch.ps);
                element.find( 'div:last span:first' )
                .toggleClass(settings.tty_class + '_ps '+settings.tty_class + '_sub');

                cmd_opts.cmd_ps = ''; // first call lacks sub-ps
                cmd_opts.cmd_name = key;
                cmd_opts.cmd_class = settings.tty_class + '_ps';

                saved.ac_save = settings.autocomplete;
                settings.autocomplete = false;
                saved.h_save = history;
                history = [ ];
            };

            /**
            * @method   : end_subroutine
            * @private  :
            * @desc     : Ends Sub-routines.
            **/
            var exit_subroutine = function(){
                prompt.html('');
                element.find( 'div:last span:first' )
                .toggleClass(settings.tty_class + '_ps '+settings.tty_class + '_sub');

                cmd_opts.cmd_class = settings.tty_class + '_sub';
                cmd_opts.cmd_name  = null;
                cmd_opts.cmd_token = null;
                cmd_opts.cmd_query = null;
                cmd_opts.cmd_ps    = null;
                
                settings.autocomplete = ( saved.ac_save ) ? saved.ac_save : false;
                history               = ( saved.h_save ) ? saved.h_save : [ ];
                cdispatch             = null;
            };

            /**
            * @method   : cmd_custom_dispatch
            * @private  :
            * @desc     : Handles Sub-routines.
            * @args     : key, value, tokens
            **/
            var cmd_custom_dispatch = function( key, value, tokens ) {
                var hook = settings.url

                if(cdispatch == null){
                    // Do START and save settings
                    start_subroutine(key);
                    hook = cdispatch.start_hook;

                }else if(cdispatch){

                    if(key == 'quit'  || key == 'exit') {
                        // Do EXIT and recover settings
                        hook = cdispatch.exit_hook;
                        exit_subroutine();

                    }else{
                        // Do REGULAR call
                        hook = cdispatch.dispatch_method;
                    }
                }

                if(typeof hook === 'string'){
                    // use AJAX
                    cmd_do_ajax( key, value, hook);   
                }else if(typeof hook === 'function'){
                    // use javascript
                    cmd_dispatch_js( hook, tokens, value );
                }
            };

            /**
            * @method   : cmd_dispatch_js
            * @private  :
            * @desc     : Executes JS function
            * @args     : key, value, tokens
            **/
            var cmd_dispatch_js = function( js_func, tokens, value ) {
                return cmd_callback( value, js_func( tokens ) );
            };

            /**
            * @method   : cmd_callback
            * @private  :
            * @desc     : Does requested type action, or executes top level function.
            * @args     : value, data
            **/
            var cmd_callback = function( value, data ) {
                
                var cbk = { ps : get_prompt(), output : '' };

                // Check response for overrides
                if( typeof data.ps !== 'undefined' ){
                    cmd_opts.cmd_ps = data.ps;
                }else{
                    cbk.ps = (cmd_opts.cmd_ps !== null) ? cmd_opts.cmd_ps : settings.ps;
                    cmd_opts.cmd_ps = (cdispatch !== null) ? cdispatch.ps : settings.ps;
                }
                set_prompt();

                if( typeof data.in !== 'undefined' ){
                    cmd_opts.cmd_in = data.in;
                }
                if( typeof data.out !== 'undefined' ){
                    cmd_opts.cmd_out = data.out;
                }
                if( typeof data.quiet !== 'undefined' ){
                    if(data.quiet == 'password'){
                        cmd_opts.cmd_quiet = 'password';
                    }else if(data.quiet == 'blank'){
                        cmd_opts.cmd_quiet = true;
                    }else if(data.quiet == 'clear'){
                        cmd_opts.cmd_quiet = 'clear';
                    }else{
                        cmd_opts.cmd_quiet = null;
                    }
                }
                if( typeof data.token !== 'undefined' ){
                    cmd_opts.cmd_token = data.token;
                }
                if( typeof data.query !== 'undefined' ){
                    cmd_opts.cmd_query = data.query;
                }
                if( typeof data.exit !== 'undefined' && cdispatch ){
                    exit_subroutine();
                }

                // Attempt command callback
                if( typeof data.type !== 'undefined' ){
                    switch ( data.type ){
                        case 'prompt':
                            // Ask for information (generate token)
                            if(!cmd_opts.cmd_token){
                                var token1 = Math.random().toString(36).substr(2),
                                token2 = Math.random().toString(36).substr(2),
                                token3 = Math.random().toString(36).substr(2);
                                cmd_opts.cmd_token = token1+token2+token3;
                            }
                        break;
                        case 'password':
                            // Change input type to password
                            txt_input.hide();
                            psw_input.show().focus();
                            //cmd_opts.cmd_quiet = 'password';
                        break;
                        default:
                            data.type = 'print';
                        break;
                    }
                }

                // Update content accordingly
                update_content( cbk.ps, value, cbk.output);

                // Check if function exists in callbacks object
                if(typeof data.callback !== 'undefined'){
                    try{
                        if( typeof callbacks[data.callback] === 'function' ){
                            cbk.output = callbacks[data.callback]( data );
                        }else{
                            throw( settings.error_prefix + ' No callback called ' + data.callback );
                        }
                    } catch ( e ) {
                        // Debug
                    }
                }
            };

            /**
            * @method   : scroll_to_bottom
            * @private  :
            * @desc     : This interval is necessary due to the nature of the dynamic div.
            **/
            var scroll_to_bottom = function(){
                var tries = 0, old_height = new_height = element.height();
                var intervalId = setInterval(function() {
                    if( old_height != new_height ){    
                        // Env loaded
                        clearInterval(intervalId);
                        element.animate({ scrollTop: new_height }, 'slow');
                    }else if(tries >= 30){
                        // Give up (and scroll anyway)
                        clearInterval(intervalId);
                        element.animate({ scrollTop: new_height }, 'slow');
                    }else{
                        new_height = content.height();
                        tries++;
                    }
                }, 50);
            };

            /**
            * @method   : Anonymous
            * @private  :
            * @event_handler
            **/
            input_form.submit( function( e ) {
                e.preventDefault(); e.stopPropagation();

                // Encode value by putting it in a fake container and fishing it out.
                // Decode value using: return $('<div/>').html(value).text();
                var value = $.trim( $( '<div/>' ).text( txt_input.val() ).html() );

                // Password input
                if(psw_input.val().length){
                    value = psw_input.val();
                    psw_input.val( '' );
                }
                // Catch original input
                cmd_opts.cmd_in = value;
                // Concatenate if query is set
                if( cmd_opts.cmd_query !== null ){
                    value = cmd_opts.cmd_query + value;
                }

                var tokens = value.split( /\s+/ );
                var key    = tokens[0];

                // Add to history
                if( settings.history && typeof dispatch[key] !== 'undefined' ) {
                    if( history.length > settings.history_entries ){
                        history.shift();
                    }
                    if(cmd_opts.cmd_quiet === null || cdispatch){
                        history.push( $.trim(value) );    
                    }
                }

                // Activate loading
                loading.show();
                prompt.hide();
                
                // Play ball...
                cmd_execute( key, value, tokens );

                // Cleanup and Scroll
                txt_input.val( '' );
                txt_input.focus();
                scroll_to_bottom();
            });

            /**
            * @method   : Anonymous
            * @private  :
            * @desc     : Add event handlers to the txt_input field
            * @event_handler
            **/
            txt_input.keydown( function( e ) {
                var keycode = e.keyCode;
                switch( keycode ) {
                    // Command Completion Tab
                    case 9:
                        e.preventDefault();
                        if( settings.autocomplete ) {
                            var commands      = [ ];   
                            var current_value = $.trim( txt_input.val() );
                            if( current_value.match( /^[^\s]{0,}$/ ) ) {
                                for( i in dispatch ) {
                                    if( current_value == '' ) {
                                        commands.push( i );
                                    } else if( i.indexOf( current_value ) == 0 ) {
                                        commands.push( i );
                                    }
                                }

                                if( commands.length > 1 ) {
                                    update_content( 
                                        get_prompt(),
                                        current_value, 
                                        '<ul class="sq-li"><li>'+commands.join( '</li><li>' )+'</li></ul>'
                                    );
                                } else if( commands.length == 1 ) {
                                    txt_input.val( commands.pop() + ' ' );  
                                }
                            }
                        }
                        scroll_to_bottom();
                    break;

                    // History Up
                    case 38:
                        e.preventDefault();
                        if( settings.history ) {
                            hcurrent  = ( hcurrent === null ) ? history.length - 1 : ( hcurrent == 0 ) ? history.length - 1 : hcurrent - 1;
                            txt_input.val( history[ hcurrent ] );
                        }
                    break;

                    // History Down
                    case 40:
                        e.preventDefault();
                        if( settings.history ) {
                            if( hcurrent === null || hcurrent == (history.length - 1 ) ){
                                txt_input.val( '' );
                                break;
                            }
                            hcurrent++;
                            txt_input.val( history[ hcurrent ] );
                        }
                    break;

                    // Scroll down on Enter
                    case 13:
                        e.preventDefault();
                        input_form.submit(); // important!
                        scroll_to_bottom();
                        txt_input.focus();
                    break;
                }
            });

            /**
            * @method   : Anonymous
            * @private  :
            * @desc     : Add event handlers to the password field
            * @event_handler
            **/
            psw_input.keydown( function( e ) {
                if( psw_input.is(':visible') ){
                    var keycode = e.keyCode;
                    switch( keycode ) {
                        //  Enter: Empty and hide password input
                        case 13:
                            e.preventDefault();
                            input_form.submit();
                            psw_input.hide();
                            txt_input.show();
                            scroll_to_bottom();
                            txt_input.focus();
                        break;
                    }
                }

            });

            /**
            * @method   : Anonymous
            * @private  :
            * @desc     : Add event handlers to the document
            * @event_handler
            **/
            $(document).keydown(function(e){
                var keycode = e.keyCode;
                switch( keycode ) {
                    // Escape: Focus back to input
                    case 27:
                        if(txt_input.is(':visible')) {
                            txt_input.focus();
                        }else if(psw_input.is(':visible')){
                            psw_input.focus();
                        }
                    break;
                }
            });
        });
    };

    /**
    * @method : register_command
    * @public
    * @desc   : Accepts a str as command name and a function, object or string as dispatch method.
    **/
    $.register_command = function( command, cmd_desc, cmd_usage, dispatch_method ){
        try {
            if( typeof dispatch_method === 'string' || typeof dispatch_method === 'object' || typeof dispatch_method === 'function' ){
                dispatch[ command ] = {desc : cmd_desc, usage : cmd_usage, type_of : dispatch_method};
            }else{
                throw 'Dispatch needs to be a string, object or function';
            }
        } catch ( e ) { }
    };

    /**
    * @method : register_callback
    * @public
    * @desc   : Adds the name of the callback (to invoke) and the method (to execute)
    **/
    $.register_callback = function(cbk_name, cbk_method){
        try {
            if( typeof cbk_method === 'string' || typeof cbk_method === 'object' || typeof cbk_method === 'function' ){
                callbacks[ cbk_name ] = cbk_method;
            }else{
                throw 'Callback needs to be a method';
            }
        } catch ( e ) { }
    }

    /**
    * @method : flush_commands
    * @public
    * @desc   : Empties the dispatch property
    **/
    $.flush_commands = function(options) {
        dispatch = {};
        $.set_command_option(options);
        // Register native commands again.
        native_commands(options);
    };

    /**
    * @method : set_command_option
    * @public
    * @desc   : Edits the cmd_opts property.
    * @args   : An object containing any of the cmd_opts atributes.
    **/
    $.set_command_option = function( option_obj ){
        $.extend( true, cmd_opts, option_obj );
    }

})( jQuery );
