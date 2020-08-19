
// var x=new XMLHttpRequest();
// 	x.open("GET", "http://danml.com/wave2.gif", true);
// 	x.responseType = 'blob';
// 	x.onload=function(e){download(x.response, "dlBinAjax.gif", "image/gif" ); }
// 	x.send();

function loadDoc() {

var file = fs.createWriteStream("file.wav");
var request = http.get("http://static1.grsites.com/archive/sounds/comic/comic002.wav", function(response) {
  response.pipe(file);
});

}

