document.addEventListener('DOMContentLoaded', function () {
	const plotDiv = document.getElementById('plot');
	const colorMap = {'pass': 'green', 'error': 'orange', 'fail': 'red'};
	let dragLayer;
	const datePickerStart = document.getElementById('start-date');
	const datePickerEnd = document.getElementById('end-date');
	const layout = {
		height: 650,
		autoscale: true,
		hovermode:'closest',
		xaxis: {
			showgrid: false,
			ticks: 'outside',
			tickfont: {
				family: 'Arial, sans-serif',
				size: 20,
				color: '#BEBEBE'
			},
		},
		yaxis: {
			tickvals:['1','2','3','4'],
			ticktext: ['1 min', '2 min', '3 min', '4 min'],
			tickfont: {
				family: 'Arial, sans-serif',
				size: 20,
				color: '#BEBEBE'
			},
		}};


	function getData(startDate, endDate) {
		axios.get('/api/data/', {params:{startDate: startDate, endDate: endDate}})
			.then(function (response) {
				success(response)
			})
			.catch(function (error) {
				alert(error)
			});
	}

	function success(response) {
		Plotly.purge(plotDiv);
		// generates and renders plot
		Plotly.newPlot(plotDiv, [constructPlotlyData(response.data)], layout, {displayModeBar: false});

		if (!datePickerStart.value || !datePickerEnd.value) {
			if (response.data.length === 0) {
				return;
			}
			populateDatePickers(response.data);
		}

		datePickerStart.onchange = datePickerEnd.onchange = function() {
			getData(datePickerStart.value, datePickerEnd.value)
		};

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
	function constructPlotlyData(responseData) {
		let dataPointsObject = {x: [] , y: [], color: []};
		responseData.map(function(obj) {
			dataPointsObject['x'].push(parseTime(obj['start_time']));
			dataPointsObject['y'].push(obj['duration'] / (1.0*60));
			dataPointsObject['color'].push(colorMap[obj['status']]);
		});
		return {
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
	}
	function parseTime(time) {
		return time.replace(/([a-zA-Z])/g, " ").trim();
	}
	function populateDatePickers(responseData) {
		let dateArray = responseData.map(function(date) {
			return date['start_time'];
		});
		dateArray.sort(function(a,b){
			return new Date(b) - new Date(a);
		});
		datePickerStart.value = dateArray[dateArray.length-1].replace(/T.*$/,"");
		datePickerEnd.value = dateArray[0].replace(/T.*$/,"");
	}
	getData();
});
