
// JSpec - MooTools - Copyright Ryan Schenk <rschenk@gmail.com> (MIT Licensed)

JSpec
.requires('MooTools', 'when using jspec.MooTools.js')
.include({
  
  // --- Initialize
  
  init : function() {
    // Disable Synchronous XHR's
    // Holy monkeypatch batman! There is probably a better way to do this
    Request.prototype.options.async = false;
  },
  
  // --- Utilities
  
  utilities : {
    element : function(string){
      var element = $(string);  // First try plain old $ selector
      
      if(element == null){ element = $$(string)[0]; } // Next try the css selector.
      if(element == null){ element = JSpec.defaultContext.arbitrary_html(string); } // Finally try evaluating as arbirary html
      return element;
    },
    elements : $$,
    sandbox : function() {
      return new Element('div', {id:'sandbox'});
    },
    
    // MooTools does not have the ability like jQuery does to evaluate arbitrary html
    // such as jQuery("<p>hello world!</p>").
    //
    // This method provides that, with some limitations. Namely that the html string must have a root element.
    arbitrary_html : function(string){
      return new Element('div', {html:string}).firstChild;
    }
  },
  
  // --- Matchers
  
  matchers : {
    have_tag      : "JSpec.defaultContext.element(actual).getElements(expected).length == 1",
    have_one      : "alias have_tag",
    have_tags     : "JSpec.defaultContext.element(actual).getElements(expected).length > 1",
    have_many     : "alias have_tags",
    have_child    : "JSpec.defaultContext.element(actual).getChildren(expected).length == 1",
    have_children : "JSpec.defaultContext.element(actual).getChildren(expected).length > 1",
    have_text     : "JSpec.defaultContext.element(actual).get('text') == expected",
    have_value    : "JSpec.defaultContext.element(actual).get('value') == expected",
    be_enabled    : "!JSpec.defaultContext.element(actual).get('disabled')",
    have_class    : "JSpec.defaultContext.element(actual).hasClass(expected)",
    
    be_visible : function(actual) {
      return JSpec.defaultContext.element(actual).getStyle('display') != 'none' &&
             JSpec.defaultContext.element(actual).getStyle('visibility') != 'hidden' &&
             JSpec.defaultContext.element(actual).get('type') != 'hidden'
    },
    
    be_hidden : function(actual) {
      return !JSpec.does(actual, 'be_visible')
    },

    have_classes : function(actual) {
      return !JSpec.any(JSpec.argumentsToArray(arguments, 1), function(arg){
        return !JSpec.does(actual, 'have_class', arg)
      })
    },

    have_attr : function(actual, attr, value) {
      return value ? JSpec.defaultContext.element(actual).get(attr) == value:
                     JSpec.defaultContext.element(actual).get(attr)
    },
    
    'be disabled selected checked' : function(attr) {
      return 'JSpec.defaultContext.element(actual).get("' + attr + '")'
    },
    
    'have type id title alt href src sel rev name target' : function(attr) {
      return function(actual, value) {
        return JSpec.does(actual, 'have_attr', attr, value)
      }
    }
  }
})

