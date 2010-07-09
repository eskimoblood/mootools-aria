Element.implement({
	setRole: function(role){
		return this.setProperty('role', role);
	},
	ariaChecked: function(value) {
		return this.setProperty('aria-checked', value);
	}
});

Elements.implement({
	setRole: function(role){
		return this.setProperty('role', role);
	},
	ariaChecked: function(value) {
		return this.setProperty('aria-checked', value);
	}
});



var Aria = new Class({
	Implements: [Events, Options],
	buildAria: $empty,
	ownedElements: {},
	setAria: function(options) {
		this.setOptions(options);
		this.initializeElement();
		this.buildAria();
	},
	initializeElement: function() {
		var roles = this.settings.roles,
			l = roles.length,
			selectors = this.options.selectors,
			ariaAttributesOptions = this.options.ariaAttributes || {},
			ariaAttributesSettings = this.settings.ariaAttributes || {};
		for (var i = 0; i < l; i++) {
			var role = roles[i],
				ariaAttributes = $merge(ariaAttributesOptions[role] , ariaAttributesSettings[role]),
				element = (i? this.element.getElements(selectors[role]) : $(selectors[role])).setRole(role).setProperty('tabindex', i ? -1 : 0);
			if (ariaAttributes) {
				for (var attribute in ariaAttributes) {
					element.setProperty('aria-' + attribute, ariaAttributes[attribute]);
				}
			}
			this[role] = element;
			if (!i) this.element = element
		}
	}
});

Aria.Listbox = new Class({
	Extends: Aria,
	options: {
		selectors: {
			option: 'li'
		},
		activeElement: null,
		ariaAttributes: {}
	},
	settings: {
		roles: ['listbox', 'option']
	},
	buildAria: function() {
		var option = this.settings.roles.getLast();
		this.element.addEvent('click:relay(' + this.options.selectors[option] + ')', this.check.bind(this))
			.addEvent('keyup', this.keys.bindWithEvent(this));
		var ownedElements = this[option].ariaChecked(false);
		this.checkedElements = this.settings.activeElement ? $$(this.settings.activeElement).ariaChecked(true) : new Elements();
		this.multiselectable = this.options.ariaAttributes.listbox;
	},
	check: function(event, target, direction) {
		if (this.checkedElements.length == 1) this.lastDirection = direction;
		var multiSelectable = this.multiselectable;
		if (target) {
			if(multiSelectable && event.shift) {
				if (this.lastDirection && direction != this.lastDirection){
					this.checkedElements.pop().ariaChecked(false);
				} else {
					this.checkedElements.push(target.ariaChecked(true))
				}
			} else {
				this.checkedElements.ariaChecked(false);
				this.checkedElements = $$(target.ariaChecked(true));
			}
			this.checkedElements.getLast().focus();
			this.fireEvent('changed', multiSelectable ? this.checkedElements : this.checkedElements[0]);
		}
	},
	keys: function(event){

		var key = event.key,
			direction = key.test(/left|up/) ? 'Previous' :  key.test(/right|down/) ? 'Next' : '';
		if (event.stop) event.stop();
		if(direction) {
			var target = this.checkedElements.length ? this.checkedElements.getLast()['get' + direction]() : $(this[this.settings.roles.getLast()][0]);
			this.check(event, target, direction);
		}
	}
});

Aria.Radiogroup = new Class({
	Extends: Aria.Listbox,
	options: {
		selectors: {
			radio: 'li'
		},
		activeElement: null
	},
	settings: {
		roles: ['radiogroup', 'radio'],
		ariaAttributes:{
			radiogroup: {multiselectable: false}
		}
	},
	buildAria: function() {
		this.parent();
		this.checkedElements = $$(this.settings.activeElement || this.radio[0]).ariaChecked(true);
	}
});

Aria.Combobox = new Class({
	Extends: Aria.Listbox,
	options: {
		selectors: {
			listbox: 'ul',
			option: 'li',
			textbox: 'span'
		},
		activeElement: null
	},
	settings: {
		roles: ['combobox', 'listbox', 'textbox','option'],
		ariaAttributes:{
			combobox: {expanded: false}
		}
	},
	buildAria: function() {
		this.parent();
		this.element.addEvents({
			'focus': this.openList.bind(this)
		});
		this.textbox[0].addEvent('click', this.toggleList.bind(this));
	},
	check: function(event, target, direction) {
		this.parent(event, target, direction);
		this.closeList(event);
	},
	openList: function() {
		if (!this.open) {
			this.element.setProperty('aria-expanded', true);
			this.fireEvent('opened');
			this.open = true;
		}
	},
	toggleList: function() {
		  this[(this.open ? 'close' : 'open') + 'List']();
	},
	closeList: function() {
		this.element.setProperty('aria-expanded', false);
		this.fireEvent('closed');
		this.open = false;
	}
});

