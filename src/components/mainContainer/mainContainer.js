import { createElement } from "../../methods/createElement"
import { subTasks } from "../subTasks/subTasks"
import { task } from "../task/task"
import "./mainContainer.css"

const demoSubtasks = [
	{id: 0, mother: "mother", title: "First"},
	{id: 1, mother: "mother", title: "Second"},
	{id: 2, mother: "mother", title: "Third"},
]
/**
 * Return the root component.
 * @param {TVisibleMap} map
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const mainContainer = (map) => {
	/* Element Created */
	const element = createElement('mainContainer', [
		() => task(map.task),
		"description",
		() => subTasks(demoSubtasks)
	])

	/* Element Returned */
	return element
}

/** @typedef {import("../../methods/doc/manageMap").TVisibleMap} TVisibleMap*/
