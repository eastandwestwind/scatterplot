document.addEventListener('DOMContentLoaded', function () {
	const iframePlot = document.getElementById('plot');
	const data = document.getElementById('plot');

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
		axios.get('/plot')
			.then(function (response) {
				if (!response.data) {
					return;
				}
				// FIXME: embed not appending
				iframePlot.src = `${response.data}.embed`;
				data.src = response.data;
				console.log(`${response.data}.embed`)
			})
			.catch(function (error) {
				data.innerHTML = error;
			});
	}
});
