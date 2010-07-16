
describe 'Activity'
  before
	core = new Core()
	activityClass = Activity
	eventBus = new EventBus()
	activityClassExtentedWithView = new Class({
		Extends: Activity,
		view: View
	})

	activityClassExtentedWithEventListener = new Class({
		Extends: Activity,
		eventListener: {
			view: {
				click: 'test'
			},
			eventBus: {
				test: 'test'
			}
		},
		test: function(){
			this.view.set('html', 'test')
		}
	})

  end

	describe 'after initialization'
		it 'should have an eventbus'
			activity = new Activity(eventBus, {})
			activity.eventBus.should.be_an_instance_of EventBus
		end

		it 'should have the window as view when no element or view is defined'
			activity = new Activity(eventBus, {})
			activity.toElement().should.be window
		end

		it 'should have an  DOM element as view when an element but no view is defined'
			element = new Element('div')
			activity = new Activity(eventBus, {element: element})
			activity.toElement().should.be element
		end

		it 'should have an view object when a view is defined'
			activity = new activityClassExtentedWithView(eventBus, {})
			activity.toElement().should.be_an_instance_of View
		end



		it 'should listen to events fired on the view'
			element = new Element('div')
			activity = new activityClassExtentedWithEventListener(eventBus, {element: element})
			element.fireEvent('click')
			element.innerHTML.should.be 'test'
		end

		it 'should listen to events fired on the eventBus'
			element = new Element('div')
			activity = new activityClassExtentedWithEventListener(eventBus, {element: element})
			activity.eventBus.fireEvent('test')
			element.innerHTML.should.be 'test'
		end


	end

end