document.addEventListener('DOMContentLoaded', function () {
	const plotDiv = document.getElementById('plot');
	let transformedData = {x: [] , y: [], color: []};
	const colorMap = {'pass': 'green', 'error': 'orange', 'fail': 'red'};
	const layout = {height: 650, autoscale: true};

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
				if (!response.data) {
					return
				}
				console.log(response.data);
				Plotly.newPlot(plotDiv, [getData(response.data)], layout, {displayModeBar: false});
			})
			.catch(function (error) {
				console.log(error)
			});
	}

	window.addEventListener('resize', function() { Plotly.Plots.resize(plotDiv); });

	plotDiv.on('plotly_click', function(data){
		// console.log('data' , data);
		point = data.points[0];
		console.log('point', point);
		x2.push(point.x);
		y2.push(point.y);
		Plotly.restyle('myDiv', {'x':[undefined, x2], 'y':[undefined, y2]});
		console.log('x2 ', x2)
	});

	function getData(response) {
		response.map(function(obj) {
			transformedData['x'].push(parseTime(obj['start_time']));
			transformedData['y'].push(obj['duration'] / (1.0*60));
			transformedData['color'].push(colorMap[obj['status']]);
		});
		console.log(buildDataModel(transformedData));
		return buildDataModel(transformedData);
	}
	function parseTime(time) {
		return time.replace(/([a-zA-Z])/g, " ").trim();
	}
	function buildDataModel(transformedData) {
		return {
			x: transformedData.x,
			y: transformedData.y,
			mode: "markers",
			name: "Scatterplot",
			text: ["test,test,test"],
			marker: {
				color: transformedData.color,
				size: 20,
				line: {
					color: "white",
					width: 0.5
				}
			},
			type: "scatter"
		};
	}
});
