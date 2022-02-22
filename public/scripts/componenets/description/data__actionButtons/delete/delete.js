import { manageMap } from "../../../../methods/manageMap"
import Ico_delete from "./delete.png"

export const button__delete = {
	ico: Ico_delete,
	handler: (taskID) => {
		manageMap.deleteTask(taskID)
	}
}
