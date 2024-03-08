<template>
    <div>
      <h2>Create New Event</h2>
      <form @submit.prevent="createEvent">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="event.title" required>
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea id="description" v-model="event.description" required></textarea>
        </div>
        <div>
          <label for="date">Date:</label>
          <input type="date" id="date" v-model="event.date" required>
        </div>
        <div>
          <label for="location">Location:</label>
          <input type="text" id="location" v-model="event.location" required>
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db } from '@/firebase';
  import { collection, addDoc } from 'firebase/firestore';
  
  export default {
    name: 'EventCreation',
    data() {
      return {
        event: {
          title: '',
          description: '',
          date: '',
          location: '',
        },
      };
    },
    methods: {
      async createEvent() {
        try {
          const eventsCollectionRef = collection(db, 'events')
          const eventRef = await addDoc(eventsCollectionRef, this.event);
          console.log('Event created with ID:', eventRef.id);
          // Reset the form fields after successful creation
          this.event = {
            title: '',
            description: '',
            date: '',
            location: '',
          };
          // Optionally, navigate to the event details page or show a success message
        } catch (error) {
          console.error('Error creating event:', error);
          // Handle the error, show an error message, or perform any necessary actions
        }
      },
    },
  };
  </script>