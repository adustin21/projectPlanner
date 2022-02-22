import { constants } from "../constants"
import { manageDB } from "./manageDB"
import { manageMap } from "./manageMap";

/**
 * Deletes task and subtasks in the database recursively
 * Need IDBObjectStore and open transaction
 * @param {IDBObjectStore} store
 * @param {ID} id
 * @param {{}} map
 */
const taskDestroyer = (store, id, map) => {
	const task = map.allTasks[id];
	const subTasksArray = map[id];
	if (subTasksArray) {
		subTasksArray.forEach(subTask => {
			taskDestroyer(store, subTask.id, map)
		});
	}
	const deleteRequest = store.delete(task.id)
}

export const deleteItem = (taskID, map) => {
	/**
		* Delete a task and its subtasks from the database by ID
		* The function isn't used outside of the `manageDB.addFunctionToExecute` method
		* @param {IDBDatabase} db - The databese to handle
	*/
	const deleteTask = (db) => {
		const transaction = db.transaction(constants.DB.STORENAME, "readwrite");
		const store = transaction.objectStore(constants.DB.STORENAME);
		taskDestroyer(store, taskID, map)
		transaction.oncomplete = () => {
			const motherId = map.allTasks[taskID].mother;
			manageMap.moveCursor(motherId);
			manageMap.moveFocus(motherId);
			manageMap.renderApp();
		}
	}
	manageDB.addFunctionToExecute(deleteTask)
}
