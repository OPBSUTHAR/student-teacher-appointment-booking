Student-Teacher Booking Appointment
Overview
A web-based appointment booking system for students and teachers to schedule appointments, send messages, and manage schedules using HTML, CSS, JavaScript, and Firebase.
Technologies

HTML, CSS, JavaScript
Firebase (Firestore, Authentication, Hosting, Cloud Functions)

Features

Admin: Add/Update/Delete teachers, approve student registrations.
Teacher: Schedule appointments, approve/cancel appointments, view messages.
Student: Register, login, search teachers, book appointments, send messages.

Setup

Clone the repository: git clone <repo-url>
Install dependencies: npm install
Configure Firebase:
Replace firebaseConfig in public/index.html with your Firebase project config.


Deploy to Firebase Hosting:
npm run build
firebase deploy



Workflow

Users register/login via the auth form.
Admins manage teachers and approve students.
Teachers schedule and manage appointments.
Students search teachers and book appointments.

Project Structure

public/: Hosting files (index.html, auth.js, admin.js, teacher.js, student.js, styles.css)
functions/: Cloud Functions for server-side logic
firebase.json: Firebase configuration

Deployment
Hosted on Firebase Hosting with GitHub Actions CI/CD.
