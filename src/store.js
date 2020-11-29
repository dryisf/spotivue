import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    selectedSongId: 0,
    queue: [],
    likedSongsId: [],
  },
  getters: {
    getSelectedSongId: (state) => state.selectedSongId,
    getQueue: (state) => state.queue,
    getLikedSongsId: (state) => state.likedSongsId,
  },
  mutations: {
    changeSelectedSongId(state, selectedSongId) {
      state.selectedSongId = selectedSongId;
    },
    addSongToQueue(state, queuedSongId) {
      state.queue = [...state.queue, queuedSongId];
    },
    likeSong(state, likedSongId) {
      state.likedSongsId = [...state.likedSongsId, likedSongId];
    },
    unlikeSong(state, unlikedSongId) {
      const likedSongsId = state.likedSongsId;
      const index = likedSongsId.indexOf(unlikedSongId);
      likedSongsId.splice(index, 1);
    },
  },
});

export default store;
