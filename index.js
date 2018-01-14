const express = require('express');
const app = express();
const plotpoints = require('./mockData');

app.get('/api/data', function (req, res) {
	res.send(plotpoints)
});

app.use(express.static('static'));
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist/'));

app.listen(3000);