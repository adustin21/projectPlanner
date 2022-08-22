import { constants } from "../../../../assets/constants";
import { manageMap } from "../../../../methods/manageMap"
import Ico_undone from "./undone.png"

export const button__undone = {
	ico: Ico_undone,
	handler: () => {
		manageMap.markTask(constants.TASKSTATUS.ATWORK);
	}
}
