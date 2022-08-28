
/**
 * Returns a tag specific HTMLElement that has the class or
 * classes passed in the second argument, and is parent to
 * the elements passed in the third argument.
 * <br>
 * <br>
 *
 * Each element in the array of the third argument must be a
 * callback that returns an HTML element, else it will be handled
 * as a string
 * @param { keyof HTMLElementTagNameMap } tagName Name of the
 * HTML tag.
 * @param { string | string[]} name Class name or array.
 * of class names.
 * @param {String[] | (() => HTMLElement)[]} children Array of
 * a strings or callbacks that returns an HTML element.
 * @returns {HTMLElement}
 * @memberof Methods
 */
export const createCustomElement = (tagName, name, children = []) => {
	/* Element Created */
	let element = document.createElement(tagName)

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
		else
			element.innerText = child
	})

	/* Element returned */
	return element
}
