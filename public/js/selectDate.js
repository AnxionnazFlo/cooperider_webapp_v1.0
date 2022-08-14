import { getTracksList } from './getTracksList.js';
import { filesSelected } from './index_v2.js';

const selectDate = (startDate, endDate) => {
    // algo to select date in the name of the files and compare to selected date
    // return an array of selected files
    for (let i = 0; i < files.length; i++) {
        let filesDates = parseInt(files[i].slice(-16, -8));
        if (filesDates >= startDate && filesDates <= endDate) {
            filesSelected.push(files[i]);
        }
    }
    getTracksList(filesSelected);
}

export { selectDate };