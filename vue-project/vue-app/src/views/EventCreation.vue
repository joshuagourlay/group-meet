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
        <label for="locationDescription">Location Description:</label>
        <input type="text" id="locationDescription" v-model="event.locationDescription" required>
      </div>
      <div>
        <label for="tags">Tags:</label>
        <input type="text" id="tags" v-model="event.tags" placeholder="Enter comma-separated tags">
      </div>
      <div>
        <label>Location:</label>
        <div ref="map" style="height: 400px;"></div>
      </div>
      <button type="submit">Create Event</button>
    </form>
  </div>
</template>

<script>
/* global google */
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
        locationDescription: '',
        lat: null,
        lng: null,
        tags: [],
      },
    };
  },

  methods: {
    async createEvent() {
      try {
        const eventsCollectionRef = collection(db, 'events');
        const eventData = {
          ...this.event,
          tags: this.event.tags.length > 0 ? this.event.tags.split(',').map(tag => tag.trim()) : [],
          lat: this.event.lat,
          lng: this.event.lng,
        };
        const eventRef = await addDoc(eventsCollectionRef, eventData);
        console.log('Event created with ID:', eventRef.id);
        // Reset the form fields after successful creation
        this.event = {
          title: '',
          description: '',
          date: '',
          locationDescription: '',
          lat: null,
          lng: null,
          tags: [],
        };
        // Optionally, navigate to the event details page or show a success message
      } catch (error) {
        console.error('Error creating event:', error);
        // Handle the error, show an error message, or perform any necessary actions
      }
    },
    initializeMap() {
      const mapOptions = {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      };
      this.map = new google.maps.Map(this.$refs.map, mapOptions);
      this.marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map: this.map,
        draggable: true,
      });
      this.marker.addListener('dragend', this.handleMarkerDragEnd);
    },
    handleMarkerDragEnd() {
      const position = this.marker.getPosition();
      this.event.lat = position.lat();
      this.event.lng = position.lng();
    },
  },
  mounted() {
    this.initializeMap();
  },
};
</script>