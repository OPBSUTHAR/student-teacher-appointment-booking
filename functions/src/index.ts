import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const onAppointmentBooked = functions.firestore
  .document('appointments/{appointmentId}')
  .onCreate((snapshot, context) => {
    const appointment = snapshot.data();
    console.log(`New appointment booked: ${context.params.appointmentId}`);
    return Promise.resolve();
  });