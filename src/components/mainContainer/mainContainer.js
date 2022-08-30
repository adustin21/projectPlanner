import { createElement } from "../../methods/createElement"
import { columnLayout } from "../columnLayout/columnLayout"
import { description } from "../description/description"
import { subTasks } from "../subTasks/subTasks"
import "./mainContainer.css"

/**
 * Returns the root component.
 * @param {TVisibleMap} map
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const mainContainer = (map) => {
	/* Elements parsed */
	const elements = [
		() => columnLayout([()=>description(map.task)], 'task'),
		() => columnLayout([()=>subTasks(map.subTasks)],
							map.subTasks.length ?'subtasks':'empty')
	]

	/* Element Created */
	const element = createElement('mainContainer', [
		...elements
	])

	/* Element Returned */
	return element
}

/** @typedef {import("../../methods/doc/manageMap").TVisibleMap} TVisibleMap*/
