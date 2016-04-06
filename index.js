// credit:  https://github.com/tonypujals/express-demo/blob/master/lesson-03-B/app.js
// credit https://github.com/tonypujals/express-demo/tree/master/lesson-03-A
// credit https://github.com/tonypujals/express-demo/blob/master/lesson-03-C/app.js
// credit https://github.com/tonypujals/express-demo/blob/master/lesson-04/app.js
// credit https://github.com/tonypujals/express-demo/blob/master/lesson-06/app.js


var express = require('express'),
	spawn = require('child_process').spawn, 
	app = express(),
	port = process.env.PORT || 3003;


// Simple route handler example
app.get('/R',function(req,res,next) {
var data = '<h1>R is active !</h1>';
res.writeHead(200, {'Content-Type': 'text/html'});

var opts = { cwd: '/Users/kerimkalafala/R-lessons',
             env: process.env
           };
var RCall = ['--no-restore','--no-save','test1.R'];
var R = spawn('/usr/local/bin/Rscript', RCall, opts);
R.on('exit',function(code) {
	console.log('Received exit code: '+code);
});
console.log('R spawned');
res.end(data);
});

app.get('/',function(req,res,next) {
var data = '<h1>Homepage</h1>';
res.writeHead(200, {'Content-Type': 'text/html'});
res.end(data);
});

app.listen(port);

console.log('server started on port %s', port);
