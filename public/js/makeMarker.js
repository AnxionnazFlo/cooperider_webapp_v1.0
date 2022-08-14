let markerList = new Array();
let infosWindowsList = new Array();
let markerCluster;
import { map } from './initMap.js'

const makeMarker = (results) => {
    // loop on the results to make marker and store them in the markerList array
    for (let i = 0; i < results.length; i++) {
        const lat = results[i][3].lat;
        const lng = results[i][3].lng;
        const latLng = new google.maps.LatLng(lat, lng);

        function toggleBounce() {
            if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
            } else {
                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

        // construction of each markers
        const marker = new google.maps.Marker({
            position: latLng,
            map: null,
            icon: "https://cooperidermap.feelingjack.eu/assets/icons/pointGPS-ombre.png",
            animation: null,
        });
        markerList.push(marker);
        //construction of the content of the infowindow
        const contentString =
            "<p class='titlewindow'>" + results[i][0] + "</p><p class='linkswindow'><a target='_blank' class='linkswindow' href='" + results[i][2] + "'>" + results[i][1] + "</a></p><p class='infowindow'>Point Type : " + results[i][4][0] + "</p>";
        // construction of an infowindow for each marker and store them in infosWindowsList array
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        infosWindowsList.push(infowindow);
        // add an event listner on each marker
        marker.addListener("click", () => {
            // clear all open infowindow
            for (let i = 0; i < infosWindowsList.length; i++) {
                infosWindowsList[i].close();
            }
            for (let i = 0; i < markerList.length; i++) {
                markerList[i].setAnimation(null);
            }
            marker.setAnimation(google.maps.Animation.BOUNCE);
            map.setCenter(marker.getPosition());
            // open infowindow of this particular marker
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        });
    }
}



const setMapOnAll = (map) => {
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(map);
    }
}

const showMarkers = () => {
    setMapOnAll(map);
    markerCluster = new MarkerClusterer(map, markerList, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}

const hideMarkers = () => {
    setMapOnAll(null);
    // back to initial position of the camera
    // map.setZoom(6);
    // map.setCenter({ lat: 47.081012, lng: 2.398782 });
    markerCluster.clearMarkers();
}

export { makeMarker, showMarkers, hideMarkers };