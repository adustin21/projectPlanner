import { constants } from "../../../../constants";
import { manageMap } from "../../../../methods/manageMap"
import Ico_done from "./done.png"

export const button__done = {
	ico: Ico_done,
	handler: () => {
		manageMap.markTask(constants.TASKSTATUS.DONE);
	}
}
