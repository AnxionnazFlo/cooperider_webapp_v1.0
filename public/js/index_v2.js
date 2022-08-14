import { initMap } from './initMap.js';
import { getTracksListKmAlgo } from './kmCounterAlgo.js';
import { getTracksList } from './getTracksList.js';
import { hideTrack } from './makeTrack.js';
import { hideMarkersTracks } from './makeMarkerTracks.js';
import { getPointsFromJSON } from './getPointsFromJSON.js';
import { hideMarkers, showMarkers } from './makeMarker.js';
import { selectDate } from './selectDate.js';
let filesSelected = new Array(); // array of selected files between the selected dates
let startDateFinal, endDateFinal;
let startDate = document.querySelector('#startDate');
let endDate = document.querySelector('#endDate');
const reg = /-/gi; // select all the -

// push the last track in order to display it by default 
let length = files.length - 1;
filesSelected.push(files[length]);
getTracksList(filesSelected);
// trigger the function for km counting after 2sec delay
setTimeout(function() { getTracksListKmAlgo(files); }, 2000);
// initialize the points of interests
getPointsFromJSON();

const button = document.getElementById('point');
button.onclick = () => {

    if (button.innerHTML == "Show me the points") {
        button.innerHTML = "Hide the points";
        showMarkers();
    } else {
        button.innerHTML = "Show me the points";
        hideMarkers();
    }

};

// const buttonHide = document.querySelector('#noPoint');
// buttonHide.onclick = () => { hideMarkers(); };


startDate.addEventListener('change', (event) => {

    startDate = event.target.value;
    startDateFinal = parseInt(startDate.replace(reg, '')); // catch the date and numerize it

})
endDate.addEventListener('change', (event) => {

        endDate = event.target.value
        endDateFinal = parseInt(endDate.replace(reg, ''));

    })
    // when hiting the send button remove marker and tracks and rewrite the array of selected files
const send = document.querySelector('#send');
send.addEventListener('click', () => {
    filesSelected = [];
    selectDate(startDateFinal, endDateFinal);
    hideTrack();
    hideMarkersTracks();
})

export { filesSelected };

const allTracks = document.querySelector('#allTracks');
allTracks.addEventListener('click', () => {
    allTracks.innerHTML = "Loading";
    setTimeout(() => { allTracks.innerHTML = "Loading ."; }, 1000);
    setTimeout(() => { allTracks.innerHTML = "Loading .."; }, 2000);
    setTimeout(() => { allTracks.innerHTML = "Loading ..."; }, 3000);
    setTimeout(() => { allTracks.innerHTML = "Loading ...."; }, 4000);
    setTimeout(() => { allTracks.innerHTML = "All Tracks"; }, 5000);
    getTracksList(files);
});


const buttonHideTrack = document.querySelector('#noTracks');
buttonHideTrack.onclick = () => {
    hideTrack();
    hideMarkersTracks();
};





window.initMap = initMap;