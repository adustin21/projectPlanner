import { manageMap } from '../../methods/manageMap';
import { elementCreator } from '../elementCreator';
import './plusButton.css'
import Icon_Plus from "./plus.png"

export const plusButton = (task) => {
	const element = elementCreator([
		'plusButton',
		`plusButton_${task.status}`
	]);
	element.style.backgroundImage = `url(${Icon_Plus})`
	element.addEventListener("click", e => {
		e.stopPropagation();
		manageMap.createTask(task.id)
		manageMap.moveFocus(task.id)
	})
	return element;
}
