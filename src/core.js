Math.uuidFast = function() {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''), uuid = [], rnd = 0, r;
	for (var i = 0; i < 36; i++) {
		if (i == 8 || i == 13 || i == 18 || i == 23) {
			uuid[i] = '_';
		} else {
			if (rnd <= 0x02) rnd = (0x2000000 + Math.random() * 0x1000000) | 0;
			r = rnd & 0xf;
			rnd = rnd >> 4;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	}
	return uuid.join('');
};

var Core = new Class({
	activities: {},
	initialize: function(){
		this.eventBus = new EventBus().addEvent('destroy', this.stop.bind(this));
	},
	register: function(creator, options){
		var uid = Math.uuidFast();
		this.activities[uid] = {
			creator: creator,
			options: options || {},
			instance: null
		};
		return uid;
	},
	start: function(activityId) {
		var activity = this.activities[activityId];
		activity.instance =  activity.instance || new activity.creator(this.eventBus, $extend(activity.options, {uuid: activityId}));
		return this;
	},
	stop: function (activityId) {
		var activity = this.activities[activityId],
			instance = activity.instance;
		if(instance){
			instance.destroy();
			delete activity.instance;
		}
		return this;
	},
	startAll: function() {
		for(var uid in this.activities){
			this.start(uid);
		}
	}
});