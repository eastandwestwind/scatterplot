const axios = require('axios');
const express = require('express');
const app = express();
let mockData = require('./mockData');

let transformedData = {x: [] , y: [], color: []};
let colorMap = {'pass': 'green', 'error': 'orange', 'fail': 'red'};

module.exports = function getData() {
	// app.use('/api/data', function (req, res, next) {
	// 	console.log(res);
	// 	next()
	// });
	// axios.get('/api/data')
	// 	.then(function (response) {
	// 		console.log("res= " + response);
	// 		// if (!response.data) {
	// 		// 	return;
	// 		// }
	// 		// console.log(response.data);
	// 		// return response.data
	// 	})
	// 	.catch(function (error) {
	// 		console.log(error)
	// 	});
	mockData.map(function(obj) {
		transformedData['x'].push(parseTime(obj['start_time']));
		transformedData['y'].push(obj['duration'] / (1.0*60));
		transformedData['color'].push(colorMap[obj['status']]);
	});
	return buildDataModel(transformedData);
};
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


