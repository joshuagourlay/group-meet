<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link href="../dist/output.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
  
  <div class="flex h-screen">
      <!-- Left Sidebar -->
      <div class="flex flex-col justify-between flex-1 w-1/4 bg-gray-100 p-5">
        <div>
            <div class="relative mb-3 flex items-center pb-3">
                <i class="fa-solid fa-volleyball w-5 h-5 mr-2 mt-2"></i>
                <h2 class="text-xl">Sports Connect</h2>
                <div class="mt-14 absolute left-3 w-44 h-0.5 bg-gray-400"></div>
            </div>
            <!-- Dashboard Links -->
            <div class="relative mb-4 pb-3">
                <a v-for="page in pages" :key="page.title" :href="page.path" class="block py-2 px-4 hover:bg-gray-300">
                  <i :class="page.icon" class="mr-2 w-4"></i>
                  {{ page.title }}
                </a>
                
            </div>
            <!-- Your Teams Section -->
            <div class="mb-5">
                <h2 class="text-x1 font-bold mb-2">Your teams</h2>
                <a href="#" class="block py-2 px-4 hover:bg-gray-300">First String</a>
                <a href="#" class="block py-2 px-4 hover:bg-gray-300">Kickballers</a>
                <a href="#" class="block py-2 px-4 hover:bg-gray-300">USF CS</a>
            </div>
        </div>
        <!-- Profile Icon and Name -->
        <div>
          <div class="flex items-center">
            <p v-if="user" class="text-center mt-2">Signed in as {{ user.email }}.</p>
            <p v-else class="text-center mt-2">Not signed in</p>
          </div>
          <div class="flex items-center">
            <router-link v-if="user" to="#" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click.prevent="logout">Logout</router-link>
            <router-link v-else to="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</router-link>
          </div>
        </div>
    </div>
  
      <!-- Right Content Area -->
      <div class="w-3/4 p-5">
          <div class="flex space-x-4">
              <!-- Upcoming Events Module -->
              <div class="w-1/3 bg-white p-4 rounded shadow">
                  <h2 class="text-xl font-bold mb-2">Upcoming Events</h2>
                  <!-- Add your events here -->
              </div>
  
              <!-- Recent Activity Module -->
              <div class="w-1/3 bg-white p-4 rounded shadow">
                  <h2 class="text-xl font-bold mb-2">Recent Activity</h2>
                  <!-- Add your recent activities here -->
              </div>
  
              <!-- Quick Links or Notifications Module -->
              <div class="w-1/3 bg-white p-4 rounded shadow">
                  <h2 class="text-xl font-bold mb-2">Quick Links</h2>
                  <!-- Add your quick links here -->
              </div>
          </div>
      </div>
  </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    methods: {
      logout() {
        this.$store.dispatch('logout');
      }
    },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    data() {
      return {
        pages: [
          { title: 'Dashboard', path: '#', icon: 'fa-solid fa-house' },
          { title: 'Teams', path: '#', icon: 'fa-solid fa-user-group' },
          { title: 'Calendar', path: '#', icon: 'fa-regular fa-calendar-days' },
          { title: 'Past Events', path: '#', icon: 'fa-solid fa-check-double' },
          { title: 'User Stats', path: '#', icon: 'fa-solid fa-signal' },
        ],
      };
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  
