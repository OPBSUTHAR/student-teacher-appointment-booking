// student.js
function showStudentDashboard() {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('student-dashboard').classList.remove('hidden');
  loadTeachers();
}

function loadTeachers() {
  db.collection('teachers').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log("Available Teacher:", doc.data());
    });
  });
}

function bookAppointment(teacherId, datetime, message) {
  db.collection('appointments').add({
    teacherId: teacherId,
    studentId: auth.currentUser.uid,
    datetime: datetime,
    message: message,
    status: 'pending'
  }).then(() => {
    console.log("Appointment requested");
  });
}