import { manageMap } from "./scripts/methods/manageMap";

window.onload = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./sw.js', {
		}).then(registration => {
			console.log('SW registered: ', registration);
		}).catch(registrationError => {
			console.log('SW registration failed: ', registrationError);
		});
	}
	manageMap.renderApp();
}
