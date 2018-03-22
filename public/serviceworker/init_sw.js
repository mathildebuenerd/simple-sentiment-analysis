// -------------------------------------------
//
// Code by kenzoarima
// https://github.com/kenzoarima/simple-pwa
//
// -------------------------------------------

// ServiceWorker is a progressive technology. Ignore unsupported browsers
if ('serviceWorker' in navigator) {
  console.log('CLIENT: service worker registration in progress.');
  navigator.serviceWorker
  			.register('/serviceworker.js')
  			.then( () => {
			    console.log('CLIENT: service worker registration complete.');
			}, () => {
				console.log('CLIENT: service worker registration failure.');
			});
} else {
  console.log('CLIENT: service worker is not supported.');
}