function showStudentDashboard() {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('student-dashboard').classList.remove('hidden');
  loadTeachers();
}

function loadTeachers() {
  const teachersList = document.getElementById('teachers-list');
  teachersList.innerHTML = '';
  console.log('Loading available teachers...');
  db.collection('teachers').get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      teachersList.innerHTML = '<p>No teachers found.</p>';
      return;
    }
    querySnapshot.forEach((doc) => {
      const teacher = doc.data();
      const teacherDiv = document.createElement('div');
      teacherDiv.className = 'list-item';
      teacherDiv.innerHTML = `
        <p>Name: ${teacher.name}, Department: ${teacher.department}, Subject: ${teacher.subject}</p>
        <button onclick="showBookingForm('${doc.id}')">Book Appointment</button>
      `;
      teachersList.appendChild(teacherDiv);
    });
  }).catch(error => {
    console.error(`Error loading teachers: ${error.message}`);
    teachersList.innerHTML = '<p>Error loading teachers.</p>';
  });
}

function showBookingForm(teacherId) {
  const form = document.createElement('div');
  form.className = 'booking-form';
  form.innerHTML = `
    <input type="datetime-local" id="booking-datetime-${teacherId}">
    <input type="text" id="booking-message-${teacherId}" placeholder="Message">
    <button onclick="bookAppointment('${teacherId}', 
      document.getElementById('booking-datetime-${teacherId}').value, 
      document.getElementById('booking-message-${teacherId}').value)">Submit</button>
    <button onclick="this.parentElement.remove()">Cancel</button>
  `;
  document.getElementById('teachers-list').appendChild(form);
}

function bookAppointment(teacherId, datetime, message) {
  if (!datetime || !message) {
    alert('Please provide date/time and message.');
    return;
  }
  console.log(`Booking appointment with teacher: ${teacherId}`);
  db.collection('appointments').add({
    teacherId: teacherId,
    studentId: auth.currentUser.uid,
    datetime: datetime,
    message: message,
    status: 'pending'
  }).then(() => {
    console.log("Appointment requested successfully");
    loadTeachers();
  }).catch(error => {
    console.error(`Error booking appointment: ${error.message}`);
    alert('Error booking appointment: ' + error.message);
  });
}