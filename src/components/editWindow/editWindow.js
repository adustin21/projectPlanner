import { createCustomElement } from "../../methods/createCustomElement";
import { createElement } from "../../methods/createElement"
import { button } from "../button/button"
import { clickParser } from "./features/clickParser";
import { formData } from "./features/formData";
import "./editWindow.css"

/**
 * Returns the description component.
 * @param { TTask } task
 * @param {"edit" | "create"} type
 * @return {HTMLDivElement}
 * @memberof Components
 */
export const editWindow = (task,type) => {
	/* Children Elements Created */
	/**@type {HTMLInputElement} */
	const elementInput =
		createCustomElement('input', 'editWindow__input')
	const elementTextArea =
		createCustomElement('textarea', 'editWindow__textarea')
	const elementCancelButton =
		button('danger', 'cancel', 'cancel')
	const elementSubmitButton =
		button('submit', 'create', 'create')

	/* Children Elements Modified */

	elementInput.name = 'title'
	elementInput.placeholder = 'Title'
	elementInput.autocomplete = 'off'
	formData.linkInput(elementInput)
	elementTextArea.name = 'Description'
	elementTextArea.placeholder = 'description'
	formData.linkTextarea(elementTextArea)

	/* Element Created */
	const element = createElement('editWindow', [
		()=>elementInput,
		()=>elementTextArea,
		()=>elementSubmitButton,
		()=>elementCancelButton,
	])

	/** Handlers Added */
	element.onclick = (e)=>clickParser(e, task)
	/* Element Returned */
	return element
}

/** @typedef {import("../../methods/doc/manageMap").ID} ID*/
/** @typedef {import("../../methods/doc/manageMap").TTask} TTask*/
