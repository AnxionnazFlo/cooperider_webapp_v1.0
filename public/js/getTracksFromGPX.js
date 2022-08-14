import { makeTrack } from './makeTrack.js';
let pointsList = new Array();
let counter = 0;
// get gpx file and parse lat and long in an array
const getTracksFromGPX = (url) => {
    $.ajax({
        type: "GET",
        url: `https://cooperidermap.feelingjack.eu/assets/tracks_points/${url}.gpx`,
        dataType: "xml",
        success: function(xml) {

            pointsList = []; // empty array to make independants tracks
            counter = 0;
            $(xml).find("trkpt").each(function() {
                counter++;
                let lat = $(this).attr("lat");
                let lon = $(this).attr("lon");

                let point = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lon)
                };
                // select 1 point of 2 in order to lighten the datas
                if (counter % 2 == 0) {
                    pointsList.push(point);
                }
            });
            console.log(pointsList);
            makeTrack(pointsList, url);
        }
    });
}

export { getTracksFromGPX };