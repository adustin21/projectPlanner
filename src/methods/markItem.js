import { constants } from "../assets/constants"
import { addFunctionToExecute } from "./manageDB"
import { renderApp } from "./manageMap"
/**
 * Formats object for the database.
 * Deletes the subTasksCount field and change the status field
 * @param {TTask} task
 * @param {TTaskStatus} status
 * @returns {{
 * 	id: ID,mother: ID,title: string,
 * 	description: string,time: string
 * }}
 */
const formatTask = (task, status) => {
	const newTask = {...task, status}
	delete newTask.subTasksCount
	return newTask
}

/**
 * Marks task and sub-tasks in the database recursively
 * Need IDBObjectStore and open transaction
 * @param {IDBObjectStore} store
 * @param {TTask} task
 * @param {TMap} map
 * @param {TTaskStatus} status
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
 * Marks task and mother-tasks in the database recursively
 * Need IDBObjectStore and open transaction
 * @param {IDBObjectStore} store
 * @param {TTask} task
 * @param {TMap} map
 * @param {TTaskStatus} status
 */
const reversMarker = (store, task, map, status) => {
	if (task.mother != constants.MOTHER) {
		const motherTask = map.allTasks[task.mother];
		reversMarker(store, motherTask, map, status)
	}
	store.put(formatTask(task, status))
}
/**
 * Change status of task in the IndexedDB
 * Also change the status of sub-task or mother-tasks based
 * on the status value.
 * @function
 * @param {TTask} task
 * @param {TMap} map
 * @param {TStatus} status
 * @memberof Methods
 */
export const markItem = (task, map, status) => {
	/** Creates callback for manageDB module.
	 * @type {TDBCallback}
	 */
	const markTask = (db) => {
		const transaction =
			db.transaction(constants.DB.STORENAME, "readwrite")
		const store =
			transaction.objectStore(constants.DB.STORENAME)
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
			renderApp();
		}
	}
	addFunctionToExecute(markTask);
}

/**@typedef {import("./doc/manageMap").ID} ID*/
/**@typedef {import("./doc/manageMap").TTask} TTask*/
/**@typedef {import("./doc/manageMap").TMap} TMap*/
/**@typedef {import("./doc/manageMap").TTaskStatus} TTaskStatus*/
/**@typedef {import("./doc/manageDB").TDBCallback} TDBCallback*/
