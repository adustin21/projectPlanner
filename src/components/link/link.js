import { createCustomElement } from "../../methods/createCustomElement"
import "./link.css"

/**
 * Returns the button component.
 * @param {TLinkType} type
 * @param {string} href
 * @param {string} value
 * @param {boolean} newTab
 * @return {HTMLLinkElement}
 * @memberof Components
 */
export const link = (type, href, value, newTab) => {
	/* Element Created */
	const classes = ['link', `link_${type}`]
	/**@type {HTMLLinkElement} */
	const element =
		createCustomElement('a', classes , [value])

	/* Element Modified */
	element.href = href
	if(newTab)element.setAttribute('target', '_blank')
	/* Element Returned */
	return element
}

/** @typedef {"default" | "green_fill"} TLinkType*/
