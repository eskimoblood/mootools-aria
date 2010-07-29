
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

describe 'Button'
  before
    div = new Element('div')
	button = new Aria.Button()
	button.setAria({
		selectors: {
			button: div
		}
	})

  end

  describe 'after initialisation'
    it 'box should have role "button", tabindex 0 and aria-pressed false'
    	div.should.have_attr 'role', 'button'
		div.should.have_attr 'tabindex', '0'

    end

	it 'on keydown the element should have  aria-pressed set to true and back to false on keyup using the enter key all other keys should be ignored'
    	div.fireEvent('keydown', {type: 'keydown', key:'enter'})
		div.should.have_attr 'aria-pressed', 'true'
    	div.fireEvent('keyup', {type: 'keyup', key:'enter'})
		div.should.have_attr 'aria-pressed', 'false'

		div.fireEvent('keydown', {type: 'keydown', key:'left'})
		div.should.have_attr 'aria-pressed', 'false'
    	div.fireEvent('keyup', {type: 'keyup', key:'left'})
		div.should.have_attr 'aria-pressed', 'false'
    end

	it 'on mousedown the element should have  aria-pressed set to true and back to false on mouseup'
    	div.fireEvent('mousedown', {type: 'mousedown'})
		div.should.have_attr 'aria-pressed', 'true'
    	div.fireEvent('mouseup', {type: 'mouseup'})
		div.should.have_attr 'aria-pressed', 'false'
    end

	it 'on mousedown the element should have  aria-pressed set to true and back to false on mouseup when the mouse has leave the button'
    	div.fireEvent('mousedown', {type: 'mousedown'})
		div.should.have_attr 'aria-pressed', 'true'
    	div.fireEvent('mouseleave', {type: 'mouseup'})
		div.should.have_attr 'aria-pressed', 'true'
		window.fireEvent('mouseup', {type: 'mouseup'})
		div.should.have_attr 'aria-pressed', 'false'
    end

	it 'should fire event click when the clicked'
		a = ''
		button.addEvent('click', function(){a=1})
    	div.fireEvent('click', {type: 'click'})
		a.should.be 1

    end

  end
end

describe 'AlertDialog'
  before
    div = new Element('div', {html: 'some text, <span>ok</span>'})
	button = new Aria.AlertDialog()
	test=0
	button.setAria({
		selectors: {
			alertdialog: div
		},
		dialogFunctions: [
			{function: function(){test=1}, event: 'click', selector:'span'}
		]
	})

  end

  describe 'after initialisation'
    it 'box should have role "button", tabindex 0 and aria-pressed false the first span '
    	div.should.have_attr 'role', 'alertdialog'
		div.should.have_attr 'tabindex', '0'
    end

	
  end
end