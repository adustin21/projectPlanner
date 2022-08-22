import "./pseudoInput.css"

export const pseudoInput = (type, name, handler, value) => {
	const el = document.createElement(type != 'textarea' ? 'input' : 'textarea')
	if(type != 'textarea'){
		el.type = type;
	}
	el.name = name;
	el.placeholder = name;
	el.value = value;
	el.onchange = e => {
		handler(e.target.value, name)
	}
	return el
}
