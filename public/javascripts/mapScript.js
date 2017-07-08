function initMap() {
    var latitudeValue = $("#latitudeValue").val();
    var longitudeValue = $("#longitudeValue").val();

    if(longitudeValue && latitudeValue) {
        longitudeValue = Number(longitudeValue);
        latitudeValue = Number(latitudeValue);



        var myLatLng = {lat: latitudeValue, lng: longitudeValue};

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: myLatLng
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Your current Location!'
        });
    }
}

$("#seeNearby").on('click', function(e) {
    var latitudeValue = $("#latitudeValue").val();
    var longitudeValue = $("#longitudeValue").val();
    e.originalEvent.currentTarget.href = '/locations/nearby?longitude=${longitudeValue}&latitude=${latitudeValue}';
});
