import { createElement } from "../../methods/createElement"

/**
 * Returns the actionArea component.
 * @param {string} title
 * @param {HTMLButtonElement[]} buttons
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const actionArea = (title, buttons) => {
	/* Buttons Parsed */
	const buttonsElements = buttons.map(button=>()=>button)

	/* Elements Created */
	const element = createElement('actionArea', [
		title,
		...buttonsElements
	])

	/* Element Returned */
	return element
}
