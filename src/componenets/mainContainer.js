import { description } from './description/description';
import { elementCreator } from './elementCreator';
import './mainContainer.css'
import { subTasks } from './subTasks/subTasks';
import { task } from './task/task';

/**
 * Main component
 * @param {{
 * 	task: {},
 * 	subTasks: {},
 * 	focus: {}
 * }} map
 * @returns
 */

export const mainContainer = (map) => {
	return elementCreator("mainContainer", [
		() => task(map.task, map.focus.id),
		() => subTasks(map.subTasks, map.focus.id),
		() => description(map.focus)
	]);
}
