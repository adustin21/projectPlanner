import { createElement } from "../../methods/createElement"
import { description } from "../description/description"
import { subTasks } from "../subTasks/subTasks"
import { task } from "../task/task"
import "./mainContainer.css"

/**
 * Returns the root component.
 * @param {TVisibleMap} map
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const mainContainer = (map) => {
	/* Element Created */
	const element = createElement('mainContainer', [
		() => task(map.task),
		() => description(map.task),
		() => subTasks(map.subTasks)
	])

	/* Element Returned */
	return element
}

/** @typedef {import("../../methods/doc/manageMap").TVisibleMap} TVisibleMap*/
