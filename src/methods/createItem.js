import { constants } from "../assets/constants";
import { addFunctionToExecute } from "./manageDB";
import { renderApp } from "./manageMap";

/**
 * Get an object with the TTask type and creates a new record
 * in the IndexedDB.
 * @function
 * @param {TTask} task
 * @memberof Methods
 */
export const createItem = (task) => {
	console.log("hello")
	/** Creates callback for manageDB module.
	 * @type {TDBCallback}
	 */
	const createTaskCallback = (db) => {
		const transaction =
			db.transaction(constants.DB.STORENAME, "readwrite")
		const store =
			transaction.objectStore(constants.DB.STORENAME)
		store.add(task);
		transaction.oncomplete = () => {
			renderApp()
		}
	}

	addFunctionToExecute(createTaskCallback);
}

/**@typedef {import("./doc/manageMap").TTask} TTask*/
/**@typedef {import("./doc/manageDB").TDBCallback} TDBCallback*/
