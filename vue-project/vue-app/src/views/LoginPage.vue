<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
  <div class="min-h-screen flex items-center justify-center bg-gray-200">
      <div class="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
        <div class="mb-4">
          <h2 class="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form @submit.prevent="login" class="space-y-6">
          <div class="rounded-md shadow-sm">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" v-model="email" type="email" autocomplete="email" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address">
            </div>
            <div class="mt-3">
              <label for="password" class="sr-only">Password</label>
              <input id="password" v-model="password" type="password" autocomplete="current-password" required class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password">
            </div>
          </div>
    
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
            </div>
    
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
            </div>
          </div>
    
          <div>
              <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign in
              </button>
          </div>
          <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
        </form>
    
        <div class="mt-6 relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500"> Or continue with </span>
          </div>
        </div>
    
        <div class="mt-6 grid grid-cols-2 gap-3">
          <div>
            <button type="submit" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Sign in with Google</span>
              <i class="fab fa-google text-gray-600 mr-2"></i>Google
            </button>
          </div>
    
          <div>
            <button type="submit" class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Sign in with GitHub</span>
              <i class="fab fa-github text-gray-600 mr-2"></i>GitHub
            </button>
          </div>
        </div>
    
        <div class="mt-6 text-center">
          <router-link to="register" class="font-medium text-indigo-600 hover:text-indigo-500"> Not a member? Register here. </router-link>
        </div>
      </div>
  </div>
    
</template>

<script>

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        await await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        });
        this.$router.push('/')
      } catch (error) {
        this.error = error.message;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
