var express =  require('express');
var app = express();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP,
	port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

	if (typeof ipaddress === "undefined") {
		//  Log errors on OpenShift but continue w/ 127.0.0.1 - this
		//  allows us to run/test the app locally.
		console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
		ipaddress = "127.0.0.1";
	};

server = app.listen(port,ipaddress,function(){
	console.log('Server running');
});

var io = require('socket.io')(server);
app.use('/static',express.static('./public'));
app.set('view engine','pug');

app.get('/',function(req,res){
	res.render('index');
});

app.get('/streamer',function(req,res){
	res.render('streamer');
});

app.get('/client',function(req,res){
	res.render('client');
});

io.sockets.on('connection',function(socket){
	socket.on('newFrame',function(img){
		io.sockets.emit('setFrame',img);
	});
});
