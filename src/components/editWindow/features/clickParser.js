import { createItem } from "../../../methods/createItem";
import { changeRedrawMode, renderApp } from "../../../methods/manageMap";
import { formData } from "./formData";

/**
 * Parses click event, defines target and call relevant
 * manageMap or Methods method.
 * @param {MouseEvent} event
 * @param {TTask} task
 */
export const clickParser = (event, task) => {
	switch (event.target.name) {
		case "cancel":
			changeRedrawMode("default")
			renderApp()
			break;
		case "create":
			changeRedrawMode("default")
			createItem({
				mother: task.id,
				title: formData.getInputData() !== "" ?
					formData.getInputData(): "New Task",
				description: formData.getTextareaData(),
				time: "",
				status: "atWork"
			})
		default:
			break;
	}
}
/**@typedef {import("../../../methods/doc/manageMap").TTask} TTask*/
