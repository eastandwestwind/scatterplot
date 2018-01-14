const express = require('express');
const app = express();
const plotpoints = require('./mockData');

app.get('/api/data/', function (req, res) {
	res.send(getMockData(req.query.startDate, req.query.endDate))
});

function getMockData(startDate, endDate) {
	if (!startDate || !endDate) {
		return plotpoints
	}
	return plotpoints.filter(function (datapoint) {
		return datapoint.start_time >= startDate && datapoint.start_time < endDate
	});
}

app.use(express.static('static'));
// creates alias for use client-side
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist/'));

app.listen(process.env.PORT || 3000);