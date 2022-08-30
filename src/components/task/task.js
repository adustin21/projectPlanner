import { createElement } from "../../methods/createElement"
import "./task.css"

/**
 * Return the task component.
 * <br>
 * <br>
 *
 * The returned element has "data-id" and "data-mother" attributes,
 * which store the "id" and "mother" fields of the task.
 * @param {TTask} taskObject
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const task = (taskObject) => {
	/* Element Created */

	const element = createElement('task', [
		taskObject.title
	])

	/* Element Modified */
	element.setAttribute('data-id', taskObject.id)
	element.setAttribute('data-mother', taskObject.mother)
	element.classList.add(`task_${taskObject.status}`)

	/* Element Returned */
	return element
}

/**@typedef {import("../../methods/doc/manageMap").TTask} TTask*/
