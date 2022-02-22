import { constants } from "../constants";
/** @module manageDB */

/**
 * The module for working with a database
 */
export const manageDB = (() => {
  let db;
  let store;

  const openDB = () => {
    const DBOpenRequest = indexedDB.open(constants.DB.DBNAME, 1);
    DBOpenRequest.onupgradeneeded = e => {
      db = DBOpenRequest.result;
      store = db.createObjectStore(constants.DB.STORENAME, {
        keyPath: 'id',
        autoIncrement: true
      })
    }
    DBOpenRequest.onsuccess = e => {
      db = DBOpenRequest.result;
      executeRequestFunction(db);
    }
  }
  let requestFunction = [];
  const executeRequestFunction = (db) => {
    requestFunction.forEach(fn => {
      fn(db);
    });
    requestFunction = [];
  }
  /**
   * Opens the database and executes the function
   * @param {(IDBDatabase) => {}} fn The function to be executed
   */
  const addFunctionToExecute = (fn) => {
    requestFunction = [...requestFunction, fn]
    openDB();
  }
  return {
    addFunctionToExecute
  }
})()
