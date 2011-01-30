mooltiselect
===========
![Screenshot](http://marcelo.origoni.com.ar/images/mooltiselect.png)

	- mooltisetec allow you to create a multiselect combobox, and also to make it sortable or set a maximum of options That the user may select.
	  
How to use
----------
	
	1.	Create the element list, that will become the mooltiselect. 
		<ul id="ulList">
			<li class="liOption" rel="1">Option 1</li>
			<li class="liOption" rel="2">Option 2</li>
			<li class="liOption" rel="3">Option 3</li>
			<li class="liOption" rel="4">Option 4</li>
			<li class="liOption" rel="5">Option 5</li>
		</ul>
	2.  Call mooltiselect.
		#JS
		var list = new mooltiselect({
			list: 'ulList', // id of the container of the option elements, default list.
			options: 'liOption', // class of the option elemnts, default option.
			selectedClass: 'liSelected', // selected class, to be applied to selected items.
			name: 'liSelected Options', // name of the form element, that will be send, using POST/GET method 
			sort: false, // boolean, true allows sorting of the option elements, and is sent via POST/GET in order, firts the top one, end descending.
			drag: true, // boolean, defaults to true, allows multiple selection, by dragging the mouse over, and maintaining the mosue clicked.
			maximum: 0,	// int, maximum selectable options, 0 means no limit.	
			errorMessage: 'You already selected the maximum of %MAX% items', // Error message displayed if max options already selected, the %MAX% wilcard, will be replaced with the number 
			});

Changelog
---------
	1.5 - Made mooltiSelect compatible with mootools 1.3;
	1.5 - Made text unselectable when dragging enable (tested on IE7,IE8, FF3,FF2, Opera 11, Safari 5 and Chrome 2);
	1.5 - Removed the extra step apply();
	1.3 - Added selection by dragging the mouse over various options;
	1.2 - Added custom error message alert;
