
describe 'Model'
    before
		eventBus = new EventBus()
	end
	describe 'initialize()'
		it 'should  check if localStorage work in the browser'
			model = new Model (eventBus, {})
			model.hasLocalStorage.should.be (('localStorage' in window) && window['localStorage'] !== null)
		end
	end

	describe 'initialize()'
		it 'should  check if localStorage work in the browser'
			model = new Model (eventBus, {})
			model.hasLocalStorage.should.be (('localStorage' in window) && window['localStorage'] !== null)
		end
	end

	describe 'set()'
		it 'should  store  strings or objects in model.cache or localStorage and it should fire an event on eventbus'
			model = new Model (eventBus, {})
			a = ''
			eventBus.addEvent('changed', function(key){a += key;})
			model.set('test', 'test').should.be 'test'
			model.set('test1', 'test', true).should.be 'test'
			model.set('test2', {test: 'test'}, true).should.eql {test: 'test'}
			model.cache.test.should.be 'test'
			localStorage.test1.should.be 'test'
			localStorage.test2.should.be '{"test":"test"}'
			a.should.be 'testtest1test2'
		end
	end

	describe 'get()'
		it 'should  get a stored  string or object in model.cache or localStorage'
			model = new Model (eventBus, {})
			model.set('test', 'test');
			model.set('test1', 'test', true);
			model.set('test2', {test: 'test'}, true);
			model.get('test').should.be 'test'
			model.get('test1', false, true).should.be 'test'
			model.get('test2', true, true).should.eql {test: 'test'}
		end
	end

	describe 'clear()'
		it 'should  clear a stored  string or object in model.cache or localStorage'
			model = new Model (eventBus, {})
			a = ''
			eventBus.addEvent('changed', function(key){a += key;})
			model.set('test', 'test');
			model.set('test1', 'test', true);
			model.set('test2', {test: 'test'}, true);
			model.clear('test')
			model.clear('test1', true)
			model.clear('test2', true)
			model.cache.test.should.be_null
			localStorage.test1.should.be_null
			localStorage.test2.should.be_null
			a.should.be 'testtest1test2testtest1test2'
		end
	end

end