<template>
    <div>
    <h2>Event Details</h2>
    <p>Title: {{ event.title }}</p>
    <p>Description: {{ event.description }}</p>
    <!-- Display other event details -->
    </div>
</template>

<script>
import { db } from '@/firebase';
import { getDoc, doc } from 'firebase/firestore';

export default {
    name: 'EventPage',
    data() {
        return {
            event: {},
        };
    },
    mounted() {
    // Retrieve the event ID from the route params
    const eventId = this.$route.params.id;

    // Retrieve the event data from Firestore based on the event ID
    

    const eventRef = doc(db, "events", eventId);
    getDoc(eventRef)
        .then((doc) => {
        if (doc.exists) {
            this.event = doc.data();
        } else {
            // Handle case when the event doesn't exist
            console.error('Event not found');
        }
        })
        .catch((error) => {
        // Handle any errors that occurred during the retrieval
        console.error('Error retrieving event:', error);
        });
    },
};
</script>