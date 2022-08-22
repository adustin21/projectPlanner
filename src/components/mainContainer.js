import { description } from './description/description'
import { elementCreator } from './elementCreator'
import './mainContainer.css'
import { subTasks } from './subTasks/subTasks'
import { task } from './task/task'

/** @namespace Components.mainContainer */
/**
 * Root component of the application.
 * Creates div which has three child:
 * <code>task</code>, <code>subTasks</code> and <code>description</code>
 * @see {Components.task}
 * @see {Components.subTasks}
 * @see {Components.description}
 *
 * @param {{
 * 	task: {},
 * 	subTasks: {},
 * 	focus: {}
 * }} map
 * @returns {HTMLDivElement}
 */
export const mainContainer = (map) => {
	return elementCreator("mainContainer", [
		() => task(map.task, map.focus.id),
		() => subTasks(map.subTasks, map.focus.id),
		() => description(map.focus)
	]);
}
