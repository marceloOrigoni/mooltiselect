/*
---
description:     
  - mooltisetec allow you to create a multiselect combobox from any html tag, also allows you to make it sortable or set a maximum of options.

authors:
  - Marcelo Origoni

version:
  - 1.1.4

license:
  - MIT-style license

requires:
  - core/1.2.1:   '*'
  - more/Drag:    'Sortables'
  
provides:
  - mooltiselect
...
*/

var mooltiselect = new Class({
	Implements: [Options,Events],
	options: {
		list: 'list',
		options: 'option',
		selectedClass: 'selected',
		name: 'listBox',
		sort: false,
		maximum: 0
	},
	initialize: function(options) {
		this.setOptions(options);
	},
	apply: function(properties){
		
		var list, sort, maximum, options, name, selected;
		
		if(properties){ 
			list = properties.list ? properties.list : this.options.list;
			sort = properties.sort ? properties.sort : this.options.sort;
			maximum = properties.maximum ? properties.maximum : this.options.maximum;
			options = '.' + properties.options ? properties.options : this.options.options;
			name = properties.name ? properties.name + '[]': this.options.name + '[]';
			selected = properties.selectedClass ? properties.selectedClass : this.options.selectedClass;
		}else{
			list = this.options.list;
			sort = this.options.sort;
			maximum = this.options.maximum;
			options = '.' + this.options.options;
			name = this.options.name + '[]';
			selected = this.options.selectedClass;			
		}
		
		if(sort){
			var sortList = new Element('div', {
				id: 'sortList'
				});
			$(list).getElements(options).each(function(el,i){
				$(el).setProperty('name', name);
				$(el).setProperty('sel', selected);
				$(el).setProperty('max', maximum);
				$(el).addEvent('dblclick', function(){
					if($(el).hasClass($(el).getProperty('sel'))){
						$(el).removeClass($(el).getProperty('sel'));
						$(el).getFirst('input').destroy();
					}else{
						var selItems = $(this).getParent().getChildren('.' + $(el).getProperty('sel')).length;
						if(selItems < $(el).getProperty('max') && $(el).getProperty('max') > 0){
							$(el).addClass($(el).getProperty('sel'));
							$(el).adopt(new Element('input', {
								'name': $(el).getProperty('name'),
								'id': $(el).getProperty('name'),
								'value': $(el).getProperty('rel'),
								'type': 'hidden'
								}));
							}else{
								alert('You already selected the maximum of ' + $(el).getProperty('max') + ' items');
							}
						}
					});
			 sortList.grab($(el));
			});
			$(list).grab(sortList);
			order = new Sortables(sortList, {
				revert: true,
				clone: true
			});					
		}else{
			$(list).getElements(options).each(function(el,i){
				$(el).setProperty('name', name);
				$(el).setProperty('sel', selected);
				$(el).setProperty('max', maximum);					
				$(el).addEvent('click', function(){
					if($(el).hasClass($(el).getProperty('sel'))){
						$(el).removeClass($(el).getProperty('sel'));
						$(el).getFirst('input').destroy();
					}else{
						var selItems = $(this).getParent().getChildren('.' + $(el).getProperty('sel')).length;
						if(selItems < $(el).getProperty('max') && $(el).getProperty('max') > 0){						
							$(el).addClass($(el).getProperty('sel'));
							$(el).adopt(new Element('input', {
								'name': $(el).getProperty('name'),
								'id': $(el).getProperty('name'),
								'value': $(el).getProperty('rel'),
								'type': 'hidden'
								}));
							}else{
								alert('You already selected the maximum of ' + $(el).getProperty('max') + ' items');
							}
						}
					});
			});
		}
	}
});