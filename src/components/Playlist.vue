<template>
  <div class="playlist mb-5 mx-5">
    <v-card dark width="350">
      <v-list>
        <v-btn block @click="isExpanded = !isExpanded"
          ><v-subheader>PLAYLIST</v-subheader></v-btn
        >
        <v-slide-x-transition>
          <div v-if="isExpanded">
            <v-text-field
              class="px-5"
              v-model="search"
              label="Rechercher une musique"
            ></v-text-field>
            <v-btn @click="dialog = !dialog">Afficher les titres likés</v-btn>
            <v-dialog v-model="dialog" scrollable max-width="300px">
              <v-card>
                <v-card-title
                  >Titres likés ({{ likedSongs.length }})</v-card-title
                >
                <v-divider></v-divider>
                <v-list>
                  <v-list-item-group>
                    <div
                      class="d-flex align-center px-5 list-item"
                      v-for="(song, idx) in likedSongs"
                      :key="idx"
                      @click="changeSong(song.id)"
                    >
                      <v-list-item-avatar>
                        <v-img
                          contain
                          :alt="`${song.title} cover`"
                          :src="song.coverUrl"
                        ></v-img>
                      </v-list-item-avatar>
                      <span class="text-left">
                        <span class="font-weight-bold">{{ song.title }}</span>
                        <span class="d-block">{{
                          song.artist && song.artist.name
                        }}</span>
                      </span>
                    </div>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-dialog>

            <v-list-item-group class="ma-3">
              <div
                class="d-flex justify-space-between"
                v-for="(song, idx) in filteredSongs"
                :key="idx"
              >
                <div
                  class="list-item d-flex align-center px-5"
                  @click="changeSong(song.id)"
                >
                  <v-list-item-avatar>
                    <v-img
                      contain
                      :alt="`${song.title} cover`"
                      :src="song.coverUrl"
                    ></v-img>
                  </v-list-item-avatar>
                  <span
                    class="text-left"
                    :style="
                      `color: ${song.id === selectedSongId ? '#2196F3' : ''}`
                    "
                  >
                    <span class="font-weight-bold">{{ song.title }}</span>
                    <span class="d-block">{{
                      song.artist && song.artist.name
                    }}</span>
                  </span>
                </div>
                <v-btn @click="addToQueue(song.id)"
                  ><v-icon>mdi-playlist-plus</v-icon></v-btn
                >
              </div>
            </v-list-item-group>
          </div>
        </v-slide-x-transition>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { playlist } from "../assets/js/playlist";
export default {
  data: () => ({
    playlist,
    isExpanded: false,
    search: "",
    dialog: false,
  }),
  methods: {
    changeSong(songId) {
      this.$store.commit("changeSelectedSongId", songId);
    },
    addToQueue(songId) {
      this.$store.commit("addSongToQueue", songId);
    },
  },
  computed: {
    likedSongs() {
      return this.$store.getters.getLikedSongsId.map((likedSongId) =>
        this.playlist.find((song) => song.id === likedSongId)
      );
    },
    selectedSongId() {
      return this.$store.getters.getSelectedSongId;
    },
    filteredSongs() {
      return this.playlist.filter(
        (song) =>
          song.title.toLowerCase().includes(this.search.toLowerCase()) ||
          song.artist.name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  &:hover {
    background-color: #353b48;
    color: #2196f3;
    cursor: pointer;
  }
}
</style>
