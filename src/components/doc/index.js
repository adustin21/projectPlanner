/**
 * Component is a pure function which takes a data and generates
 * an HTMLDivElement based on it.
 * <br>
 *
 * Component always return result of {@link createElement}.
 * <br>
 *
 * Components always using camelCase for naming.
 *
 * @example
 * import { createElement } from '../methods/createElement'
 * import './mainContainer.css'
 *
 * export const componentName = (payload) => {
 * 	// Element Created
 * 	const element = createElement("mainContainer", [
 * 		payload
 * 	]);
 *
 * 	// Element Modified
 * 	element.style.background = "black"
 *
 * 	// Handlers Added
 * 	element.addEventListener("click", e=>console.log(e))
 *
 * 	// Element Returned
 * 	return element
 * }

 * @namespace Components
 */
