import { constants } from "../../constants"
import { elementCreator } from "../elementCreator"
import { actionBox } from "./actionBox/actionBox"
import { infoBox } from "./infoBox/infoBox"
import "./description.css"
import { actionButtonsCompiler } from "./data__actionButtons/actionButtonsCompiler"
import { manageMap } from "../../methods/manageMap"


/**
 * Returns action buttons mode based of task data
 * @param {{}} task focused task
 */
const determineActionButtonMode = (task) => {
	if (task.id == constants.MOTHER)
		return constants.ACTIONBUTTONSMODES.MOTHER
	if (task.status == constants.TASKSTATUS.DONE)
		return constants.ACTIONBUTTONSMODES.DONE
	return constants.ACTIONBUTTONSMODES.DEFAULT
}

export const description = (task) => {
	const focusedTask = {...manageMap.createTaskTemplate(), ...task}
	const actionButtonsMode = determineActionButtonMode(focusedTask);
	const actionButtons = actionButtonsCompiler(actionButtonsMode);
	return elementCreator(
		[
			"description",
			`description_${task.status}`
		],
		[
		() => infoBox(focusedTask.time, "time"),
		() => infoBox(focusedTask.subTasksCount, "subtasks"),
		() => elementCreator("descriptionTitle", [
			focusedTask.title
		]),
		() => elementCreator("descriptionText", [
			focusedTask.description
		]),
		() => actionBox(actionButtons, focusedTask.id),
	])
}
