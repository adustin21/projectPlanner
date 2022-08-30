import { createCustomElement } from "../../methods/createCustomElement"
import { createElement } from "../../methods/createElement"
import { link } from "../link/link"
import "./columnLayout.css"

/**
 * Returns the layout wrapper.
 * @param {(()=>HTMLElement)[]} children
 * @param {"task" | "subtasks" | "description" | "empty"} type
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const columnLayout = (children, type) => {
	/* Variables Declared */
	const _headerText =
		type === 'task' ? 'Task' : 'Sub-tasks'
	const _linkURL = 'https://pomodoro-by-adustin21.netlify.app'
	const classes = ['columnLayout', `columnLayout_${type}`]
	/* Elements Created */
	const elementHeader =
		createCustomElement('h1', 'columnLayout__header', [_headerText])
	const elementPomodoroLink =
		link('green_fill', _linkURL, 'Open pomodoro')

	/* Elements parsed */
	const elements = [
		type !== "empty" && (()=>elementHeader),
		...children,
		type === 'task' && (()=>elementPomodoroLink)
	].filter(element=>element)

	/* Element Created */
	const element = createElement(classes, [
		...elements
	])

	/* Element Returned */
	return element
}
