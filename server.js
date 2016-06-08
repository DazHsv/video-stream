var express =  require('express');
var app = express();
server = app.listen(3000,'127.0.0.1',function(){
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
