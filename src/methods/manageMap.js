import { constants } from "../assets/constants";
import { deleteItem } from "./deleteItem";
import { manageDB } from "./manageDB"
import { markItem, recursiveMarker } from "./markItem";
import { redraw } from "./redraw";

/**
 * @namespace manageMap
 * @description
 * Namespace of the manageMap module.
 */
/**
 * @namespace manageMap.inner
 * @description
 * Inner methods of the manageMap namespace.
 * */
/**
 * @namespace manageMap.public
 * @description
 * Public methods of the manageMap namespace.
 * */


/* Variables */

/** @type {TVisibleMap} */
let map = {}
/** @type {import("./redraw").TRedrawMode} */
let redrawMode = constants.REDRAWMODE.DEFAULT;
/** @type {ID} */
let focus = constants.MOTHER;
/** @type {ID} */
let cursor = constants.MOTHER;

/* Inner Methods */

/**
 * Creates the task template object.
 * @param {ID} id Task ID
 * @param {ID} mother Mother ID
 * @param {string} title Title
 * @param {string} description Description
 * @param {string} time Task end time
 * @param {number} subTasksCount Counter of subtasks
 * @param {string} status Task completion status
 * @returns {TTask} Task template object
 * @memberof manageMap.inner
 */
const createTaskTemplate = (
	id = null, mother = null, title = "",
	description = "", time = constants.INFINITYSYM,
	subTasksCount = 0, status = constants.TASKSTATUS.ATWORK,
) => ({id,mother,title,description,time,subTasksCount,status})

/**
 * Returns the initial map state object.
 * @returns {TMap}
 * @memberof manageMap.inner
 */
const getDefaultMap = () => {
	const mother = createTaskTemplate(
		"mother", "projectInfo",
		constants.PROJECTDATA.TITLE,
		constants.PROJECTDATA.DESCRIPTION
	)
	return {
		allTasks: {mother},
		projectInfo: [mother]
	}
}

/**
 * Returns the visible map.
 * @param {TMap} map
 * @param {ID} cursor Main task id (head node of the tree)
 * @param {ID} focus Selected task id
 * @returns {TVisibleMap}
 * @memberof manageMap.inner
 */
const getVisibleMap = (map, cursor, focus) => {
	return {
		task: map.allTasks[cursor],
		subTasks: map[cursor] ? map[cursor] : [],
		focus: map.allTasks[focus]
	}
}

/**
* Extracts all tasks from the databese's "tasks" store.
* If the extraction is successful, the map is created and the
* redraw function is called.
* The function isn't used outside of the
* manageDB.addFunctionToExecute method
* @param {IDBDatabase} db - The databese to handle
 * @memberof manageMap.inner
*/
const updateMap = (db) => {
	/* Variables Defined */

	const transaction =
		db.transaction(constants.DB.STORENAME, "readonly")
	const store =
		transaction.objectStore(constants.DB.STORENAME)
	const getRequest = store.getAll()

	/* Map Updated */
	map = getDefaultMap()

	getRequest.onsuccess = e => {
		/* Full list of tasks from the IndexDB got */
		/** @type {TBranch} */
		const result = e.target.result

		/* Map allTasks object filled */
		result.forEach(task => {
			map.allTasks[task.id] =
				{...createTaskTemplate(),...task}
		})

		/* Subtask branches created */
		result.forEach(task => {
			if(!map[task.mother]){
				map[task.mother] = []
				// creating a branch if doesn't exsist
			}
			map.allTasks[task.mother].subTasksCount += 1
			// increasing the subtask counter
			map[task.mother].push(map.allTasks[task.id])
			// adding task to the branch
		});

		/* UI re-rendered */
		redraw(getVisibleMap(map, cursor, focus), redrawMode)
	}

}

/* Public methods */
/**
 * Changes the redrawing mode without starting the redrawing
 * @param { import("./redraw").TRedrawMode } newRedrawMode
 * @memberof manageMap.public
 */
export const changeRedrawMode = (newRedrawMode) => {
	redrawMode = newRedrawMode;
}

/**
 * Moves `focus` and redraws app with a new description window
 * @param { ID } toValue
 * @memberof manageMap.public
 */
export const moveFocus  = (newFocus) => {
	focus = newFocus
	redraw(getVisibleMap(map, cursor, focus), redrawMode)
}

/**
 * Moves `cursor` and redraws app with new visible map
 * @param { ID }
 * @memberof manageMap.public
 */
export const moveCursor = (newCursor) => {
	cursor = newCursor
	redraw(getVisibleMap(map, cursor, focus), redrawMode)
}

/**
 * Changes redraw mode to value "edit" value without
 * starting the redrawing. Next rendering DOM the task edit
 * window will be drawn.
 * @returns { function } returns a function that changes the
 * redrawing mode to the previous value
 * @memberof manageMap.public
*/
export const createTask = () => {
	const oldRedrawMode = redrawMode
	redrawMode = constants.REDRAWMODE.CREATE
	return () => {
		redrawMode = oldRedrawMode
	}
}

/**
 * Edits focused `task` in database and render UI again.
 * @param { ID } id
 * @memberof manageMap.public
 */
export const editTask = () => {
	redrawMode = constants.REDRAWMODE.EDIT
	redraw(getVisibleMap(map, cursor, focus), redrawMode)
}

/**
 * Deletes task by ID from database and render UI again.
 * @param { ID } id
 * @memberof manageMap.public
 */
export const deleteTask = (id) => {
	deleteItem(id, map)
}

/**
 * Changes status of the focused task in the database
 * @param { TTaskStatus } status
 * @memberof manageMap.public
 */
export const markTask = (status) => {
	markItem(
		map.allTasks[focus],
		map,
		status
	)
}

/**
 * Updates the map based on database data and redraws DOM
 * @memberof manageMap.public
 */
export const renderApp = () => {
	manageDB.addFunctionToExecute(updateMap)
}
