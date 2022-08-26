/**
 * @name manageDB
 * @description
 * The manageDB module is responsible for all data stored in
 * IndexedDB. The methods of this module allow you to work
 * with and manipulate this data.
 * <br>
 * <br>
 *
 * All of the public methods of the manageDB belong to the
 * manageDB__public namespace.
 * All of the inner methods of the manageDB belong to the
 * manageDB__inner namespace.
 * <br>
 * <br>
 *
 * The architecture of this application does not allow you to
 * work with IndexedDB directly. Instead, you need to pass a
 * callback that needs access to IndexedDB to the manageDB,
 * and it will open a connection and then execute the callback.
 * @module manageDB
 */

/**
 * @namespace manageDB__inner
 * @description
 * Inner methods of the manageDB namespace.
 */
/**
 * @namespace manageDB__public
 * @description
 * Public methods of the manageDB namespace.
 */


/** @typedef {number} TDBVersion */
/**
 * @callback TDBCallback
 * @param {IDBDatabase} db
 * @return {void}
 */

export const manageDBTypes = null
