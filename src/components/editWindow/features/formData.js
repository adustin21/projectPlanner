/**
 * Allow to store input and textarea elements
 * and get its value.
 */
export const formData = (() => {
	/**@type {HTMLInputElement} */
	let inputElement;
	/**@type {HTMLTextAreaElement} */
	let textareaElement;
	return{
		/**
		 * Link the input to the store
		 * @type {(element:HTMLInputElement)=>void}
		 */
		linkInput(element){inputElement = element},
		/**
		 * Link the textarea to the store
		 * @type {(element:HTMLTextAreaElement)=>void}
		 */
		linkTextarea(element){textareaElement = element},
		/**
		 * Returns the input value
		 * @type {(void)=>string}
		 */
		getInputData(){return inputElement.value},
		/**
		 * Returns the textarea value
		 * @type {(void)=>string}
		 */
		getTextareaData(){return textareaElement.value}
	}
})()
