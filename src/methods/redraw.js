import { taskEditWindow } from "../components/taskEditWindow/taskEditWindow"
import { mainContainer } from "../components/mainContainer"
import { constants } from "../assets/constants";

/**
 * Deletes all elements that are child elements of the parent
 * element
 * @param {HTMLElement} parent
 * @param { [HTMLElement] } elemntsToBeCleanedArray
 */
const clean = (parent, elemntsToBeCleanedArray) => {
	elemntsToBeCleanedArray.forEach(element => {
		if (element) {
			parent.removeChild(element)
		}
	});
}
/**
 * Redraws dom tree based on map and motherId
 * If motherId isn't false, the task editing window will be drawn
 * @param { Object } map
 * @param { Object } map.task
 * @param { Array } map.subtasks
 * @param { Object } map.focus
 * @param { ID } motherId
 */
export const redraw = (map, mode) => {
	clean(document.body, [
		document.querySelector(".mainContainer"),
		document.querySelector(".taskEditWindow"),
	])
	document.body.appendChild(mainContainer(map))
	switch (mode) {
		case constants.REDRAWMODE.CREATE:
			document.body.appendChild(taskEditWindow({mother: map.task.id}))
			break;
		case constants.REDRAWMODE.EDIT:
			document.body.appendChild(taskEditWindow({...map.focus}))
			break;
		default:
			break;
	}
}
