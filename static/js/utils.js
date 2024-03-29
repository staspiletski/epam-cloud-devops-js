function deleteData(url = '', method = 'GET', id) {
	console.log(' send delete ', url, method, id);
	return fetch(url + id, {
		method: method,
		mode: 'cors', // no-cors, *cors, same-origin
		// cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		// credentials: 'same-origin', // include, *same-origin, omit
		// headers: {
		//	'Content-Type': 'application/json'
		// 'Content-Type': 'application/x-www-form-urlencoded',
		//},
		// redirect: 'follow', // manual, *follow, error
		// referrerPolicy: 'no-referrer', // no-referrer, *client
		// body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	// return response.json(); // parses JSON response into native JavaScript objects
}
