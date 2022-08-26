import { constants } from "../assets/constants"
import { addFunctionToExecute } from "./manageDB";
import { renderApp } from "./manageMap";

/**
 * Get an object with the TTask type and edit a record in the
 * IndexedDB by ID
 * @function
 * @param {TTask} task
 * @memberof Methods
 */
export const editItem = (task) => {
	/** Creates callback for manageDB module.
	 * @type {TDBCallback}
	 */
	const editTask = (db) => {
		const transaction =
			db.transaction(constants.DB.STORENAME, "readwrite")
		const store =
			transaction.objectStore(constants.DB.STORENAME);
		store.put(itemTaskTemp)
		transaction.oncomplete = () => {
			renderApp()
		}
	}
	addFunctionToExecute(editTask);
}

/**@typedef {import("./doc/manageMap").TTask} TTask*/
/**@typedef {import("./doc/manageDB").TDBCallback} TDBCallback*/
