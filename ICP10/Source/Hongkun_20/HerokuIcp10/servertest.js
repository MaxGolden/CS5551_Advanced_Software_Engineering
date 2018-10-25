var express = require('express')
var app = express();
var cors = require('cors');
var request = require('request')
var port = process.env.PORT || 8080;
app.use(cors());
app.get('/server', function(req, res) {
	request("http://api.walmartlabs.com/v1/search?apiKey=vwtzj6yrpv53yrp62squshbm&lsPublisherId={Your%20LinkShare%20Publisher%20Id}&query=airpods", function (error, response, body) {
	if(error){
		return console.log("Error: ", error)
	}
	res.send(body)
	})
});
app.listen(port, function() {
	console.log('app running')
})
