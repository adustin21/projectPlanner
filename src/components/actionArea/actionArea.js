import { createElement } from "../../methods/createElement"
import "./actionArea.css"

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
	const elementTitle = createElement('actionArea__title', [title])
	const element = createElement('actionArea', [
		()=>elementTitle,
		...buttonsElements
	])

	/* Element Returned */
	return element
}
