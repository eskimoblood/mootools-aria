var View  = new Class({
	Implements: Events,
	initialize: function(element, options) {
		this.setOptions(options)
		this.element = element;
		this.build();
		return this;
	},
	build: $empty,
	toElement: function() {
		return this.element;
	}
});