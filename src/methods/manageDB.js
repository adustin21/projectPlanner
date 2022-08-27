import { constants } from "../assets/constants";

/* Variables */

/** @type {IDBDatabase} */
let db;
/** @type {IDBObjectStore} */
let store;
/** @type {TDBVersion} */
let dbVersion = 1;
/** @type {TDBCallback[]} */
let callbacksToExecute = [];

/* Inner methods */

/**
 * Executes all callbacks in the callback array and clears it.
 * @param {IDBDatabase} db
 * @memberof module:manageDB~manageDB__inner
 */
const executeRecievedCallbacs = (db) => {
  callbacksToExecute.forEach(fn => {
    fn(db)
  })
  callbacksToExecute = []
}

/**
 * Opens IndexedDB connection and executes callbacks
 * @memberof module:manageDB~manageDB__inner
 */
const openDB = () => {
  /* Connection opened */
  const DBOpenRequest =
    indexedDB.open(constants.DB.DBNAME, dbVersion)

  /* Store Created */
  DBOpenRequest.onupgradeneeded = e => {
    db = DBOpenRequest.result
    store = db.createObjectStore(constants.DB.STORENAME, {
      keyPath: 'id',
      autoIncrement: true
    })
  }

  /** Recieved callbacs executed*/
  DBOpenRequest.onsuccess = e => {
    db = DBOpenRequest.result
    executeRecievedCallbacs(db)
  }
}

/* Public methods */

/**
* Passes the function to the manageDB module. The function will
* be executed after opening a connection to IndexedDB.
* @param {TDBCallback} fn The function to be executed.
* @memberof module:manageDB~manageDB__public
*/
export const addFunctionToExecute = (fn) => {
  callbacksToExecute = [...callbacksToExecute, fn]
  openDB()
}

/**@typedef {import("./doc/manageDB").TDBVersion} TDBVersion*/
/**@typedef {import("./doc/manageDB").TDBCallback} TDBCallback*/
