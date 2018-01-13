// import * as vis from 'vis';
document.addEventListener('DOMContentLoaded', function () {
	const dataDiv = document.getElementById('data');

	const script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'https://unpkg.com/axios/dist/axios.min.js';
	if (script.addEventListener) {
		script.addEventListener('load', httpRequest, false);
	} else if (script.readyState) {
		script.onreadystatechange = httpRequest;
	}
	document.getElementsByTagName('head')[0].appendChild(script);


	function httpRequest() {
		axios.get('/api/data')
			.then(function (response) {
				dataDiv.innerHTML = JSON.stringify(response.data);
				console.log(response)
			})
			.catch(function (error) {
				dataDiv.innerHTML = error;
			});
	}
});
