import { db } from './initializeFirebase.js';
import {
    getDoc,
    doc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

//selection of gpx list
const gpxList = document.querySelector('.gpx');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const editorItem = document.querySelector('.editor');
// setup the UI if user exist or not and if admin or editor
const setupUi = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
        }
        if (user.editor) {
            editorItem.style.display = 'block';
        }
        // Account info
        getDoc(doc(db, "users", user.uid)).then((doc) => {
            const html = `
            <div> Logged in as ${user.email} </div>
            <div>${doc.data().desc}</div>
            <div class='pink-text'>${user.admin ? 'Admin' : ''}</div>
            <div class='pink-text'>${user.editor ? 'Editor' : ''}</div>
            `;
            accountDetails.innerHTML = html;
        })

        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        adminItems.forEach(item => item.style.display = 'none')
            // hide account info
        accountDetails.innerHTML = "";
        //toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}

// setup the gpx list
const setupGpxList = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const gpx = doc.data();
            const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> ${gpx.fileName} </div>
        <div class="collapsible-body white"> ${gpx.uploadDate.toDate().toLocaleString('fr-FR')} </div>
      </li>
    `;
            html += li;
        })
        gpxList.innerHTML = html
    } else {
        gpxList.innerHTML = '<h5 class="center-align"> Login to view list of gpx files</h5>'
    }
}
export { setupGpxList, setupUi };


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});