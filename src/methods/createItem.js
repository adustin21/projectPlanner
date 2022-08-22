import { constants } from "../assets/constants";
import { manageDB, set } from "./manageDB";
import { manageMap } from "./manageMap";

/**
 * Get `itemTaskTemp` object and creates a new record (task) in the database
 * @param {{}} itemTaskTemp
 */
export const createItem = (
	itemTaskTemp
	) => {
	/**
		* Writes new task to database
		* The function isn't used outside of the `manageDB.addFunctionToExecute` method
		* @param {IDBDatabase} db - The databese to handle
	*/
	const createTask = (db) => {
		const transaction = db.transaction(constants.DB.STORENAME, "readwrite");
		const store = transaction.objectStore(constants.DB.STORENAME);
		store.add(itemTaskTemp);
		transaction.oncomplete = () => {
			manageMap.renderApp()
		}
	}
	manageDB.addFunctionToExecute(createTask);
}
