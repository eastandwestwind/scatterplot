require('dotenv').config();
const getData = require('./dataHandler');
const plotly = require('plotly')("CatherineSmith", process.env.PLOTLY);

const layout = {fileopt : "overwrite", filename : "simple-node-example"};


module.exports = function returnPlotUrl(req, res) {
	plotly.plot(getData(), layout, function (err, msg) {
	if (err) return console.log(err);
	try {
		console.log(msg["url"]);
		res.send(msg["url"]);
	} catch (error) {
		console.log(error)
	}
})};

