<template>
  <v-row justify="center" class="spotivue flex-wrap-reverse">
    <Player
      @selectedSongId="selectedSongId = $event"
      :selectedSongId="selectedSongId"
      :queuedSongId="queuedSongId"
    />
    <Playlist
      @queuedSongId="queuedSongId = $event"
      @selectedSongId="selectedSongId = $event"
      :selectedSongId="selectedSongId"
    />
  </v-row>
</template>

<script>
import Player from "@/components/Player.vue";
import Playlist from "@/components/Playlist.vue";

export default {
  name: "Spotivue",
  components: {
    Player,
    Playlist,
  },
  data: () => ({
    selectedSongId: 0,
    queuedSongId: null,
  }),
};
</script>

<style></style>
