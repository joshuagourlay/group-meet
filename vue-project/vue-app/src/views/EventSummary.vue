<template>
  <div>
    <div class="bg-white shadow-md p-4 mb-8">
      <!-- Search Input -->
      <div class="mb-4">
        <label for="search" class="block text-gray-700 font-bold mb-2">Search:</label>
        <input type="text" id="search" v-model="searchQuery" @input="searchEvents" placeholder="Search events..." class="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline">
      </div>

      <!-- Date Range Filter -->
      <div class="flex items-center justify-between">
        <div>
          <label for="startDate" class="block text-gray-700 font-bold mb-2">Start Date:</label>
          <input type="date" id="startDate" v-model="startDate" @change="filterEvents" class="px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline">
        </div>
        <div>
          <label for="endDate" class="block text-gray-700 font-bold mb-2">End Date:</label>
          <input type="date" id="endDate" v-model="endDate" @change="filterEvents" class="px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:shadow-outline">
        </div>
      </div>
    </div>

    <div class="mt-12">
      <!-- Upcoming Events -->
      <h3 class="text-xl font-bold mb-4">Upcoming Events</h3>
      <div v-for="(eventGroup, location) in upcomingEventsByLocation" :key="location" class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <EventCard v-for="event in eventGroup" :key="event.id" :event="event" />
        </div>
      </div>
    </div>

    <!-- Past Events -->
    <h3 class="text-xl font-bold mb-4">Past Events</h3>
    <div v-for="(eventGroup, location) in pastEventsByLocation" :key="location" class="mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <EventCard v-for="event in eventGroup" :key="event.id" :event="event" />
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import EventCard from '../components/EventCard.vue';

export default {
  name: 'EventSummary',
  components: {
    EventCard,
  },
  data() {
    return {
      eventsByLocation: {},
      searchQuery: '',
      startDate: new Date().toISOString().slice(0, 10), // Set default start date to today
      endDate: '',
    };
  },
  computed: {
    upcomingEventsByLocation() {
      const filteredEvents = {};

      for (const location in this.eventsByLocation) {
        const events = this.eventsByLocation[location];
        const filteredLocationEvents = events.filter((event) => {
          const matchesSearch =
            event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            (event.tags && event.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase())));

          const matchesDateRange =
            (!this.endDate || event.date <= this.endDate) &&
            event.date >= this.startDate;

          return matchesSearch && matchesDateRange;
        });

        if (filteredLocationEvents.length > 0) {
          filteredEvents[location] = filteredLocationEvents;
        }
      }

      return filteredEvents;
    },
    pastEventsByLocation() {
      const filteredEvents = {};

      for (const location in this.eventsByLocation) {
        const events = this.eventsByLocation[location];
        const filteredLocationEvents = events.filter((event) => {
          const matchesSearch =
            event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            (event.tags && event.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase())));

          const matchesDateRange =
            event.date < this.startDate &&
            (!this.endDate || event.date <= this.endDate);

          return matchesSearch && matchesDateRange;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filteredLocationEvents.length > 0) {
          filteredEvents[location] = filteredLocationEvents;
        }
      }

      return filteredEvents;
    },
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
    searchEvents() {
      // The computed properties will automatically update the filtered events
    },
    filterEvents() {
      // The computed properties will automatically update the filtered events
    },
  },
};
</script>