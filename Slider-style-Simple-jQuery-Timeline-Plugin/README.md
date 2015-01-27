# Simple-Timeline

Here comes a brief instruction of intallation and use of the Simple Timeline, for more in depth detail [click here](#)  

Introduciton
========
Simple Timeline is meant to be a simple yet beautiful minimalistic timeline that can serve many purposes. It aims to be easy-to-configure aswell as easy-to-use as a viewer. This project is being built by a single student and has an aim to add several new features during the coming time. Features that supports the timeline to be user in more enviroments than the computer. Responsive design, with other words, is on top of the to-do-list. Meanwhile look at this version as a mere prototype, v 0.1.

Installation
=========

Simple Timeline requires both jQuery and jQueryUI to function properly. As well as the css framework Foundation. Make sure those are installed and linked properly otherwise errors will occur.  
  
Make sure to also add the simple timeline js file, like this:

```
<script src="../path/to/simple-timeline.jquery.js"></script>
```  
Now the plugin can be called by the following way:

```
$('div.tlcontainer').simpleTimeline(); 
```

However make sure to look in the demo.html file where the necessary HTML code is in order to make the plugin work properply.

Adding Events
===========

Look in the demo.html code where the events are added. Adding events is easy, template: 

```
//New Event
<div class='tlcontainer large-10 columns row' data-date='DATE example: 2012-03-12'>
  <div class="large-6 columns">
    <img src="LINK TO IMAGE" alt="" />
  </div>
  <div class='large-6 columns'>
    <p class="eventTitle"> TITLE </p>
    <p class="eventDate"> DATE example: 2012-03-12 </p>
    <p class="eventContent"> CONTENT </p>
  </div>
</div>
```

It's pretty straightforward, for every event added you have to add that type of code and the plugin does the rest. The one thing to keep an eye here is on line 3 and 6 in the example. The ones that specify &lt;div class="large-6 columns"> . Here you can change the numbers to 12 instead of 6 on both to create the Layout #3 effect in the DEMO example. This is all based on the Foundation grid system and you can read more about it [here](#). If you wish to create the layout #2 in the DEMO example simply swap place of the image div with the div containing all content. Play around with it a little bit and you will quickly get the hang of it.


Options
==========
The timeline comes with a handfull pre-installed options which can be accessed by calling the plugin with the following way:
```
$('div.tlcontainer').simpleTimeline({
  hoverTrans: {
    trans: 'fadeToggle',
    transIn: 300,
    transOut: 300,
  },
  startDate: 1,
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
});
```

Lets walk through them one by one. The first one is hoverTrans and accepts three parameters. It creates the animation for the hover div-box that shows up when you hove over an 'event-blob'. You can decide how quick it will appear and disappear aswell as which animation you would like, in example slideToggle. The default however is fadeToggle.  
  
The second one is startDate where you can decide what event you want the visitior to see as soon as they enter the site. So basically the starting event. It accepts a numeric parameter which will represent the event in chronological order. The default value is 1, which is the first event on the timeline  
  
And lastly we have the months option. Which lets you set how you want to represent the months that are displayed to the top right. This is useful if your project is in a language other than english, the default however it English.
