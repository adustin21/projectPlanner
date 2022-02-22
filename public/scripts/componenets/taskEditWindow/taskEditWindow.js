import { constants } from "../../constants"
import { elementCreator } from "../elementCreator"
import { submitButton } from "./button/button"
import "./taskEditWindow.css"
import { pseudoInput } from "./pseudoInput/pseudoInput"
import { manageMap } from "../../methods/manageMap";
import { createItem } from "../../methods/createItem"
import { editItem } from "../../methods/editItem"

let taskSlicer = (task) => {
	if (task.id == null) {
		delete task.id
	}
	delete task.subTasksCount
	return task
}

export const taskEditWindow = (task) => {
	let taskTemp = taskSlicer({...manageMap.createTaskTemplate(), ...task});

	const taskChanger = (value, name) => {
		taskTemp[name] = value;
	}
	const el = elementCreator("taskEditWindow", [
		() => pseudoInput("text", "title", taskChanger, taskTemp.title),
		() => pseudoInput("textarea", "description", taskChanger, taskTemp.description),
		() => submitButton("NO TIME LIM", () => console.log(
			"Action unavailble"
		), "submitButton__time"),
		() => submitButton("CANCEL", () => {
			manageMap.changeRedrawMode(constants.REDRAWMODE.DEFAULT)
			manageMap.moveFocus(taskTemp.mother)
		}, "submitButton__cancel"),
		() => submitButton("SUBMIT", () => {
			editItem(taskTemp)
			manageMap.changeRedrawMode(constants.REDRAWMODE.DEFAULT)
			manageMap.moveFocus(taskTemp.id ? taskTemp.id : taskTemp.mother)
		}, "submitButton__submit"),
	])
	return el
}
