let path;
let tracksList = new Array(); // store the list of the tracks in order to be able to remove them
import { map } from './initMap.js';
import { makeMarkerTracks } from './makeMarkerTracks.js';

const makeTrack = (tracks, url) => {
    // draw the polyline beetween the points
    path = new google.maps.Polyline({
        path: tracks,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
    });
    tracksList.push(path);
    path.setMap(map);
    map.setZoom(5);
    makeMarkerTracks(tracks, url);
};

const hideTrack = () => {
    // set no map to the path to hide tracks on the list
    for (let i = 0; i < tracksList.length; i++) {
        tracksList[i].setMap(null);
    }
    tracksList = [];
}

export { makeTrack, hideTrack };