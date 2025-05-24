// admin.js
function showAdminDashboard() {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('admin-dashboard').classList.remove('hidden');
  loadTeachers();
}

function loadTeachers() {
  db.collection('teachers').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log("Teacher:", doc.data());
    });
  });
}

// Add Teacher
function addTeacher(name, department, subject) {
  db.collection('teachers').add({
    name: name,
    department: department,
    subject: subject
  }).then(() => {
    console.log("Teacher added");
  });
}