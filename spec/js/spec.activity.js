
describe 'Activity'
  before
	core = new Core()
	activityClass = Activity
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
			uid = core.register(activityClass)
			core.start(uid)
			activity = core.activities[uid].instance
			activity.eventBus.should.be_an_instance_of EventBus
		end

		it 'should have the window as view when no element or view is defined'
			uid = core.register(activityClass)
			core.start(uid)
			activity = core.activities[uid].instance
			activity.toElement().should.be window
		end

		it 'should have an  DOM element as view when an element but no view is defined'
			element = new Element('div')
			uid = core.register(activityClass, {element: element})
			core.start(uid)
			activity = core.activities[uid].instance
			activity.toElement().should.be element
		end

		it 'should have an view object when a view is defined'
			uid = core.register(activityClassExtentedWithView)
			core.start(uid)
			activity = core.activities[uid].instance
			activity.toElement().should.be_an_instance_of View
		end

		it 'all activities should have the same eventbus'
			uid = core.register(activityClass)
			core.start(uid)
			activity1 = core.activities[uid].instance
			uid = core.register(activityClassExtentedWithView)
			core.start(uid)
			activity2 = core.activities[uid].instance
			activity1.eventBus.should.be activity2.eventBus
		end

		it 'should listen to events fired on the view'
			element = new Element('div')
			uid = core.register(activityClassExtentedWithEventListener, {element: element})
			core.start(uid)
			activity = core.activities[uid].instance
			element.fireEvent('click')
			element.innerHTML.should.be 'test'
		end

		it 'should listen to events fired on the eventBus'
			element = new Element('div')
			uid = core.register(activityClassExtentedWithEventListener, {element: element})
			core.start(uid)
			activity = core.activities[uid].instance
			activity.eventBus.fireEvent('test')
			element.innerHTML.should.be 'test'
		end


	end

end