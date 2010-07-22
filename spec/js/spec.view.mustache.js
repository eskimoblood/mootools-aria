
describe 'View.Mustache'
  before
	element = new Element('div')
	json = {name: "Joe", say_hello: function(){ return "hello" }}
	template = "<span>{{say_hello}}, {{name}}</span>"

  end

	describe 'initialize()'

		it 'should throw an error when no element is passed'
			function(){new View.Mustache(element)}.should.throw_error
		end

		it 'should throw an error when the element passed is no string'
			function(){new View.Mustache(element), {template: true}}.should.throw_error
		end
	end

	describe 'setHtml()'
		it 'should render the template'
			view =new View.Mustache(element, {template: template})
			view.set('html', json);
			element.innerHTML.should.be '<span>hello, Joe</span>'
		end

		it 'should throw an error if no object passed or  the passed view is not an object'
			view =new View.Mustache(element, {template: template})
			function(){view.set('html', 'test');}.should.throw_error
			function(){view.set('html');}.should.throw_error
		end
	end
end