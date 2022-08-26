import { constants } from "../assets/constants"
import { addFunctionToExecute } from "./manageDB"
import { moveCursor, moveFocus, renderApp } from "./manageMap"

/**
 * Deletes task and subtasks in the database recursively
 * Needs IDBObjectStore and open transaction
 * @param {IDBObjectStore} store
 * @param {ID} id
 * @param {TMap} map
 */
const taskDestroyer = (store, id, map) => {
	const task = map.allTasks[id]
	const branch = map[id]
	if (branch) {
		branch.forEach(subTask => {
			taskDestroyer(store, subTask.id, map)
		});
	}
	store.delete(task.id)
}

/**
 * Deletes task and its sub-tasks from the IndexedDB
 * @function
 * @param {ID} taskID
 * @param {TMap} map
 * @memberof Methods
 */
export const deleteItem = (taskID, map) => {
	/**
	 * Creates callback for the manageDB module
	 * @type {TDBCallback}
	*/
	const deleteTask = (db) => {
		const transaction =
			db.transaction(constants.DB.STORENAME, "readwrite")
		const store =
			transaction.objectStore(constants.DB.STORENAME)
		taskDestroyer(store, taskID, map)
		transaction.oncomplete = () => {
			const motherId = map.allTasks[taskID].mother;
			moveCursor(motherId);
			moveFocus(motherId);
			renderApp();
		}
	}
	addFunctionToExecute(deleteTask)
}

/**@typedef {import("./doc/manageMap").ID} ID*/
/**@typedef {import("./doc/manageMap").TMap} TMap*/
/**@typedef {import("./doc/manageDB").TDBCallback} TDBCallback*/
