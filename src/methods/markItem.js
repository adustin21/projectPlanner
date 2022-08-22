import { constants } from "../assets/constants";
import { editItem } from "./editItem";
import { manageDB } from "./manageDB";
import { manageMap } from "./manageMap";
/**
 * Formats object for the database.
 * Deletes `subTasksCount` field and change `status`
 * @param {{}} task
 * @param {String} status
 * @returns new task object
 */
const formatTask = (task, status) => {
	const newTask = {...task, status}
	delete newTask.subTasksCount
	return newTask
}
/**
 * Marks task and subtasks to the database recursively
 * Need IDBObjectStore and open transaction
 * @param {IDBObjectStore} store
 * @param {{}} task
 * @param {{}} map
 * @param {{}} status
 */
const recursiveMarker = (store, task, map, status) => {
	const subTasksArray = map[task.id];
	if (subTasksArray) {
		subTasksArray.forEach(subTask => {
			recursiveMarker(store, subTask, map, status)
		});
	}
	store.put(formatTask(task, status))
}
/**
 * Marks task and mothertasks to the database recursively
 * Need IDBObjectStore and open transaction
 * @param {IDBObjectStore} store
 * @param {{}} task
 * @param {{}} map
 * @param {{}} status
 */
const reversMarker = (store, task, map, status) => {
	if (task.mother != constants.MOTHER) {
		const motherTask = map.allTasks[task.mother];
		reversMarker(store, motherTask, map, status)
	}
	store.put(formatTask(task, status))
}
export const markItem = (task, map, status) => {
	/**
		* Mark a task and its subtasks in a databese
		* The function isn't used outside of the `manageDB.addFunctionToExecute` method
		* @param {IDBDatabase} db - The databese to handle
	*/
	const markTask = (db) => {
		const transaction = db.transaction(constants.DB.STORENAME, "readwrite");
		const store = transaction.objectStore(constants.DB.STORENAME);
		switch (status) {
			case constants.TASKSTATUS.DONE:
				recursiveMarker(store, task, map, status);
				break;
			case constants.TASKSTATUS.ATWORK:
				reversMarker(store, task, map, status);
				break;
			default:
				recursiveMarker(store, task, map, status);
				break;
		}
		transaction.oncomplete = () => {
			manageMap.renderApp();
		}
	}
	manageDB.addFunctionToExecute(markTask);
}
