mooltiselect
===========

	- mooltisetec allow you to create a multiselect combobox, 
	and also to make it sortable or set a maximum of options
	That the user may select.
	  
How to use
----------

	1.	Create the element list, that will become the mooltiselect. 
		<ul id="ulList">
			<li class="liOption" rel="1">Option 1</li>
			<li class="liOption" rel="2">Option 1</li>
			<li class="liOption" rel="3">Option 1</li>
			<li class="liOption" rel="4">Option 1</li>
			<li class="liOption" rel="5">Option 1</li>
		</ul>
	2.  Call mooltiselect.
		#JS
		var list = new mooltiselect({
			list: 'ulList', // id of the container of the option elements, default list.
			options: 'liOption', // class of the option elemnts, default option.
			selectedClass: 'liSelected', // selected class, to be applied to selected items.
			name: 'liSelected Options', // name of the form element, that will be send, using POST/GET method 
			sort: false, // boolean, true allows sorting of the option elements, and is sent via POST/GET in order, firts the top one, end descending.
			maximum: 0	// int, maximum selectable options, 0 means no limit.	
			});
	
	3. Apply the change.
		#JS
		list.apply();
