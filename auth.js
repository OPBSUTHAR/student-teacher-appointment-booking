// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPjnW8Si6T17oSsA6vZtUbkPDAz2aXMC4",
  authDomain: "studentteacherappointmentbook.firebaseapp.com",
  projectId: "studentteacherappointmentbook",
  storageBucket: "studentteacherappointmentbook.firebasestorage.app",
  messagingSenderId: "46881393838",
  appId: "1:46881393838:web:77c0827f18de4e939bf13f",
  measurementId: "G-826ZKWQ1PQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// auth.js
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Logged in:", userCredential.user.uid);
      checkUserRole(userCredential.user.uid);
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });
}

function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Registered:", userCredential.user.uid);
      // Default role: student (admin approves later)
      db.collection('users').doc(userCredential.user.uid).set({
        role: 'student',
        status: 'pending'
      });
    })
    .catch((error) => {
      console.error("Registration error:", error.message);
    });
}

function checkUserRole(uid) {
  db.collection('users').doc(uid).get()
    .then((doc) => {
      const role = doc.data().role;
      if (role === 'admin') showAdminDashboard();
      else if (role === 'teacher') showTeacherDashboard();
      else showStudentDashboard();
    });
}