function showAdminDashboard() {
  document.getElementById('auth-container').classList.add('hidden');
  document.getElementById('admin-dashboard').classList.remove('hidden');
  loadTeachers();
  loadPendingStudents();
}

function loadTeachers() {
  const teachersList = document.getElementById('teachers-list');
  teachersList.innerHTML = '';
  console.log('Loading teachers...');
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
        <button onclick="updateTeacher('${doc.id}')">Update</button>
        <button onclick="deleteTeacher('${doc.id}')">Delete</button>
      `;
      teachersList.appendChild(teacherDiv);
    });
  }).catch(error => {
    console.error(`Error loading teachers: ${error.message}`);
    teachersList.innerHTML = '<p>Error loading teachers.</p>';
  });
}

function addTeacher(name, department, subject) {
  if (!name || !department || !subject) {
    alert('Please fill in all fields.');
    return;
  }
  console.log(`Adding teacher: ${name}, ${department}, ${subject}`);
  db.collection('teachers').add({
    name: name,
    department: department,
    subject: subject
  }).then(() => {
    console.log("Teacher added successfully");
    loadTeachers();
  }).catch(error => {
    console.error(`Error adding teacher: ${error.message}`);
    alert('Error adding teacher: ' + error.message);
  });
}

function updateTeacher(teacherId) {
  const name = prompt("Enter new name:");
  const department = prompt("Enter new department:");
  const subject = prompt("Enter new subject:");
  if (name && department && subject) {
    console.log(`Updating teacher ID: ${teacherId}`);
    db.collection('teachers').doc(teacherId).update({
      name: name,
      department: department,
      subject: subject
    }).then(() => {
      console.log("Teacher updated successfully");
      loadTeachers();
    }).catch(error => {
      console.error(`Error updating teacher: ${error.message}`);
      alert('Error updating teacher: ' + error.message);
    });
  }
}

function deleteTeacher(teacherId) {
  if (confirm("Are you sure you want to delete this teacher?")) {
    console.log(`Deleting teacher ID: ${teacherId}`);
    db.collection('teachers').doc(teacherId).delete().then(() => {
      console.log("Teacher deleted successfully");
      loadTeachers();
    }).catch(error => {
      console.error(`Error deleting teacher: ${error.message}`);
      alert('Error deleting teacher: ' + error.message);
    });
  }
}

function loadPendingStudents() {
  const pendingList = document.getElementById('pending-students-list');
  pendingList.innerHTML = '';
  console.log('Loading pending students...');
  db.collection('users').where('status', '==', 'pending').get().then((querySnapshot) => {
    if (querySnapshot.empty) {
      pendingList.innerHTML = '<p>No pending registrations.</p>';
      return;
    }
    querySnapshot.forEach((doc) => {
      const user = doc.data();
      const userDiv = document.createElement('div');
      userDiv.className = 'list-item';
      userDiv.innerHTML = `
        <p>Email: ${user.email}</p>
        <button onclick="approveStudent('${doc.id}')">Approve</button>
        <button onclick="rejectStudent('${doc.id}')">Reject</button>
      `;
      pendingList.appendChild(userDiv);
    });
  }).catch(error => {
    console.error(`Error loading pending students: ${error.message}`);
    pendingList.innerHTML = '<p>Error loading pending students.</p>';
  });
}

function approveStudent(userId) {
  console.log(`Approving student ID: ${userId}`);
  db.collection('users').doc(userId).update({
    status: 'approved'
  }).then(() => {
    console.log("Student approved successfully");
    loadPendingStudents();
  }).catch(error => {
    console.error(`Error approving student: ${error.message}`);
    alert('Error approving student: ' + error.message);
  });
}

function rejectStudent(userId) {
  console.log(`Rejecting student ID: ${userId}`);
  db.collection('users').doc(userId).delete().then(() => {
    console.log("Student rejected and deleted successfully");
    loadPendingStudents();
  }).catch(error => {
    console.error(`Error rejecting student: ${error.message}`);
    alert('Error rejecting student: ' + error.message);
  });
}