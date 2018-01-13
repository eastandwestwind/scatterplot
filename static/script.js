document.addEventListener('DOMContentLoaded', function () {
	const plotDiv = document.getElementById('plot');
	let dragLayer;
	let transformedData = {x: [] , y: [], color: []};
	const colorMap = {'pass': 'green', 'error': 'orange', 'fail': 'red'};
	const layout = {
		height: 650,
		autoscale: true,
		hovermode:'closest',
		xaxis: {
			showgrid: false,
			ticks: 'outside',
			tickfont: {
				size: 20,
				color: '#BEBEBE'
			},
		},
		yaxis: {
			tickfont: {
				size: 20,
				color: '#BEBEBE'
			},
		}};

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
				const pointNodeList = document.querySelectorAll('g.points path.point');
				plotDiv.on('plotly_click', function(data){
					if (!data.points || !data.points[0]) {
						return
					}
					let selectedPoint = data.points[0].pointIndex;
					pointNodeList[selectedPoint].classList.toggle('selected');
				});
				dragLayer = document.getElementsByClassName('nsewdrag')[0];

				plotDiv.on('plotly_hover', function(data){
					dragLayer.style.cursor = 'pointer'
				});

				plotDiv.on('plotly_unhover', function(data){
					dragLayer.style.cursor = ''
				});
			})
			.catch(function (error) {
				console.log(error)
			});
	}

	window.addEventListener('resize', function() { Plotly.Plots.resize(plotDiv); });

	//

	// plotDiv.addEventListener('click',function (e) {
	// 	console.log(e.target);
	// 	console.log(e.currentTarget);
	// 	this.classList.toggle('selected');
	// });

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
			marker: {
				color: transformedData.color,
				size: 35,
				line: {
					color: "white",
					width: 0.5
				}
			},
			type: "scatter"
		};
	}
});
