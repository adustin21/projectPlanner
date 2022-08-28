import { createCustomElement } from "../../methods/createCustomElement"
import "./button.css"

/**
 * Returns the button component.
 * @param {TButtonType} type
 * @param {string} name
 * @param {string} value
 * @return {HTMLButtonElement}
 * @memberof Components
 */
export const button = (type, name, value) => {
	/* Element Created */
	const classes = ['button', `button_${type}`]
	/**@type {HTMLButtonElement} */
	const element =
		createCustomElement('button', classes ,[value])

	/* Element Modified */
	element.name = name
	/* Element Returned */
	return element
}

/** @typedef {"default" | "inactive" | "link" | "danger" | "submit"} TButtonType*/
