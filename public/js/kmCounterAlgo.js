let counterKmAlgo;
let pointsListKmAlgo;
let totalKm = 0;
const unit = "K";
const kmCounterDiv = document.querySelector('#kmCounter');

// get the full list of the tracks
function getTracksListKmAlgo(files) {
    //loop on files name to display
    for (let i = 0; i < files.length; i++) {
        getTracksFromGPXKmAlgo(files[i]);
    }
}
// explore the files to get the coordinates
function getTracksFromGPXKmAlgo(url) {
    $.ajax({
        type: "GET",
        url: `https://cooperidermap.feelingjack.eu/assets/tracks_points/${url}.gpx`,
        dataType: "xml",
        success: function(xml) {

            pointsListKmAlgo = []; // empty array to make independants tracks
            counterKmAlgo = 0;
            $(xml).find("trkpt").each(function() {
                counterKmAlgo++;
                let lat = $(this).attr("lat");
                let lon = $(this).attr("lon");

                let point = {
                    lat: parseFloat(lat),
                    lng: parseFloat(lon)
                };
                // select 1 point of 2 in order to lighten the datas
                if (counterKmAlgo % 2 == 0) {
                    pointsListKmAlgo.push(point);
                }
            });
            calcul(pointsListKmAlgo);
        }
    });
}
// function to add distances by track
function calcul(trackArray) {
    totalKm = 0;
    for (let i = 0; i < (trackArray.length - 1); i++) {

        let lat1 = trackArray[i].lat;
        let lon1 = trackArray[i].lng;
        let j = i + 1;
        let lat2 = trackArray[j].lat;
        let lon2 = trackArray[j].lng;
        totalKm += distance(lat1, lon1, lat2, lon2, unit)
    }
    let actualCounter = parseInt(kmCounterDiv.innerHTML);
    actualCounter += parseInt(totalKm);
    kmCounterDiv.innerHTML = parseInt(actualCounter);
}
// function to carculate the distance beetween 2 points with coordinates
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

export { getTracksListKmAlgo };