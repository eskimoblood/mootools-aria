/**
 * Created by IntelliJ IDEA.
 * User: andreaskoberle
 * Date: 22.07.2010
 * Time: 22:34:50
 * To change this template use File | Settings | File Templates.
 */
View.Mustache = new Class({
	Extends: View,
	initialize: function(element, options){
		var template = options.template;
		if(!template && $type(template) != 'string') throw 'A Mustache view needs a template string';
		this.parent(element, options);
	},
	setHtml: function(json){
		if(!json || $type(json) != 'object') throw 'Either no json is passed or the passed json is not an object';
		var options  = this.options;
		this.element.innerHTML = Mustache.to_html(options.template, json, options.partial);
	}
});