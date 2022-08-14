let map;

// initialisation of the map when windows is ready
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: new google.maps.LatLng(47.081012, 2.398782),
        mapTypeId: "terrain",
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    });


}
export { initMap, map };