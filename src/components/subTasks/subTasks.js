import { createElement } from "../../methods/createElement"
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

	/* Element Returned */
	return element
}

/**@typedef {import("../../methods/doc/manageMap").TBranch} TBranch*/
