<template>
  <div class="playlist mb-5 mx-5">
    <v-card dark width="350">
      <v-list>
        <v-btn block @click="isExpanded = !isExpanded"
          ><v-subheader>PLAYLIST</v-subheader></v-btn
        >
        <v-slide-xgit-transition mode="in">
          <div v-if="isExpanded">
            <v-list-item-group>
              <div
                class="d-flex align-center px-5 list-item"
                v-for="(song, idx) in playlist"
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
                <span
                  class="text-left"
                  :style="
                    `color: ${song.id === selectedSongId ? '#2196F3' : ''}`
                  "
                >
                  <span class="font-weight-bold">{{ song.title }}</span>
                  <span class="d-block">{{ song.artist }}</span>
                </span>
              </div>
            </v-list-item-group>
          </div>
        </v-slide-xgit-transition>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import playlist from "../assets/js/playlist";
export default {
  props: {
    selectedSongId: Number,
  },
  data: () => ({
    playlist,
    isExpanded: false,
  }),
  methods: {
    changeSong(songId) {
      this.$emit("selectedSongId", songId);
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
