function showTeacherDashboard() {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('teacher-dashboard').classList.remove('hidden');
  loadAppointments();
}

function loadAppointments() {
  const teacherId = auth.currentUser.uid;
  const appointmentsList = document.getElementById('appointments-list');
  appointmentsList.innerHTML = '';
  console.log(`Loading appointments for teacher: ${teacherId}`);
  db.collection('appointments')
    .where('teacherId', '==', teacherId)
    .onSnapshot((snapshot) => {
      if (snapshot.empty) {
        appointmentsList.innerHTML = '<p>No appointments found.</p>';
        return;
      }
      appointmentsList.innerHTML = '';
      snapshot.forEach((doc) => {
        const appointment = doc.data();
        const appointmentDiv = document.createElement('div');
        appointmentDiv.className = 'list-item';
        let messageDisplay = appointment.message ? `Message: ${appointment.message}` : 'No message';
        appointmentDiv.innerHTML = `
          <p>Student ID: ${appointment.studentId || 'Not booked'}, Date: ${appointment.datetime}, ${messageDisplay}, Status: ${appointment.status}</p>
          ${appointment.studentId ? `
            <button onclick="approveAppointment('${doc.id}')">Approve</button>
            <button onclick="cancelAppointment('${doc.id}')">Cancel</button>
          ` : ''}
        `;
        appointmentsList.appendChild(appointmentDiv);
      });
    }, (error) => {
      console.error(`Error loading appointments: ${error.message}`);
      appointmentsList.innerHTML = '<p>Error loading appointments.</p>';
    });
}

function approveAppointment(appointmentId) {
  console.log(`Approving appointment ID: ${appointmentId}`);
  db.collection('appointments').doc(appointmentId).update({
    status: 'approved'
  }).then(() => {
    console.log("Appointment approved successfully");
  }).catch(error => {
    console.error(`Error approving appointment: ${error.message}`);
    alert('Error approving appointment: ' + error.message);
  });
}

function cancelAppointment(appointmentId) {
  console.log(`Cancelling appointment ID: ${appointmentId}`);
  db.collection('appointments').doc(appointmentId).update({
    status: 'cancelled'
  }).then(() => {
    console.log("Appointment cancelled successfully");
  }).catch(error => {
    console.error(`Error cancelling appointment: ${error.message}`);
    alert('Error cancelling appointment: ' + error.message);
  });
}

function scheduleAppointment(datetime) {
  if (!datetime) {
    alert('Please select a date and time.');
    return;
  }
  const teacherId = auth.currentUser.uid;
  console.log(`Scheduling slot for teacher: ${teacherId} at ${datetime}`);
  db.collection('appointments').add({
    teacherId: teacherId,
    datetime: datetime,
    status: 'available',
    studentId: null,
    message: null
  }).then(() => {
    console.log("Available slot scheduled successfully");
    loadAppointments();
  }).catch(error => {
    console.error(`Error scheduling appointment: ${error.message}`);
    alert('Error scheduling appointment: ' + error.message);
  });
}