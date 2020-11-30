<template>
  <v-row justify="center" class="spotivue flex-wrap-reverse">
    <Player />
    <Playlist />
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
};
</script>

<style></style>
