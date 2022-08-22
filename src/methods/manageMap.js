import { constants } from "../assets/constants";
import { deleteItem } from "./deleteItem";
import { manageDB } from "./manageDB"
import { markItem, recursiveMarker } from "./markItem";
import { redraw } from "./redraw";

/** @module manageMap */

/**
 * The `manageMap` module is the main interface used to manage the
 * application by changing the map, which is a virtual representation
 * of all tasks in the form of a special hierarchical tree.
 *
 * To use this module correctly, it is necessary to understand such
 * concepts as:
 *
 * * `map` - is an object which stores all tasks twice.
 * First, in the `all Task` object, where all tasks are stored. The key to the
 * task is its ID. Second, in arrays of subtasks. The key for such arrays is
 * the ID of the mother task.
 *
 * * `task` or `mother task` is an object containing data about a task
 *
 * * `subtask` is a `task` that is a child of `mother task` and containing
 * `mother task` ID in the fill `mother`. All tasks are subtasks but not
 * all tasks have subtasks.
 *
 * * `visibleMap` is a `map` consisting of a single task selected by the user
 * and its subtasks
 *
 * * `cursor` is a `task` selected by the user
 *
 * * `focus` is a `task` that the user focused and whose data he wants to
 * see
 * @example
 * task,  = {
 * 	id: Number // ID of task,
 * 	mother: ID // ID of mother (parent) task,
 * 	title: String // Title of task,
 * 	description: String // Description of task,
 * 	time: Date // Task end time,
 * 	subTasksCount: 1 // Subtask count
 * }
 * subtask,  = {
 * 	id: Number // ID of task,
 * 	mother: task.id // ID of mother (parent) task,
 * 	title: String // Title of task,
 * 	description: String // Description of task,
 * 	time: Date // Task end time,
 * 	subTasksCount: 0 // Subtask count
 * }
 *
 */
export const manageMap = (() => {
	/**
	 * Creates the task template object
	 * @param {ID} id //task ID
	 * @param {ID} mother mother ID
	 * @param {Sting} title title
	 * @param {String} description Description
	 * @param {String | Number} time Task end time
	 * @param {Number} subTasksCount Counter of subtasks
	 * @param {String} status Task completion status
	 * @returns the task template object
	 */
	const createTaskTemplate = (
		id = null,
		mother = null,
		title = "",
		description = "",
		time = constants.INFINITYSYM,
		subTasksCount = 0,
		status = constants.TASKSTATUS.ATWORK,
	) => {
		return{
			id,
			mother,
			title,
			description,
			time,
			subTasksCount,
			status,
		}
	}
	/**
	 * Returns an object containing the default map state.
	 * By default, the map includes two elements: `allTask` and `projectInfo`.
	 * * `allTask` is the object that will contain all tasks, using the task id as
	 * element name. By default, first element is `mother`
	 * * `projectInfo` is array containing only `mother`
	 * * `mother` is a pseudo-task that is the first node of the task tree
	 * @returns {{
	 * allTasks: {mother: {...}},
	 * projectInfo: [{mother}]
	 * }}
	 */
	const getDefaultMap = () => {
		const mother = createTaskTemplate(
			"mother",
			null,
			constants.PROJECTDATA.TITLE,
			constants.PROJECTDATA.DESCRIPTION,
			undefined,
			undefined,
		)
		return {
			allTasks: {
				mother
			},
			projectInfo: [mother]
		};
	}
	/**
	 * Returns a pseudo-map that including the selected task
	 * and its subtasks
	 * @param {{}} map
	 * @param {string} cursor - main task id (head node of tree)
	 * @param {string} focus - selected task id
	 * @returns {{
	 * 	task: {...};
	 * 	subTasks: [],
	 * 	focus: {...}
	 * }} task - main task, subTasks - array of subtasks, focus - selected task
	 */
	const getVisibleMap = (map, cursor, focus) => {
		return {
			task: map.allTasks[cursor],
			subTasks: map[cursor] ? map[cursor] : [],
			focus: map.allTasks[focus]
		}
	}
	let map = getDefaultMap();
	/**
	 * ID of mother of the task being editing if is not false
	 */
	let motherId = false;
	let redrawMode = constants.REDRAWMODE.DEFAULT;
	/**
		* Extracts all tasks from the databese's "tasks" store.
		* If the extraction is successful, the map is created and the `redraw` function is called.
		* The function isn't used outside of the `manageDB.addFunctionToExecute` method
		* @param {IDBDatabase} db - The databese to handle
	*/
	const updateMap = (db) => {
		map = getDefaultMap();
		const transaction = db.transaction(constants.DB.STORENAME, "readonly");
		const store = transaction.objectStore(constants.DB.STORENAME);
		const getRequest = store.getAll();
		getRequest.onsuccess = e => {
			/**
			 * Array of all tasks
			 * @type {Array}
			 */
			const result = e.target.result
			result.forEach(task => {
				map.allTasks[task.id] = {...createTaskTemplate(),...task} // adding all tasks to the array
			})
			result.forEach(task => {
				if(!map[task.mother]){
					map[task.mother] = [] // creating a list of subtasks for the task ID
				}
				map.allTasks[task.mother].subTasksCount += 1 // increasing the subtask counter
				map[task.mother].push(map.allTasks[task.id]) // adding task to the list of subtasks for the task ID
			});
			redraw(getVisibleMap(map, cursor, focus), redrawMode)
		}

	}
	let focus = constants.MOTHER;
	let cursor = constants.MOTHER;
	/**
	 * Changes the redrawing mode without starting the redrawing
	 * @param { String } newRedrawMode
	 */
	const changeRedrawMode = (newRedrawMode) => {
		redrawMode = newRedrawMode;
	}
	/**
	 * Moves `focus` and redraws app with a new description window
	 * @param { ID } toValue
	 */
	const moveFocus  = (toValue) => {
		focus = toValue;
		redraw(getVisibleMap(map, cursor, focus), redrawMode)
	}
	/**
	 * Moves `cursor` and redraws app with a new `task` and `subtasks`
	 * @param { ID } toValue
	 */
	const moveCursor = (toValue) => {
		cursor = toValue;
		redraw(getVisibleMap(map, cursor, focus), redrawMode)
	}
	/**
	 * Changes redrawing mode to value "edit" value without starting the
	 * redrawing. Next rendering DOM the task edit window will be drawn.
	 * @returns { function } returns a function that changes the redrawing
	 * mode to old value
	*/
	const createTask = () => {
		const oldRedrawMode = redrawMode
		redrawMode = constants.REDRAWMODE.CREATE
		return () => {
			redrawMode = oldRedrawMode
		}
	}
	/**
	 * Edits focused `task` in database and render app again.
	 * @param { ID } id
	 */
	const editTask = () => {
		redrawMode = constants.REDRAWMODE.EDIT
		redraw(getVisibleMap(map, cursor, focus), redrawMode)
	}
	/**
	 * Deletes `task` with this ID from database and render app again.
	 * @param { ID } id
	 */
	 const deleteTask = (id) => {
		deleteItem(id, map)
	}
	/**
	 * Changes status of the focused task in the database
	 * @param { String } status
	 */
	const markTask = (status) => {
		markItem(
			map.allTasks[focus],
			map,
			status
		)
	}
	/**
	 * Updates `map` based on database data and redraws DOM
	 */
	const renderApp = () => {
		manageDB.addFunctionToExecute(updateMap)
	}
	return {
		changeRedrawMode,
		moveFocus,
		moveCursor,
		createTask,
		deleteTask,
		editTask,
		markTask,
		createTaskTemplate,
		renderApp
	}
})()
