import { constants } from '../../assets/constants';
import { manageMap } from '../../methods/manageMap';
import { elementCreator } from '../elementCreator';
import { plusButton } from '../plusButton/plusButton';
import './task.css'

const correctHandler = (task, action) => {
	const screenWidth = window.innerWidth;
	const isTouch = (
		'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
		);
	if (action === "click") {
		if (screenWidth <= 1100 || isTouch)
			manageMap.moveCursor(task.id == constants.MOTHER ? task.id : task.mother)
		manageMap.moveFocus(task.id == constants.MOTHER ? task.id : task.mother)
	}
	if (action === "doubleclick") {
		if (screenWidth > 1100)
			manageMap.moveCursor(task.id == constants.MOTHER ? task.id : task.mother)
	}
}

export const task = (task, focusID) => {
	const element = elementCreator(
		[
			'task',
			task.id == focusID ? "task_focused" : "task_unfocused",
			`task_${task.status}`
		],
		[
			task.title,
			() => {
				switch (task.status) {
					case constants.TASKSTATUS.DONE:
						return document.createElement('div')
					default:
						return plusButton(task)
				}
			},
		]
	)

	element.onclick = () => correctHandler(task, "click")
	element.ondblclick = () => correctHandler(task, "doubleclick")
	// element.onclick = () => manageMap.moveFocus(task.id)
	// element.ondblclick = () => manageMap.moveCursor(task.id == constants.MOTHER ? task.id : task.mother)
	return element;

}
