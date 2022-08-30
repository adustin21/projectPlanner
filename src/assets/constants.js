export const constants = {
	MOTHER: "mother",
	PROJECTDATA: {
		TITLE: "Project Planner",
		DESCRIPTION:
		`The Project Planer is a simple task planner with a tree structure.

		Click the "create task" button to create a new sub-task.`
	},
	BLOCK: "block",
	INFINITYSYM: "∞",
	DB:{
		DBNAME: "store",
		STORENAME: "tasks"
	},
	ACTIONBUTTONSMODES: {
		DEFAULT: "default",
		MOTHER: "mother",
		DONE: "taskIsDone"
	},
	/** @type {{[mode: string]: TRedrawMode}} */
	REDRAWMODE: {
		DEFAULT: "default",
		CREATE: "create",
		EDIT: "edit",
		WARNING: "warning",
		LOWERWARNING: "lowerWarning",
	},
	/** @type {{[status: string]: TTaskStatus} */
	TASKSTATUS: {
		ATWORK: "atWork",
		DONE: "done"
	}
}

/** @typedef {import("../methods/doc/manageMap").TTaskStatus} TTaskStatus*/
/** @typedef {import("../methods/redraw").TRedrawMode} TTaskStatus*/
