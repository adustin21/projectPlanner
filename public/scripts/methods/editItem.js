import { constants } from "../constants"
import { manageDB } from "./manageDB";
import { manageMap } from "./manageMap";

/**
 * Accepts `itemTaskTemp` object and edit the record (task) with relevant id
 * @param {{}} itemTaskTemp
 */
export const editItem = (itemTaskTemp) => {
	/**
		* Edits a task in the database
		*
		* The function isn't used outside of the `manageDB.addFunctionToExecute` method
		* @param {IDBDatabase} db - The databese to handle
	*/
	const editTask = (db) => {
		const transaction = db.transaction(constants.DB.STORENAME, "readwrite");
		const store = transaction.objectStore(constants.DB.STORENAME);
		store.put(itemTaskTemp)
		transaction.oncomplete = () => {
			manageMap.renderApp()
		}
	}
	manageDB.addFunctionToExecute(editTask);
}
