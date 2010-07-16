
describe 'Core'
  before
	core = new Core()
	activityClass = Activity
	uid = core.register(activityClass)
	activity = core.activities[uid]
  end

	describe 'register()'
		it 'should add a new object to core.activities where instance is null'
			activity.should.be_an_instance_of Object
			activity.instance.should.be_null
		end
	end

	describe 'start()'
		it 'should create a new instance of the activity'
			core.start(uid)
			activity.instance.should.be_an_instance_of Activity
		end

		it 'all startet activities should have the same eventbus'
			uid = core.register(activityClass)
			core.start(uid)
			activity1 = core.activities[uid].instance
			uid = core.register(activityClass)
			core.start(uid)
			activity2 = core.activities[uid].instance
			activity1.eventBus.should.be activity2.eventBus
		end
	end

	describe 'stop()'
		it 'should destroy the instance of the activity'
			core.stop(uid)
			activity.instance.should.be_null
		end
	end
end