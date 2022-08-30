import { createTask, deleteTask, editTask, markTask, moveCursor } from "../../../methods/manageMap";

/**
 * Parses click event, defines target and call relevant
 * manageMap method.
 * @param {MouseEvent} event
 * @param {TTask} task
 */
export const clickParser = (event, task) => {
	switch (event.target.name) {
		case clickType.createChild:
			createTask()
			break;
		case clickType.parent:
			moveCursor(task.mother)
			break;
		case clickType.inWork:
			if(task.status==='done')markTask('atWork')
			break;
		case clickType.complete:
			if(task.status==='atWork')markTask('done')
			break;
		case clickType.edit:
			editTask()
			break;
		case clickType.delete:
			deleteTask(task.id)
			break;
		default:
			break;
	}
}
export const clickType = {
	createChild: "createChild",
	parent: "parent",
	inWork: "inWork",
	complete: "complete",
	edit: "edit",
	delete: "delete"
}

/** @typedef {import("../../../methods/manageMap").TTask} TTask*/
