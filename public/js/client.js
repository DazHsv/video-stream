(function(){
	var webSocket = io.connect("http://127.0.0.1:3000/");
	window.addEventListener('load',function(){
		webSocket.on('setFrame',function(img){
			document.querySelector('#img').src = img;
		});
	});
})();