require('dotenv').config();
require('axios');

const plotly = require('plotly')("CatherineSmith", process.env.PLOTLY);

const data = [{x:[0,1,2], y:[3,2,1], type: 'bar'}];
const layout = {fileopt : "overwrite", filename : "simple-node-example"};

function getData() {
	axios.get('/api/data')
		.then(function (response) {
			if (!response.data) {
				return;
			}
			iframePlot.src = `${response.data}.embed`;
			data.src = response.data;
			console.log(`${response.data}.embed`)
		})
		.catch(function (error) {
			data.innerHTML = error;
		});
}

module.exports = function returnPlotUrl(req, res) {
	plotly.plot(data, layout, function (err, msg) {
	if (err) return console.log(err);
	console.log(msg["url"]);
	console.log(JSON.stringify(msg["url"]));
	res.send(msg["url"]);
})};

