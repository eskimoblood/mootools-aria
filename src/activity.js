var Activity = new Class({
	Implements: [Events, Options],
	eventListener: {},
	destroy: function() {
		this.element.destroy();
	},
	initialize: function(eventBus, options) {
		this.setOptions(options);
		this.eventBus = eventBus;
		this.element = $(this.element || this.elementSelector);
		if (this.view) this.view = new View[this.view](this.element, this.view.options);
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
		return this.element;
	}
});