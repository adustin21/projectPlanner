import { createElement } from "../../methods/createElement"
import { actionArea } from "../actionArea/actionArea"
import { button } from "../button/button"
import "./description.css"
import { clickParser, clickType } from "./features/clickHandler"

/**
 * Returns the description component.
 * @param {TTask} task
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const description = (task) => {
	/* Children Elements Created */
	const elementTitle =
		createElement('description__title', [task.title])
	const elementText =
		createElement('description__text', [task.description])
	const elementTree =
		actionArea('Tree', [
			button('link', clickType.parent, '↰go to the parent'),
			button('link', clickType.createChild, '+create sub-task')
		])
	const elementMotherTree =
		actionArea('Tree', [
			button('link', clickType.createChild, '+create sub-task')
		])
	const elementStatus =
		actionArea('Status', [
			button(task.status === "atWork"?'default':'inactive_link',
			clickType.inWork, 'in work'),
			button(task.status === "done"?'default':'inactive_link',
			clickType.complete, 'complete')
		])
	const elementActions =
		actionArea('Actions', [
			button('default', clickType.edit, 'edit'),
			button('danger', clickType.delete, 'delete')
		])
	const elementDoneActions =
		actionArea('Actions', [
			button('danger', clickType.delete, 'delete')
		])

	/* Children elements parsed and united */
	const elementChildren = [
		()=>elementTitle,
		()=>elementText,
		task.id === "mother" && (()=>elementMotherTree),
		task.id !== "mother" && (()=>elementTree),
		task.id !== "mother" && (()=>elementStatus),
		task.id !== "mother" && task.status === 'atWork' &&
					(()=>elementActions),
		task.status === 'done' && (()=>elementDoneActions)

	].filter(child=>child)

	/* Element Created */
	const element = createElement('description', elementChildren)

	/** Handlers Added */
	element.onclick = e=>clickParser(e, task)
	/** Element Modified */
	element.classList.add(`description_${task.status}`)
	/* Element Returned */
	return element
}

/** @typedef {import("../../methods/doc/manageMap").TTask} TTask*/
