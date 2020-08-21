
// var json = function getUsers() {
//     fetch('https://api.vonage.com/t/vbc.prod/provisioning/v1/api/accounts/325074/users',  {headers: {
//         'Accept': 'application/json', 'Authorization': 'Bearer 6fc12625-ead2-38e7-9d21-d077a38e9861'
//       }})
//     .then(resp => resp.blob())
//     .then(blob => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.style.display = 'none';
//       a.href = url;
//       // the filename you want
//       a.download = 'test.mp3';
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       alert('your file has downloaded!'); 
//       // or you know, something with better UX...
//     })
//     .catch(() => alert('oh no!'));
// }
//**********************************************************
//get bearer coade
bearer = '';
function populateBearer() {
    bearer = (document.getElementById("bearer").value).toString();
    accountID = (document.getElementById("accountID").value).toString();
}







//get users
var json = async function() {
    fetch('https://api.vonage.com/t/vbc.prod/provisioning/v1/api/accounts/' + accountID + '/users', 
    {headers: {'Accept': 'application/json', 'Authorization': 'Bearer ' + bearer }})
  .then(response => response.json())
  .then(data => handleData(data));
  }

 //make array of users IDs
function handleData(data) {
    let RecordingIDs = [];
    var totalDownloads = data["total_items"];
    for (let x = 0; x < totalDownloads; x++) {
        if (data["_embedded"]["users"][x]["status"] === "ACTIVE")
        RecordingIDs.push(data["_embedded"]["users"][x]["id"].toString())
    }
    //console.log(RecordingIDs);
    handleRedordings(RecordingIDs);
}

//Loop Users 
function handleRedordings(Users) {
    for (let x = 0; x < Users.length; x++) {
            //console.log(x + '--' + Users[x]
            fetch('https://api.vonage.com/t/vbc.prod/call_recording/v1/api/accounts/self/users/' + Users[x] + '/call_recordings?call_direction=INBOUND&order=start%3ADESC&page=1&page_size=40', 
            {   
                headers: {'Accept': 'application/json', 'Authorization': 'Bearer ' + bearer }
            })
          .then(response => response.json())
          .then(userData => 
            downloadRecording(userData)
            );
           
    }
    
}

function downloadRecording(recordingIDs) {
    for (let x = 0; x < recordingIDs["total_items"]; x++) {
        let recordingID = recordingIDs["_embedded"]["recordings"][x]["id"].toString();
        let cnam = recordingIDs["_embedded"]["recordings"][x]["cnam"]
        let caller_id = recordingIDs["_embedded"]["recordings"][x]["caller_id"]
        let dnis = recordingIDs["_embedded"]["recordings"][x]["dnis"]
        
        fetch('https://api.vonage.com/t/vbc.prod/call_recording/v1/api/audio/recording/' + recordingID,  {headers: {
            'Accept': 'audio/mpeg', 'Authorization': 'Bearer ' + bearer
        }})
        .then(resp => resp.blob())
        .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = cnam + '-' + caller_id + '-' + dnis + '-' + recordingID + '.mp3';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('your file has downloaded!'); // or you know, something with better UX...
        })
        .catch(() => alert('Something went wrong'));

    }
}




 


//get users download IDs
//loop through users download IDs
//get downloads