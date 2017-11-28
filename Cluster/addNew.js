function addNewLocation(){
    data = document.getElementById('addressField').value

    data.split(' ').join('');
    console.log(data)
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=${data}&key=AIzaSyA8KL3xnSXku9WGrHgdwjPbIOqeV1m2zu0'


    fetch(url).then(function(response) {
        return response.json();
      }).then(function(data) {
        alert(data[0])
      }).catch(function() {
        console.log("Booo");
      });
}

