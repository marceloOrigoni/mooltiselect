/*
---
description:     
  - mooltisetec allow you to create a multiselect combobox from any html tag, also allows you to make it sortable or set a maximum of options.

authors:
  - Marcelo Origoni

version:
  - 1.5

license:
  - MIT-style license

requires:
  - core/1.2:   '*' || core/1.3: '*'
  - more/Drag:    'Sortables'
  
provides:
  - mooltiselect
...
*/
var dragging;
var mooltiselect = new Class({
	Implements: [Options,Events],
	options: {
		list: 'list',
		options: 'option',
		selectedClass: 'selected',
		name: 'listBox',
		sort: false,
		drag: true,
		maximum: 0,
		errorMessage: 'You already selected the maximum of %MAX% items',
		onMaxSelected: ''
	},
	initialize: function(properties) {
		var now = new Date();
		if(MooTools.version >= '1.3'){
			options = Object.merge(this.options, properties);
		}else{
			options = $merge(this.options, properties);
		}		
		options.options = '.' + options.options;
		options.errorMessage = options.errorMessage.replace("%MAX%", options.maximum);
		var placeholder = new Element('div',{id:'placeholder-'+now.valueOf()});
		$(placeholder).setStyle('display','none');
		if (typeof options.onMaxSelected == 'function'){
			$(placeholder).addEvent('click', options.onMaxSelected);
		}else{
			$(placeholder).addEvent('click', function(){alert($(this).getParent().getProperty('message'));});
		}
		$(options.list).setProperty('max', options.maximum);
		$(options.list).setProperty('message', options.errorMessage);
		$(options.list).setProperty('placeholder', 'placeholder-'+now.valueOf());
		$(options.list).grab($(placeholder));
		if(options.sort){
			var sortList = new Element('div', {
				id: 'sortList'
				});
			$(options.list).getElements(options.options).each(function(el,i){
				$(el).setProperty('name', options.name);
				$(el).setProperty('sel', options.selectedClass);
				$(el).setProperty('max', options.maximum);
				$(el).addEvent('dblclick', function(){
					if($(el).hasClass($(el).getProperty('sel'))){
						$(el).removeClass($(el).getProperty('sel'));
						$(el).getFirst('input').destroy();
					}else{
						var selItems = $(this).getParent().getChildren('.' + $(el).getProperty('sel')).length;
						if(selItems < $(el).getProperty('max') || $(el).getProperty('max') == 0){
							$(el).addClass($(el).getProperty('sel'));
							$(el).adopt(new Element('input', {
								'name': $(el).getProperty('name')+'[]',
								'id': $(el).getProperty('name'),
								'value': $(el).getProperty('rel'),
								'type': 'hidden'
								}));
							}else{
								$($(this).getParent().getParent().getProperty('placeholder')).fireEvent('click');
							}
						}
					});
			 sortList.grab($(el));
			});
			$(options.list).grab(sortList);
			order = new Sortables(sortList, {
				revert: true,
				clone: true
			});					
		}else{

			$(options.list).getElements(options.options).each(function(el,i){
				$(el).setProperty('name', options.name);
				$(el).setProperty('sel', options.selectedClass);
				$(el).setProperty('max', options.maximum);
				$(el).setProperty('drag', options.drag);					
				$(el).addEvent('mousedown', function(){
					dragging = true;
					if($(el).hasClass($(el).getProperty('sel'))){
						$(el).removeClass($(el).getProperty('sel'));
						$(el).getFirst('input').destroy();
					}else{
						var selItems = $(this).getParent().getChildren('.' + $(el).getProperty('sel')).length;
						if(selItems < $(el).getProperty('max') || $(el).getProperty('max') == 0){						
							$(el).addClass($(el).getProperty('sel'));
							$(el).adopt(new Element('input', {
								'name': $(el).getProperty('name')+'[]',
								'id': $(el).getProperty('name'),
								'value': $(el).getProperty('rel'),
								'type': 'hidden'
								}));
						}else{
							$($(this).getParent().getProperty('placeholder')).fireEvent('click');
						}
					}
				});

				$(el).addEvent('mouseup', function(){
					dragging = false;
				});
				
				$(el).addEvent('mouseout', function(){
					if(dragging && $(el).getProperty('drag')){
						dragging = true;
					}
				});

				$(el).addEvent('mouseover', function(){
					if(dragging && $(el).getProperty('drag')){
						dragging = true;
						if($(el).hasClass($(el).getProperty('sel'))){
							$(el).removeClass($(el).getProperty('sel'));
							$(el).getFirst('input').destroy();
						}else{
							var selItems = $(this).getParent().getChildren('.' + $(el).getProperty('sel')).length;
							if(selItems < $(el).getProperty('max') || $(el).getProperty('max') == 0){						
								$(el).addClass($(el).getProperty('sel'));
								$(el).adopt(new Element('input', {
									'name': $(el).getProperty('name')+'[]',
									'id': $(el).getProperty('name'),
									'value': $(el).getProperty('rel'),
									'type': 'hidden'
									}));
							}else{
								$($(this).getParent().getProperty('placeholder')).fireEvent('click');
							}
						}
					}
				});
				
				if (typeof $(el).onselectstart != 'undefined') {
					$(el).addEvent('selectstart',function() { return false; });
				} else if (typeof $(el).style.MozUserSelect != 'undefined') {
					$(el).setStyle('MozUserSelect', 'none');
				} else if (typeof $(el).style.WebkitUserSelect != 'undefined') {
					$(el).setStyle('WebkitUserSelect', 'none');
				} else if (typeof $(el).unselectable  != 'undefined') {
					$(el).setProperty('unselectable','on');
				}
			});
		}
	}
});