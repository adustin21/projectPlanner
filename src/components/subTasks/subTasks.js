import { manageMap } from "../../methods/manageMap"
import { elementCreator } from "../elementCreator"
import "./subTasks.css"

const correctHandler = (task, action) => {
	const screenWidth = window.innerWidth;
	const isTouch = (
		'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
		);
	if (action === "click") {
		if (screenWidth <= 1100 || isTouch){
			manageMap.moveCursor(task.id)
			window.scrollTo(0,0)
		}
		manageMap.moveFocus(task.id)
	}
	if (action === "doubleclick") {
		if (screenWidth > 1100)
			manageMap.moveCursor(task.id)
	}
}

export const subTasks = (subTasksArray, focusID) => {
	const subTasksElArray = subTasksArray.map(task => {
		const el = elementCreator(
			[
				'subTask',
				task.id == focusID ? "subTask_focused" : "subTask_unfocused",
				`subTask_${task.status}`
			],
			[
				task.title
			]
		)
		el.onclick = () => correctHandler(task, "click")
		el.ondblclick = () => correctHandler(task, "doubleclick")
		// el.onclick = () => manageMap.moveFocus(task.id)
		// el.ondblclick = () => manageMap.moveCursor(task.id)
		return () => el
	})
	return elementCreator("subTasks", [...subTasksElArray])
}
