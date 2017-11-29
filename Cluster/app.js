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
var locations = []
var newLocationLatTemp = 0
var newLocationLngTemp = 0

dbRefObject.on('value', function(snapshot) {

    let returnArr = [];
    
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val(); 
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    locations = returnArr
    initMap()
});

function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 27.3334823, lng: -81.5235359}
    });
    
    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location
        });
    });

      // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

    // For adding new addresses
    var geocoder = new google.maps.Geocoder();
        
    document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
}


function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {

      if (status === 'OK') {
        var latitude = results[0].geometry.location.lat()
        var longitude = results[0].geometry.location.lng()

        // This function runs twice for some reason
        if (latitude === newLocationLatTemp && longitude === newLocationLngTemp) {
            return;
        }

        dbRefObject.orderByChild("lng").equalTo(longitude).once("value", snapshot => {
            const userData = snapshot.val();
            // Dont duplicate places that exist - that's just wasteful 
            if (userData){
              alert("Oops! This location is already in the database. Please try another location.");
              return;
            }
            else {
                var newDBRefObject = dbRefObject.push();
                newDBRefObject.set({
                    lat: latitude, 
                    lng: longitude
                })
            }
        });
        
        newLocationLatTemp = latitude
        newLocationLngTemp = longitude
      } 
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }

    });
}