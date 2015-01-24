# jquery-zoomslider

- - -

ZoomSlider creates slideshows with zoom effect using background-image and CSS3.

To initialise zoomslider, add the attribute **data-zs-src** to a DOM element and the slider would auto-initialize.

	<div data-zs-src='["img1.jpg", "img2.jpg", "img3.jpg"]'>
    	<p>Sample inner content</p>
	</div>
	
All configurable properties:

<table>
	<thead>
		<tr>
			<th>Data attribute</th>
			<th>Default value</th>
			<th>Possible values</th>
		</tr>
	</thead>
	<tbody><tr>
		<td>data-zs-src</td>
		<td>null</td>
		<td>[]</td>
	</tr>
	<tr>
		<td>data-zs-speed</td>
		<td>8000</td>
		<td>Number (mini-second)</td>
	</tr>
	<tr>
		<td>data-zs-switchSpeed</td>
		<td>800</td>
		<td>Number (mini-second)</td>
	</tr>
	<tr>
		<td>data-zs-interval</td>
		<td>4500</td>
		<td>Number (mini-second)</td>
	</tr>
	<tr>
		<td>data-zs-autoplay</td>
		<td>true</td>
		<td>true / false</td>
	</tr>
	<tr>
		<td>data-zs-bullets</td>
		<td>true</td>
		<td>true / false</td>
	</tr>
	<tr>
		<td>data-zs-overlay</td>
		<td>'plain'</td>
		<td>false, 'plain', 'dots'</td>
	</tr>
</tbody></table>