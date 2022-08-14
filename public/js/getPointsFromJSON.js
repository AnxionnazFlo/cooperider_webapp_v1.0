import { makeMarker } from './makeMarker.js';
// fetching file with all the points of interest
async function getPointsFromJSON() {
    try {
        const res = await fetch(`./assets/maps_points/results_final_ju.json`);
        const datas = await res.json();
        makeMarker(datas);
    } catch (error) {
        console.error(error);
    }
}
export { getPointsFromJSON };