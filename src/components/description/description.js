import { createElement } from "../../methods/createElement"
import { changeRedrawMode, renderApp } from "../../methods/manageMap"
import { actionArea } from "../actionArea/actionArea"
import { button } from "../button/button"
import "./description.css"

/**
 * Parses click event, defines target and call relevant
 * manageMap method.
 * @param {MouseEvent} event
 */
const clickParser = (event) => {
	switch (event.target.name) {
		case "createChild":
			changeRedrawMode("create");
			renderApp()
			break;

		default:
			break;
	}
}
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
			button('link', 'parent', 'go to the parent'),
			button('link', 'createChild', 'create sub-task')
		])
	const elementMotherTree =
		actionArea('Tree', [
			button('link', 'createChild', 'create sub-task')
		])
	const elementStatus =
		actionArea('Status', [
			button('default', 'inWork', 'in work'),
			button('default', 'complete', 'complete')
		])
	const elementActions =
		actionArea('Status', [
			button('default', 'edit', 'edit'),
			button('danger', 'delete', 'delete')
		])

	/* Children elements parsed and united */
	const elementChildren = [
		()=>elementTitle,
		()=>elementText,
		task.id === "mother" && (()=>elementMotherTree),
		task.id !== "mother" && (()=>elementTree),
		task.id !== "mother" && (()=>elementStatus),
		task.id !== "mother" && (()=>elementActions),

	].filter(child=>child)

	/* Element Created */
	const element = createElement('description', elementChildren)

	/** Handlers Added */
	element.onclick = clickParser
	/* Element Returned */
	return element
}

/** @typedef {import("../../methods/doc/manageMap").TTask} TTask*/
