import { mainContainer } from "../components/mainContainer/mainContainer"
import { constants } from "../assets/constants";
import { editWindow } from "../components/editWindow/editWindow";

/**
 * Deletes all elements that are child elements of the parent
 * element.
 * @param {HTMLElement} parent
 * @param { HTMLElement[] } elemntsToBeCleanedArray
 */
const clean = (parent, elemntsToBeCleanedArray) => {
	elemntsToBeCleanedArray.forEach(element => {
		if (element) {
			parent.removeChild(element)
		}
	});
}

/**
 * Redraws the DOM tree based on map and
 * @function
 * @param { TVisibleMap } map
 * @param { TRedrawMode } mode
 * @memberof Methods
 */

export const redraw = (map, mode) => {
	clean(document.body, [
		document.querySelector(".mainContainer"),
		document.querySelector(".editWindow"),
	])
	document.body.appendChild(mainContainer(map))
	switch (mode) {
		case constants.REDRAWMODE.CREATE:
			document.body.
				appendChild(editWindow(map.task, "create"))
			break;
		case constants.REDRAWMODE.EDIT:
			document.body.
				appendChild(editWindow(map.task, "edit"))
			break;
		default:
			break;
	}
}

/**@typedef {import("./doc/manageMap").TVisibleMap} TVisibleMap*/
/**@typedef {import("./doc/manageMap").ID} ID*/
/** @typedef {"default" | "create" | "edit" | "warning" | "lowerWarning"} TRedrawMode*/
