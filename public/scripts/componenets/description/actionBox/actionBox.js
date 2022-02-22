import { elementCreator } from "../../elementCreator"
import "./actionBox.css"


/**
 * Accepts the array of buttons where the button is an object
 * with two elements: `icon` is the button's image and
 * `handler` is the button's click action
 * @param {[]} buttons
 * @returns
 */

export const actionBox = (buttons = [], taskID) => {
	const elArray = buttons.map(button => {
		const el = elementCreator("actionBox__button");
		el.onclick = () => button.handler(taskID);
		el.style.backgroundImage = `url(${button.ico})`
		return () => el;
	})
	const el = elementCreator("actionBox", elArray)
	return el
}
