import { elementCreator } from "../../elementCreator"
import "./button.css"

export const submitButton = (text, handler, className) => {
	const el = elementCreator(["submitButton", className], [
		text
	])
	el.onclick = handler
	return el
}
