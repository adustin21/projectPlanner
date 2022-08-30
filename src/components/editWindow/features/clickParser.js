import { createItem } from "../../../methods/createItem";
import { editItem } from "../../../methods/editItem";
import { changeRedrawMode, renderApp } from "../../../methods/manageMap";
import { description } from "../../description/description";
import { formData } from "./formData";

/**
 * Parses click event, defines target and call relevant
 * manageMap or Methods method.
 * @param {MouseEvent} event
 * @param {TTask} task
 */
export const clickParser = (event, task) => {
	switch (event.target.name) {
		case clickType.cancel:
			changeRedrawMode("default")
			renderApp()
			break;
		case clickType.create:
			changeRedrawMode("default")
			createItem({
				mother: task.id,
				title: formData.getInputData() !== "" ?
					formData.getInputData(): "New Task",
				description: formData.getTextareaData(),
				time: "",
				status: "atWork"
			})
			break ;
		case clickType.edit:
			changeRedrawMode("default")
			editItem({
				...task,
				subTasksCount:undefined,
				title: formData.getInputData(),
				description: formData.getTextareaData()
			})
			break ;
		default:
			break;
	}
}
export const clickType = {
	cancel: "cancel",
	edit: "edit",
	create: "create"
}
/**@typedef {import("../../../methods/doc/manageMap").TTask} TTask*/
