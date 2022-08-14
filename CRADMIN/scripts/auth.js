import { db, auth, functions } from './initializeFirebase.js';
import { setupGpxList, setupUi } from './index.js';
import {
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    getIdTokenResult
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {
    collection,
    addDoc,
    Timestamp,
    orderBy,
    doc,
    setDoc,
    query,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { httpsCallable } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-functions.js";


// add admin/editor cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let adminEmail = document.querySelector('#admin-email').value;
    let role = document.querySelector('#role').value;
    if (role == 'admin') {
        const addAdminRole = httpsCallable(functions, 'addAdminRole');
        addAdminRole({ email: adminEmail }).then(result => {
            console.log(result);
            adminForm.reset();
        });
    };
    if (role == 'editor') {
        //prevent admin to depreciate his own role
        if (adminEmail != auth.currentUser.email) {
            const addEditorRole = httpsCallable(functions, 'addEditorRole');
            addEditorRole({ email: adminEmail }).then(result => {
                console.log(result);
                adminForm.reset();
            });
        } else {
            console.log("Don't ever depeciated yourself !")
        };
    }
});

// listen for auth status changing events
onAuthStateChanged(auth, (user) => {
    if (user) {
        // token check for setup the UI
        user.getIdTokenResult().then(idTokenResult => {
                user.admin = idTokenResult.claims.admin;
                user.editor = idTokenResult.claims.editor;
                setupUi(user);
            })
            // get data 
        const q = query(collection(db, "gpx"), orderBy("uploadDate", 'desc'));
        onSnapshot(q, (snapshot) => {
                setupGpxList(snapshot.docs);
            },
            (error) => {
                console.log(error.message);
            });
    } else {
        setupUi();
        setupGpxList([]);
    }
});

//update new gpx file
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $.ajax({
        url: './scripts/upload.php',
        type: 'POST',
        // Form data
        data: new FormData($('#create-form')[0]),
        cache: false,
        contentType: false,
        processData: false,
        success: function(response) {
            if (response == 4) {
                //if php response 4, it's ok => record in firebase
                const created = Timestamp.fromDate(new Date()).toDate();
                let fakePath = createForm['gpx'].value;
                let name = fakePath.split("\\").pop();

                addDoc(collection(db, "gpx"), {
                    fileName: name,
                    uploadDate: created
                }).then(() => {
                    // close modal
                    const modal = document.querySelector('#modal-create');
                    M.Modal.getInstance(modal).close();
                    createForm.reset();
                    createForm.querySelector('.error').innerHTML = '';
                }).catch(err => {
                    createForm.querySelector('.error').innerHTML = err.message;
                });
            } else if (response == 3) {
                createForm.querySelector('.error').innerHTML = "An error occurred, your file is not uploaded on the server";
            } else if (response == 2) {
                createForm.querySelector('.error').innerHTML = "An error occurred, your file is more than 7Mb";
            } else if (response == 1) {
                createForm.querySelector('.error').innerHTML = "An error occurred, your file must be .gpx";
            }
        }
    });

})

//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user infos
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // signup the user
    createUserWithEmailAndPassword(auth, email, password).then(cred => {
        return setDoc(doc(db, "users", cred.user.uid), {
            desc: signupForm['signup-desc'].value
        });

    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

// //logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    signOut(auth);
});

//login a user
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user infos
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        // close the modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});