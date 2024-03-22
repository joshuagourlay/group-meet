<template>
  <div>
    <h2>Event Summary</h2>
    <div v-for="(eventGroup, location) in eventsByLocation" :key="location">
      <h3>{{ location }}</h3>
      <ul>
        <li v-for="event in eventGroup" :key="event.id">
          <h4>{{ event.title }}</h4>
          <p>Date: {{ event.date }}</p>
          <p>Description: {{ event.description }}</p>
          <button @click="viewEventDetails(event.id)">View Details</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default {
  name: 'EventSummary',
  data() {
    return {
      eventsByLocation: {},
    };
  },
  async created() {
    try {
      const eventsCollectionRef = collection(db, 'events');
      const eventQuery = query(eventsCollectionRef, orderBy('date', 'asc'));
      const querySnapshot = await getDocs(eventQuery);

      querySnapshot.forEach((doc) => {
        const event = { id: doc.id, ...doc.data() };
        const { location } = event;
        if (!this.eventsByLocation[location]) {
          this.eventsByLocation[location] = [];
        }
        this.eventsByLocation[location].push(event);
      });
    } catch (error) {
      console.error('Error retrieving events:', error);
    }
  },
  methods: {
    //viewEventDetails(eventId) {
      // Navigate to the event details page using the eventId
    //},
  },
};
</script>