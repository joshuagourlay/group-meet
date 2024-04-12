<template>
  <div class="bg-white rounded-lg shadow-md p-4">
    <div class="flex items-center mb-4">
      <div class="bg-blue-500 text-white rounded-full p-2 mr-2">
        <i class="fas fa-calendar"></i>
      </div>
      <h3 class="text-lg font-semibold">{{ event.title }}</h3>
    </div>
    <p class="text-gray-600 mb-2">
      <i class="fas fa-calendar-alt mr-1"></i> {{ event.date }}
    </p>
    <p class="text-gray-600 mb-2">
      <i class="fas fa-map-marker-alt mr-1"></i> {{ event.location }}
    </p>
    <p class="text-gray-700 mb-4">{{ event.description }}</p>
    <div class="mt-4">
      <span v-for="tag in event.tags" :key="tag" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{{ tag }}</span>
    </div>
    <router-link :to="{ name: 'EventDetails', params: { id: event.id } }" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
      View Details
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>