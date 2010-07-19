/**
 * Created by IntelliJ IDEA.
 * User: andreaskoberle
 * Date: 17.07.2010
 * Time: 20:53:11
 * To change this template use File | Settings | File Templates.
 */

var AddressListActivity = new Class({
	Extends: Activity,
	eventListener: {
			view: {
				'click:relay(li)': 'showAddress'
			},
		eventBus: {
			addressChanged: 'addAddress'
		}
	},
	build: function() {
		this.model = new Model(this.eventBus);
		this.options.addressJson.addresses.each(function(address) {
			this.addAddress(address);
		}, this);
		this.allowRendering = true;
		this.render();
	},
	addAddress: function(address) {
		address.uid = address.uid || Math.uuidFast();
		this.model.set(address.uid, address);
		var uids = this.model.get('uids') || [];
		if(!uids.contains(address.uid)) {
			uids.push(address.uid);
			this.model.set('uids', uids);
		}
		this.render();
		this.eventBus.fireEvent('addressBookLengthChanged', uids.length);
	},
	removeAddress: function(uuid) {
		this.model.clear(uuid);
		this.render();
		this.eventBus.fireEvent('addressBookLengthChanged', this.model.get('uids').length);
	},
	showAddress: function(event, li) {
		var uid = this.model.get('uids')[li.id.replace('item', '')];
		this.eventBus.fireEvent('showAddress', this.model.get(uid));
	},
	render: function() {
		if (this.allowRendering) {
			this.view.empty();
			var innerHTML = '<ul>';
			this.model.get('uids').each(function(uid, cnt) {
				var address = this.model.get(uid);
				innerHTML += '<li id="item' + cnt + '">' + address.firstname + ' ' + address.name + '</li>';
			}, this);
			this.view.set('html', innerHTML + '</ul>');
		}
	}
});

var AddressListLengthActivity = new Class({
	Extends: Activity,
	eventListener: {
			eventBus: {
				addressBookLengthChanged: 'render'
			}
	},
	render: function(length) {
		this.view.set('text', length);
	}
});

var AddressListEditor = new Class({
	Extends: Activity,
	eventListener: {
		view: {'submit': 'submitChanges'},
		eventBus: {showAddress: 'showAddress'}
	},
	submitChanges: function(event) {
		event.stop();
		var json = {uid: this.uid};
		this.view.getElements('input[type=text]').each(function(input) {
			json[input.id] = input.value
		}, this);
		this.eventBus.fireEvent('addressChanged', json);
		this.view.empty();
	},
	showAddress: function(address) {
		var innerHTML = '';
		['name', 'firstname', 'place'].each(function(key) {
			innerHTML += '<label for="' + key + '">' + key +'<input id="' + key + '" type="text" value="' + address[key] +'"/></label>'
		});
		this.view.set('html', innerHTML += '<input type="submit">');
		this.uid = address.uid;
	}
});

var AddressListAdd = new Class({
	Extends: Activity,
	eventListener: {
		view: {'click': 'addAddress'}
	},
	addAddress: function() {
		this.eventBus.fireEvent('showAddress', { 'uid' : '', 'name' : '', 'firstname' : '', 'place' : '' })
	}

});

