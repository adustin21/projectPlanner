/**
 * Returns an HTMLDivElement that has class or classes passing in the first argument
 * and that is parent to elements passing in the second argument.
 *
 * Each element in the array of the second argument must be a callback that
 * returns an HTML element, else it will be handled as a string
 * @param {String | Array<String>} name Class name or array
 * of class names
 * @param {Array<String | ()=> HTMLElement>} children Array of a strings or
 * functions that returns an HTML element
 * @returns {HTMLDivElement}
 */
export const elementCreator = (name, children = []) => {
	let el = document.createElement('div');
	if (Array.isArray(name)) {
		el.classList.add(...name)
	}else{
		el.classList.add(name)
	}
	children.forEach(child => {
		if(child instanceof Function &&
			child() instanceof HTMLElement)
		{
			el.appendChild(child())
		}else{
			el.appendChild(document.createTextNode(child))
		}
	});
	return el;
}
