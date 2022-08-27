/**
 * Returns an HTMLDivElement that has class or classes passing
 * in the first argument and that is parent to elements passing
 * in the second argument.
 * <br>
 * <br>
 *
 * Each element in the array of the second argument must be a
 * callback that returns an HTML element, else it will be handled
 * as a string
 * @param { string | string[]} name Class name or array.
 * of class names.
 * @param {String[] | (() => HTMLElement)[]} children Array of
 * a strings or callbacks that returns an HTML element.
 * @returns {HTMLDivElement}
 * @memberof Methods
 */
export const createElement = (name, children = []) => {
	/* Element Created */
	let element = document.createElement('div')

	/* Classes Added */
	if (Array.isArray(name))
		element.classList.add(...name)
	else
		element.classList.add(name)

	/* Children added */
	children.forEach(child => {
		if(child instanceof Function &&
			child() instanceof HTMLElement)
			element.appendChild(child())
		else{
			const span = document.createElement("span")
			const text = document.createTextNode(child)
			span.appendChild(text)
			element.appendChild(span)
		}
	})

	/* Element returned */
	return element
}
