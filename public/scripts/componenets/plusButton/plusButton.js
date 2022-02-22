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
	element.onclick = () => manageMap.createTask(task.id)
	return element;
}
