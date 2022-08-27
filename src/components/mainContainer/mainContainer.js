import { elementCreator } from '../elementCreator'
import { description } from '../description/description'
import { subTasks } from '../subTasks/subTasks'
import { task } from '../task/task'
import './mainContainer.css'

/**
 * Return the root component.
 * @param {TVisibleMap} map
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const mainContainer = (map) => {
	/* Element Created */

	const element = elementCreator("mainContainer", [
		() => task(map.task, map.focus.id),
		() => subTasks(map.subTasks, map.focus.id),
		() => description(map.focus)
	]);

	/* Element returned */

	return element;
}

/** @typedef {import("../../methods/doc/manageMap").TVisibleMap} TVisibleMap*/
