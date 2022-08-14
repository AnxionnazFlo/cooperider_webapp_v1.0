import { getTracksFromGPX } from './getTracksFromGPX.js';
// loop to send the list of tracks for construction
function getTracksList(files) {
    //loop on files name to display
    for (let i = 0; i < files.length; i++) {
        getTracksFromGPX(files[i]);
    };
};
export { getTracksList };