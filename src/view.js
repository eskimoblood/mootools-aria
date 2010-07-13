var View  = new Class({
	Implements: [Events, Options],
	initialize: function(element, options) {
		this.setOptions(options)
		this.element = element;
		this.build();
		return this;
	},
	build: $empty,
	toElement: function() {
		return this.element;
	},
	set: function(attribute, value) {
		this['set' + attribute.capitalize()](value);
		this.fireEvent()
	},
	get: function(attribute) {
		this['get' + attribute.capitalize()]
	},
	setHtml: function(html) {
		this.element.innerHTML = html;
	}
});