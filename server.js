const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./App/Routes/index.js');

app.use(bodyParser.json());
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");
	// Request methods you wish to allow
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);

	// Request headers you wish to allow
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);

	// Set to true if you need the website to include cookies in the requests sent
	res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});
let port = 9000;
routes(app);

app.listen(port,(err)=>{
    if(err) console.log(err);
    console.log(`site is live in port ${port}`);
})