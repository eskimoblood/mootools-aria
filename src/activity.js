var Activity = new Class({
	Implements: [Events, Options],
	eventListener: {},
	initialize: function(eventBus, options) {
		this.setOptions(options);
		this.eventBus = eventBus;
		element = options.element ? $(options.element) : window;
		this.view = this.view  ? new this.view(element, this.options) : element;
		var events = this.eventListener;
		for(var i in events) {
			var eventTyp = events[i];
			for(var event in eventTyp) {
				this[i].addEvent(event, this[eventTyp[event]].bind(this));
			}
		}
		this.build();
	},
	build: $empty,
	toElement: function() {
		return this.view;
	},
	destroy: function() {
		if(this.view != window) this.view.destroy();
	}
});