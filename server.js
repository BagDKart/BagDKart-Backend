const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config.js");
const mongo = require("mongodb").MongoClient;
const api = require("./app/routes/api.js")(app, express);
const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = config.port;

mongoose.Promise = global.Promise;

mongoose.connect(config.database)
		.then((data)=> {
			console.log("connected to mongoose");
		}).catch((err)=> {
			console.log("err in connecting to mongoose")
		});

mongo.connect(config.database)
	.then(()=> {
		console.log(`the database is ${config.database}`);
}).catch((err) => {
	console.log("there is a error");
});

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(morgan('dev'));

app.use("/api", api);

app.listen(port, function(err) {
	if(err) {
		console.log("error in listening");
	} else {
		console.log(`listening to port ${port}`);
	}
});
