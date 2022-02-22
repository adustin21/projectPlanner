import { manageMap } from "../../../../methods/manageMap"
import { actionButtonsCompiler } from "../actionButtonsCompiler"
import Ico_edit from "./edit.png"

export const button__edit = {
	ico: Ico_edit,
	handler: () => {
		manageMap.editTask();
	}
}

