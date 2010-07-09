
describe 'Listbox'
  before
    list=sandbox().set('html', fixture('simplelist')).getElement('div')
	items = list.getElements('span')
	listbox = new Aria.Listbox()
	listbox.setAria({
		selectors: {
			listbox: list,
			option: 'span'
		},
		ariaAttributes: {
			listbox: {multiselectable: true}
		}
	});
  end

  describe 'after initialisation'
    it 'list should have role "listbox", tabindex "0" and multiselectable "true"'
    	list.should.have_attr 'role', 'listbox'
		list.should.have_attr 'tabindex', '0'
		list.should.have_attr 'aria-multiselectable', 'true'
    end
	it 'childs should have role "option" and tabindex "-1" the second item should have aria-checked "true"'
    	items.should.have_attr 'role', 'option'
		items.should.have_attr 'tabindex', '-1'
    end
	it 'a child should have aria-checked "true" after clicking it '
		list.fireEvent('click', {target:items[0]})
		items[0].should.have_attr 'aria-checked', 'true'
	end
	it 'the second child should have aria-checked "true" pressing key right '
		list.fireEvent('keyup', {key: 'right'})
		items[1].should.have_attr 'aria-checked', 'true'
	end
	it 'both childs should have aria-checked "true" pressing key left and holding shift '
		list.fireEvent('keyup', {key: 'left', shift: true})
		items[0].should.have_attr 'aria-checked', 'true'
		items[1].should.have_attr 'aria-checked', 'true'
	end
  end
end

describe 'Radiogroup'
  before
    list=sandbox().set('html', fixture('simplelist')).getElement('div')
	items = list.getElements('span')
	listbox = new Aria.Radiogroup()
	listbox.setAria({
			selectors: {
				radiogroup: list,
				radio: 'span'
			}
	});
  end

  describe 'after initialisation'
    it 'list should have role "listbox", tabindex "0" and multiselectable "false"'
    	list.should.have_attr 'role', 'radiogroup'
		list.should.have_attr 'tabindex', '0'
		list.should.have_attr 'aria-multiselectable', 'false'
    end
	it 'childs should have role "option" and tabindex "-1" the first item should have aria-checked "true" and the second item should have aria-checked "false"'
    	items.should.have_attr 'role', 'radio'
		items.should.have_attr 'tabindex', '-1'
		items[0].should.have_attr 'aria-checked', 'true'
		items[1].should.have_attr 'aria-checked', 'false'
    end
  end
end

describe 'Combobox'
  before
    box=sandbox().set('html', fixture('combobox')).getElement('div')
	textbox  = box.getElements('span')
	list  = box.getElement('ul')
	items = box.getElements('li')
	combobox = new Aria.Combobox()
	combobox.setAria({
			selectors: {
				combobox: box
			}
	});
  end

  describe 'after initialisation'
    it 'box should have role "listbox", tabindex 0 and aria-expanded false'
    	box.should.have_attr 'role', 'combobox'
		box.should.have_attr 'tabindex', '0'
		box.should.have_attr 'aria-expanded', 'false'
    end
	it 'first childs should have role "textbox" and tabindex "-1"'
    	textbox.should.have_attr 'role', 'textbox'
		textbox.should.have_attr 'tabindex', '-1'
    end
	it 'list childs should have role "listbox" and tabindex "-1"'
    	list.should.have_attr 'role', 'listbox'
		list.should.have_attr 'tabindex', '-1'
    end
	it 'the box should fire open event and have aria-expanded false after clicking or getting focus'
		a = false
		combobox.addEvent('opened', function(){a=true;})
		combobox.addEvent('closed', function(){a=false})
		textbox.fireEvent('click')
		box.should.have_attr 'aria-expanded', 'true'
		a.should.be_true
		console.log(box)
		box.fireEvent('click',{target:items[0]})
		box.should.have_attr 'aria-expanded', 'false'
		a.should.be_false
		items[0].should.have_attr 'aria-checked', 'true'

	end
  end
end