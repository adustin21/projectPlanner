import { constants } from "../../../constants";
import { button__delete } from "./delete/delete";
import { button__done } from "./done/done";
import { button__edit } from "./edit/edit";
import { button__undone } from "./undone/undone";


/**
 * Returns an object compiled depending on `mode` parametr
 * @param { string } mode `"default"` | `"mother"` | "done"
 */
export const actionButtonsCompiler = (mode) => {
	switch (mode) {
		case constants.ACTIONBUTTONSMODES.DEFAULT:
			return [
				button__delete,
				button__edit,
				button__done,
			]
		case constants.ACTIONBUTTONSMODES.MOTHER:
			return []
		case constants.ACTIONBUTTONSMODES.DONE:
			return [
				button__delete,
				button__undone,
			]
		default:
			return []
	}
}
