import { createStore } from 'vuex'
import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const store = createStore({
  state() {
    return {
      user: null
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      commit('setUser', userCredential.user);
    },
    async logout({ commit }) {
      await signOut(auth);
      commit('setUser', null);
    }
  }
})

export default store;
