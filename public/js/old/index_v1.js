let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: new google.maps.LatLng(47.081012, 2.398782),
        mapTypeId: "hybrid",
    });

    // Create a <script> tag and set the USGS URL as the source.
    const script = document.createElement("script");

    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src =
        "http://localhost:8080/stage/google_map_testing_page/assets/maps_points/Espagne_2018.geojsonp";
    document.getElementsByTagName("head")[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.

const eqfeed_callback = function(results) {
    let markerList = [];
    let infosWindowsList = [];
    let button = document.getElementById('point');
    button.onclick = function() {
        for (let i = 0; i < results.features.length; i++) {
            const coords = results.features[i].geometry.coordinates;
            const latLng = new google.maps.LatLng(coords[1], coords[0]);


            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
            });
            markerList.push(marker);

            const infowindow = new google.maps.InfoWindow({
                content: results.features[i].properties.name,
            });
            infosWindowsList.push(infowindow);

            marker.addListener("click", () => {
                for (let i = 0; i < infosWindowsList.length; i++) {
                    infosWindowsList[i].close();
                }
                map.setZoom(8);
                map.setCenter(marker.getPosition());
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false,
                });

            });
        }

    }

};

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;