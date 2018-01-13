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
	console.log(mockData);
	mockData.map(function(obj) {
		transformedData['x'].push(Date.parse(obj['start_time']));
		transformedData['y'].push(obj['duration']);
		transformedData['color'].push(colorMap[obj['status']]);
	});
	return buildDataModel(transformedData);
};

function buildDataModel(transformedData) {
	return {
		x: transformedData.x,
		y: transformedData.y,
		mode: "markers",
		name: "Scatterplot",
		text: ["test,test,test"],
		marker: {
		color: transformedData.color,
			size: 12,
			line: {
			color: "white",
				width: 0.5
		}
	},
		type: "scatter"
	};
}


