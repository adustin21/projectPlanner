/**
 * Component is a pure function which takes a data and generates
 * an HTMLDivElement based on it.
 * <br>
 *
 * Component always return result of {@link elementCreator}.
 * <br>
 *
 * Components always using camelCase.
 *
 * @example
 * import { elementCreator } from './elementCreator'
 * import './mainContainer.css'
 *
 * export const componentName = (payload) => {
 * 	return elementCreator("mainContainer", [
 * 		payload
 * 	]);
 * }

 * @namespace Components
 */
/** @typedef {(any)=>HTMLDivElement} Component  */
