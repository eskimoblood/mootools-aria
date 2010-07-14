
describe 'View'
  before
	element = new Element('div')
	ExtendedView = new Class({
		Extends: View,
		setTest: function(test){
			this.test = test;
		},
		getTest: function(){
			return this.test;
		}
	})


  end

	describe 'after initialization'
		it 'should have an element when one is passed'
			view =new ExtendedView(element)
			view.element.should.be element
		end

		it 'should throw an error when no element is passed'
			function(){new ExtendedView()}.should.throw_error
		end
	end

	describe 'set()'
		it 'should call function set + Attribute or the set function on the element if the function set + Attribute doesnt exists'
			view =new ExtendedView(element)
			view.set('test', 'test');
			view.test.should.be 'test'
			view.set('title', 'test');
			element.title.should.be 'test'
		end
	end

	describe 'get()'
		it 'should call function get + Attribute or the set function on the element if the function set + Attribute doesnt exists'
			view =new ExtendedView(element)
			view.set('test', 'test');
		    view.get('test').should.be 'test'
			view.set('title', 'test');
			view.get('title').should.be 'test'
		end
	end


	describe 'returnElement()'
		it 'should return the element of the view'
			view =new ExtendedView(element)
			view.toElement().should.be element
		end
		it 'should support mootools $() function'
			view =new ExtendedView(element)
			$(view).should.be element
		end
	end

	




end