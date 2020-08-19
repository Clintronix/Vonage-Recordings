
// var x=new XMLHttpRequest();
// 	x.open("GET", "http://danml.com/wave2.gif", true);
// 	x.responseType = 'blob';
// 	x.onload=function(e){download(x.response, "dlBinAjax.gif", "image/gif" ); }
// 	x.send();

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    // if (this.readyState == 4 && this.status == 200) {
    //   document.getElementById("demo").innerHTML = this.responseText;
    // }
    responseJSON = JSON.parse(this.responseText);
    downloadRecordings(responseJSON);
  };
  xhttp.open("GET", "https://api.vonage.com/t/vbc.prod/call_recording/v1/api/accounts/self/users/2301047/call_recordings?call_direction=OUTBOUND&order=start%3ADESC&page=1&page_size=10", true);
  xhttp.setRequestHeader("Accept", "application/json");
  xhttp.setRequestHeader("Authorization", "Bearer 002c0599-b6ad-3312-987e-100f6c22f523");
  xhttp.send();
//console.log("xhttp: " + responseJSON);
}



function downloadRecordings(JSON) {
  numRecordings = JSON["total_items"];
  for (i = 0; i < numRecordings; i++) {
    console.log(responseJSON["_embedded"]["recordings"][i]["id"]);
  

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api.vonage.com/t/vbc.prod/call_recording/v1/api/audio/recording/", true);
  xhr.responseType = 'blob';
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Authorization", "Bearer 002c0599-b6ad-3312-987e-100f6c22f523");
  xhr.onload=function(e){download(xhr.response, "dlBinAjax.mp3", "audio/mpeg" ); }
  xhr.send();
  }


}

