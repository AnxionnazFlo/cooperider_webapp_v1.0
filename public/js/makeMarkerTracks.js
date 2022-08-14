let markerList = new Array();
let infosWindowsList = new Array();
import { map } from './initMap.js'

const makeMarkerTracks = (tracksList, url) => {

    let dateString = (url.slice(-16, -8));
    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let day = dateString.substring(6, 8);
    let date = new Date(year, month - 1, day);
    date = date.toLocaleDateString('fr-FR');
    //construction of the content of the infowindow
    const contentString =
        `<p class="titlewindow">Track of</p><p class="linkswindow">${date}</p>`;

    const latLngStart = new google.maps.LatLng(tracksList[0].lat, tracksList[0].lng);
    let end = tracksList.length;
    end--;
    const latLngEnd = new google.maps.LatLng(tracksList[end].lat, tracksList[end].lng);
    const markerStart = new google.maps.Marker({
        position: latLngStart,
        icon: "https://cooperidermap.feelingjack.eu/assets/icons/camps50x50.png",
        map: map,
    });
    markerList.push(markerStart);

    const infowindowStart = new google.maps.InfoWindow({
        content: contentString,
    });
    infosWindowsList.push(infowindowStart);
    markerStart.addListener("click", () => {
        // clear all open infowindowStart
        for (let i = 0; i < infosWindowsList.length; i++) {
            infosWindowsList[i].close();
        }
        map.setCenter(markerStart.getPosition());
        // open infowindowStart of this particular marker
        infowindowStart.open({
            anchor: markerStart,
            map,
            shouldFocus: false,
        });
    });
    const markerEnd = new google.maps.Marker({
        position: latLngEnd,
        icon: "https://cooperidermap.feelingjack.eu/assets/icons/moto50x50.png",
        map: map,
    });
    markerList.push(markerEnd);

    const infowindowEnd = new google.maps.InfoWindow({
        content: contentString,
    });
    infosWindowsList.push(infowindowEnd);
    markerEnd.addListener("click", () => {
        // clear all open infowindowEnd
        for (let i = 0; i < infosWindowsList.length; i++) {
            infosWindowsList[i].close();
        }
        map.setCenter(markerEnd.getPosition());
        // open infowindowEnd of this particular marker
        infowindowEnd.open({
            anchor: markerEnd,
            map,
            shouldFocus: false,
        });
    });


}

const hideMarkersTracks = () => {
    for (let i = 0; i < markerList.length; i++) {
        markerList[i].setMap(null);
    }
    markerList = [];
}

export { makeMarkerTracks, hideMarkersTracks };