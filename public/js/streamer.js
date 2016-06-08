(function(){
	var flag = 0;
	var webSocket = io.connect("http://127.0.0.1:3000/");
	window.URL = (window.URL || window.webkitURL);
	navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
	var video = document.querySelector("#v");
	var canvas = document.querySelector("#c");
	var ctx = canvas.getContext('2d');

	navigator.getUserMedia({
		video:true
	},function(stream){
		flag = 1;
		video.src = window.URL.createObjectURL(stream);
	},function(err){
		console.log(err);
	});

	window.requestAnimFrame = (function(cb){
		return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(cb){ window.setTimeout(cb, 1000 / 100) });
	})();

	video.addEventListener('loadedmetadata',function(){
		canvas.width = this.videoWidth;
		canvas.height = this.videoHeight;
		drawFrame(ctx,video,canvas);
	});

	function drawFrame(ctx,video,canvas){
		ctx.drawImage(video,0,0);
		var dataURL = canvas.toDataURL('image/jpeg',0.2);
		if(flag != 0)
			webSocket.emit('newFrame',dataURL);
		requestAnimFrame(function(){
			drawFrame(ctx,video,canvas);
		});
	}
})();