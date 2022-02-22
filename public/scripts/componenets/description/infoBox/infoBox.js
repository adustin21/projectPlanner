import { elementCreator } from "../../elementCreator"
import "./infoBox.css"

export const infoBox = (data = "data", title = "title") => {
	return elementCreator("infoBox", [
		() => elementCreator("infoBox__data", [
			data
		]),
		() => elementCreator("infoBox__title", [
			title
		])
	])
}
