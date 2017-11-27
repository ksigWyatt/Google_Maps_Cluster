// Initialize Firebase
var config = {
    apiKey: "AIzaSyCX1G5olE2m4PeaDtEf30bFALYOjIig4uo",
    authDomain: "roofing-site-1504805766638.firebaseapp.com",
    databaseURL: "https://roofing-site-1504805766638.firebaseio.com",
    projectId: "roofing-site-1504805766638",
    storageBucket: "roofing-site-1504805766638.appspot.com",
    messagingSenderId: "907972576340"
};
firebase.initializeApp(config);

const preObject = document.getElementById('location');
const dbRefObject = firebase.database().ref().child('location');


function initMap(cluster_data) {

}



dbRefObject.on('value', snap => {
    data = JSON.stringify(snap.val(), null, 3);
    initMap(data);
});
