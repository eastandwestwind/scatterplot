document.addEventListener('DOMContentLoaded', function () {
	const plotDiv = document.getElementById('plot');
	const colorMap = {'pass': 'green', 'error': 'orange', 'fail': 'red'};
	let dragLayer;
	let dataPointsObject = {x: [] , y: [], color: []};
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
	let plotDataModel = {
		x: dataPointsObject.x,
		y: dataPointsObject.y,
		mode: "markers",
		name: "Scatterplot",
		marker: {
			color: dataPointsObject.color,
				size: 35,
				line: {
				color: "white",
					width: 0.5
			}
		},
		type: "scatter"
	};

	axios.get('/api/data')
		.then(function (response) {
			success(response)
		})
		.catch(function (error) {
			console.log(error)
		});

	function success(response) {
		// generates plot
		Plotly.newPlot(plotDiv, [getData(response.data)], layout, {displayModeBar: false});

		// toggles class on click
		const pointNodeList = document.querySelectorAll('g.points path.point');
		plotDiv.on('plotly_click', function(data){
			if (!data.points || !data.points[0]) {
				return
			}
			let selectedPoint = data.points[0].pointIndex;
			pointNodeList[selectedPoint].classList.toggle('selected');
		});

		// changes cursor style on hover
		dragLayer = document.getElementsByClassName('nsewdrag')[0];
		plotDiv.on('plotly_hover', function(){
			dragLayer.style.cursor = 'pointer'
		});
		plotDiv.on('plotly_unhover', function(){
			dragLayer.style.cursor = ''
		});

		// resizes plot
		window.addEventListener('resize', function() { Plotly.Plots.resize(plotDiv); });
	}
	function getData(response) {
		response.map(function(obj) {
			dataPointsObject['x'].push(parseTime(obj['start_time']));
			dataPointsObject['y'].push(obj['duration'] / (1.0*60));
			dataPointsObject['color'].push(colorMap[obj['status']]);
		});
		return populatePlotDataModel(dataPointsObject);
	}
	function parseTime(time) {
		return time.replace(/([a-zA-Z])/g, " ").trim();
	}
	function populatePlotDataModel(transformedData) {
		plotDataModel.x = transformedData.x;
		plotDataModel.y = transformedData.y;
		return plotDataModel;
	}
});
