import { createElement } from "../../methods/createElement"
import { moveCursor } from "../../methods/manageMap"
import { task } from "../task/task"
import "./subTasks.css"

/**
 * Return the subtasks component.
 * <br>
 * <br>
 *
 * !Changes some styles of task component!
 * @param {TBranch[]} tasks
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const subTasks = (tasks) => {
	/* Tasks parsed */
	const tasksElements =
		tasks.map(taskObject =>()=>task(taskObject))

	/* Element Created */

	const element = createElement('subTasks', [
		...tasksElements
	])
	/** Handlers Added */
	element.onclick = e => {
		const dataID = e.target.getAttribute('data-id')
		if (dataID) moveCursor(dataID)
	}
	/* Element Returned */
	return element
}

/**@typedef {import("../../methods/doc/manageMap").TBranch} TBranch*/
