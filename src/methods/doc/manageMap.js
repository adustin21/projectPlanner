 /**
  * @name manageMap
  * @description
  * The methods of the manageMap module are the main interface
  * used to manage the application by changing the map, which is
  * a virtual representation of all tasks in the form of a
  * special hierarchical tree.
 * <br>
 * <br>
 *
 * All of the public methods of the manageMap belong to the
 * manageMap__public namespace.
 * All of the inner methods of the manageMap belong to the
 * manageMap__inner namespace.
 * <br>
 * <br>
 *
 * To use this module correctly, it is necessary to understand such
 * concepts as:
 * <br>
 *
 * - MAP - is an object which stores and normalise all tasks.
 * The first and most important property of the Map object has the
 * key "allTasks".
 * It is an object that stores all tasks retrieved from IndexedDB.
 * The key for each property of "allTasks" object is its task ID.
 * All other properties are arrays of sub-tasks. All objects in
 * such arrays are child tasks of the same parent task. The key
 * for such arrays is the ID of the parent task. Such arrays are
 * called branches.
 * There are two special types of branches. The first has the
 * ID "mother". This is the root task, and it cannot be
 * modified by the UI. All other tasks will be its child tasks and
 * the child tasks of its child tasks.  The second one has the
 * identifier "projectInfo" and contains only one child, the
 * "mother". It is related to the rendering of DOM elements.
 * The "projectInfo" branch is generated automatically after
 * reading the IndexedDB and is necessarily present in the map.
 * The "mother" branch is generated after creation of the first
 * task.
 * <br>
 * <br>
 *
 * - TASK or mother (parent) task is an object containing data
 * about a task.
 * <br>
 * <br>
 *
 * - SUBTASK is a task that is a child of mother task and
 * containing mother task ID in the fill mother. All tasks are
 * subtasks but not all tasks have subtasks.
 * <br>
 * <br>
 *
 * - CURSOR is a task selected by the user.
 * <br>
 * <br>
 *
 * - FOCUS [Deprecated] is a task that the user focused and whose
 * data he wants to see.
 * <br>
 * <br>
 *
 * - VISIBLE MAP is a map normalized in a special way, consisting
 * of a task (Cursor), its subtasks, and a focused task (Focus).
 *
 * @module manageMap
 */


/**
 * @namespace manageMap__inner
 * @description
 * Inner methods of the manageMap module.
 */
/**
 * @namespace manageMap__public
 * @description
 * Public methods of the manageMap module.
 */

/** @typedef {"atWork" | "done"} TTaskStatus */
/** @typedef {"mother" | "projectInfo" } TServiceID */
/** @typedef {number | TServiceID} ID */
/** @typedef {{id: ID, mother: ID, title: string, description: string, time: string, subTasksCount: number, status: TTaskStatus}} TTask */
/** @typedef {TTask[]} TBranch */
/** @typedef {{allTasks: {[id: string]: TTask}, projectInfo: [TTask], [id: string]: TBranch}} TMap*/
/** @typedef {{task: TTask, subTasks: TBranch, focus: TTask}} TVisibleMap */

export const manageMapTypes = null;
