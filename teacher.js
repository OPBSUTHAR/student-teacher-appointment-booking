// teacher.js
function showTeacherDashboard() {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('teacher-dashboard').classList.remove('hidden');
  loadAppointments();
}

function loadAppointments() {
  const teacherId = auth.currentUser.uid;
  db.collection('appointments')
    .where('teacherId', '==', teacherId)
    .onSnapshot((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("Appointment:", doc.data());
      });
    });
}