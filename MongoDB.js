const express = require('express');
const app = express();
const port = 3000
const mongo = require('mongoodb');

mongo.connect('mongodb://127.0.0.1:27017/comments');
var mdb = mongo.connection;
mdb.on('error', console.error.bind(console, 'connection error'));
mdb.once('open', function() {
	console.log('Connected!');
});

app.get('/mongodb-comments', (request, response) => {
	mdb.collection('posts').find({}).toArray().then((data) => {
		response.send(data);
	}).catch((error) => {
		response.send(error);
	});
});

app.get('/mongodb-comments/:name', (request, response) => {
	var name = request.params.name;
	mdb.collection('comments').find({name: name}).toArray().then((data) => {
		response.send(data);
	}).catch((error) => {
		response.send(error);
	});
});

app.listen(port, () => console.log('App listening on port ${port}!'))