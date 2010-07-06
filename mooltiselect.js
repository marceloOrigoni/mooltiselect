	var Combo = new Class({
		Implements: [Options,Events],
		options: {
			list: 'list',
			options: 'option',
			selectedClass: 'selected',
			name: 'listBox',
			sort: false
		},
		initialize: function(options) {
			this.setOptions(options);
		},
		apply: function(properties){
			
			if(properties){
				list = properties.list;
				options = '.' + properties.options;
				name = properties.name + "[]";
				selected = properties.selectedClass;
				sort = properties.sort;
			}else{	
				list = this.options.list;
				options = '.' + this.options.options;
				name = this.options.name + "[]";
				selected = this.options.selectedClass;
				sort = this.options.sort;
			}
			
			if(sort){
				var sortList = new Element('div', {
					id: 'sortList'
					});
				$(list).getElements(options).each(function(el,i){
					$(el).setProperty('name', name);
					$(el).setProperty('sel', selected);
					$(el).addEvent('dblclick', function(){
						if($(el).hasClass($(el).getProperty('sel'))){
							$(el).removeClass($(el).getProperty('sel'));
							$(el).getFirst('input').destroy();
						}else{
							$(el).addClass($(el).getProperty('sel'));
							$(el).adopt(new Element('input', {
								'name': $(el).getProperty('name'),
								'id': $(el).getProperty('name'),
								'value': $(el).getProperty('rel'),
								'type': 'hidden'
								}));
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
					$(el).addEvent('click', function(){
						if($(el).hasClass($(el).getProperty('sel'))){
							$(el).removeClass($(el).getProperty('sel'));
							$(el).getFirst('input').destroy();
						}else{
							$(el).addClass($(el).getProperty('sel'));
							$(el).adopt(new Element('input', {
								'name': $(el).getProperty('name'),
								'id': $(el).getProperty('name'),
								'value': $(el).getProperty('rel'),
								'type': 'hidden'
								}));
							}
						});
				});
			}
		}
	});