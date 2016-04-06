// credit:  https://github.com/tonypujals/express-demo/blob/master/lesson-03-B/app.js
// credit https://github.com/tonypujals/express-demo/tree/master/lesson-03-A
// credit https://github.com/tonypujals/express-demo/blob/master/lesson-03-C/app.js
// credit https://github.com/tonypujals/express-demo/blob/master/lesson-04/app.js
// credit https://github.com/tonypujals/express-demo/blob/master/lesson-06/app.js
// credit https://contourline.wordpress.com/2013/10/08/700/



var express = require('express'),
	queue = require('async').queue,
	spawn = require('child_process').spawn, 
	app = express(),
	jobs = 4,
	port = process.env.PORT || 3003,
	opts = { cwd: '/Users/kerimkalafala/R-lessons',
        	 env: process.env
           	};

function setup_R_job(the_opts, done) {
	var RCall = ['--no-restore','--no-save','test1.R'];
	var R = spawn('/usr/local/bin/Rscript', RCall, the_opts);
	R.on('exit',function(code) {
		console.log('Received exit code: '+code);
	});
}

var my_queue=queue(setup_R_job,jobs);

// Simple route handler example
app.get('/R',function(req,res,next) {
	var data = '<h1>R is active !</h1>';
	res.writeHead(200, {'Content-Type': 'text/html'});

	my_queue.push(opts);
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
