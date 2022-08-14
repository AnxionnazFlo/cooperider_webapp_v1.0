// fetch("./assets/tracks_points/testfetch.geojson")
//     .then(response => {
//         return response.json();
//     })
//     .then(jsondata => console.log(jsondata));
let datas;

async function getInformationsFromJSON() {

    try {
        const res = await fetch(`./assets/maps_points/AdressesJu.json`);
        datas = await res.json();
        // set endpoint and your API access key
        console.log(datas);

        // displayDatas(datas);

    } catch (error) {
        console.error(error);
    }

}

export { getInformationsFromJSON, datas };