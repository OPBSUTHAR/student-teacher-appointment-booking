function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(`Login attempt with email: ${email}`);
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(`Logged in: ${userCredential.user.uid}`);
      checkUserRole(userCredential.user.uid);
    })
    .catch((error) => {
      console.error(`Login error: ${error.message}`);
      alert('Login failed: ' + error.message);
    });
}

function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  console.log(`Registration attempt with email: ${email}`);
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(`Registered: ${userCredential.user.uid}`);
      db.collection('users').doc(userCredential.user.uid).set({
        role: 'student',
        status: 'pending',
        email: userCredential.user.email
      }).then(() => {
        console.log(`User role set to student, pending approval for ${userCredential.user.uid}`);
      }).catch(error => {
        console.error(`Error setting user role: ${error.message}`);
      });
    })
    .catch((error) => {
      console.error(`Registration error: ${error.message}`);
      alert('Registration failed: ' + error.message);
    });
}

function checkUserRole(uid) {
  console.log(`Checking role for user: ${uid}`);
  db.collection('users').doc(uid).get()
    .then((doc) => {
      if (doc.exists) {
        const role = doc.data().role;
        const status = doc.data().status;
        console.log(`User ${uid} role: ${role}, status: ${status}`);
        if (status === 'pending') {
          alert('Your account is pending approval by an admin.');
          auth.signOut();
          return;
        }
        if (role === 'admin') showAdminDashboard();
        else if (role === 'teacher') showTeacherDashboard();
        else showStudentDashboard();
      } else {
        console.error('User role not found in Firestore');
        alert('User role not found. Please contact an admin.');
        auth.signOut();
      }
    })
    .catch((error) => {
      console.error(`Error fetching user role: ${error.message}`);
      alert('Error fetching user role: ' + error.message);
      auth.signOut();
    });
}