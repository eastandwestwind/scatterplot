const express = require('express');
const app = express();
const plotpoints = require('./mockData');
const returnPlotUrl = require('./buildPlotly');

app.get('/api/data', function (req, res) {
	res.send(plotpoints)
});

app.use(express.static('static'));

app.listen(3000);