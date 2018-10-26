var express = require('express')
var app = express();
var cors = require('cors');
var request = require('request')
var bodyParser = require("body-parser");
var port = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.render('index');
})

app.get('/server', function(req, res) {
	var url = 'http://api.walmartlabs.com/v1/search?apiKey=vwtzj6yrpv53yrp62squshbm&lsPublisherId={Your%20LinkShare%20Publisher%20Id}&query=' + req.query.name
	request(url, function (error,response, body) {
	if(error){
		return console.log("Error: ", error)
	}
	res.send(body)
	})
});

app.listen(port, function() {
	console.log('app running')
})
