import { createElement } from "../../methods/createElement"
import "./mainContainer.css"

/**
 * Return the root component.
 * @param {TVisibleMap} map
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const mainContainer = (map) => {
	/* Element Created */
	const element = createElement('mainContainer', [
		"task",
		"description",
		"subtasks"
	])

	/* Element Returned */
	return element
}

/** @typedef {import("../../methods/doc/manageMap").TVisibleMap} TVisibleMap*/
