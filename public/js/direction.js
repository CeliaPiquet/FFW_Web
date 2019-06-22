function initMap(wayPts,center) {

    let srcDst=wayPts[0];

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('mapContainer'), {
        zoom: 6,
        center: center
    });

    directionsDisplay.setMap(map);

    wayPts.splice(0,1);

    directionsService.route({
        origin: srcDst,
        destination: srcDst,
        waypoints: wayPts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
            var route = response.routes[0];
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}
