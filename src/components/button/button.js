import { createCustomElement } from "../../methods/createCustomElement"

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
	const classes = ['button', `button__${type}`]
	/**@type {HTMLButtonElement} */
	const element =
		createCustomElement('button', classes ,[value])

	/* Element Modified */
	element.name = name
	/* Element Returned */
	return element
}

/** @typedef {"default" | "inactive" | "link" | "danger" | "submit"} TButtonType*/
