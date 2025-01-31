import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATjGGi8obpu7-n4TLn0nWzIklQ5KL6k3g",
    authDomain: "buzz-bazaar-app.firebaseapp.com",
    projectId: "buzz-bazaar-app",
    storageBucket: "buzz-bazaar-app.appspot.com",
    messagingSenderId: "241585631682",
    appId: "1:241585631682:web:01847fed637c875536265b"
};

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
// Get all our input fields
email = document.getElementById('email').value
password = document.getElementById('password').value

// Validate input fields
if (validate_email(email) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
}

// Move on with Auth
auth.createUserWithEmailAndPassword(email, password)
.then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
    email : email,
    last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
})

.catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
})
}

// Set up our login function
function login () {
// Get all our input fields
email = document.getElementById('email').value
password = document.getElementById('password').value

// Validate input fields
if (validate_email(email) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
}

auth.signInWithEmailAndPassword(email, password)
.then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
    last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

})

.catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
})
}

// Validate Functions
function validate_email(email) {
expression = /^[a-zA-Z0-9]+@gatech\.edu$/
if (expression.test(email) == true) {
    // Email is good
    return true
} else {
    // Email is not good
    return false
}
}
