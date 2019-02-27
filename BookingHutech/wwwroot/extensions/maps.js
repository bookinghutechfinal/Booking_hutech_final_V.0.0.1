var source, destination;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var options = { componentRestrictions: { country: 'VN' } };
google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.Autocomplete(document.getElementById('txtSource'), options);
    new google.maps.places.Autocomplete(document.getElementById('txtDestination'), options);
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
});



function GetRoute() {
    var mumbai = new google.maps.LatLng(10.802321, 106.714614);
    var mapOptions = {
        zoom: 14,
        center: mumbai
    };
    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    directionsDisplay.setMap(map);
    // directionsDisplay.setPanel(document.getElementById('dvPanel'));

    //*********DIRECTIONS AND ROUTE**********************//
    source = document.getElementById("txtSource").value;
    destination = document.getElementById("txtDestination").value;



    var request = {
        origin: source,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });

    //*********DISTANCE AND DURATION**********************//
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            var distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            document.getElementById("lblDistance").innerHTML = distance;
            // document.getElementById("hfDistance").value = distance;
            document.getElementById("thoigian").innerHTML = duration;
        } else {
            alert("Unable to find the distance via road.");
        }
    });
}