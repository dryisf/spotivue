<template>
  <v-row justify="center" class="spotivue" no-gutters>
    <Player
      @selectedSongId="selectedSongId = $event"
      :selectedSongId="selectedSongId"
    />
    <Playlist
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
  }),
};
</script>

<style></style>
