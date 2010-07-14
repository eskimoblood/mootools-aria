
var View  = new Class({
	Implements: [Events, Options],
	initialize: function(element, options) {
		var type = $type(element);
		if(type != 'element' && type != 'window') throw 'Type of element should be element or window but is ' + type;
		this.setOptions(options);
		this.element = element;
		this.build();
		return this;
	},
	build: $empty,
	toElement: function() {
		return this.element;
	},
	set: function(attribute, value) {
		this.chooseGetterSetter('set', attribute, value);
		return this;
	},
	get: function(attribute) {
		return this.chooseGetterSetter('get', attribute);
	},
	chooseGetterSetter: function(typ, attribute, value){
		var name = typ + attribute.capitalize();
		return this[name] ? this[name](value) : this.element[typ](attribute, value)
	}
});