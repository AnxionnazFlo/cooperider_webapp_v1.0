// let map;
let tracks = new Array();
import { initMap, map } from './initMap.js';

// initialisation of the map when windows is ready


// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 6,
//         center: new google.maps.LatLng(47.081012, 2.398782),
//         mapTypeId: "hybrid",
//     });

//     // Create a <script> tag and set the USGS URL as the source.
//     const script = document.createElement("script");

//     // This example uses a local copy of the GeoJSON stored at
//     // http://localhost:8080/stage/google_map_testing_page/assets/tracks_points/Connected_20220502_194438_.geojson
//     script.src =
//         "http://localhost:8080/stage/google_map_testing_page/assets/tracks_points/Connected_20220502_194438_.geojson";
//     document.getElementsByTagName("head")[0].appendChild(script);

// }

const eqfeed_callback2 = function(results) {
    // put the coordinates in an array of objects
    for (let i = 0; i < results.features[0].geometry.coordinates.length; i++) {
        let tracks_points = { lat: results.features[0].geometry.coordinates[i][1], lng: results.features[0].geometry.coordinates[i][0] };
        tracks.push(tracks_points);
    }
    // console.log(tracks);
    // draw the polyline beetween the points
    const path = new google.maps.Polyline({
        path: tracks,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });

    path.setMap(map);
};

window.initMap = initMap;
window.eqfeed_callback2 = eqfeed_callback2;