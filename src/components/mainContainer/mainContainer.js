import { elementCreator } from '../elementCreator'
import { description } from '../description/description'
import { subTasks } from '../subTasks/subTasks'
import { task } from '../task/task'
import './mainContainer.css'

/**
 * @name mainContainer
 * @description
 * Root component of the application.
 * <br>
 *
 * Creates div which has three child:
 * {@link Components.task}
 * @param {{
 * 	task: object,
 * 	subTasks: object,
 * 	focus: object
 * }} map
 * @memberof Components
 * @type {Component}
 */
export const mainContainer = (map) => {
	return elementCreator("mainContainer", [
		() => task(map.task, map.focus.id),
		() => subTasks(map.subTasks, map.focus.id),
		() => description(map.focus)
	]);
}
