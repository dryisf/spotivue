<template>
  <v-row justify="center" dense>
    <v-col v-for="artist in artists" :key="artist.id" cols="12">
      <v-card dark @click="goToArtistDetails(artist.id)">
        <div class="d-flex flex-no-wrap justify-space-between">
          <v-card-title class="headline" v-text="artist.name"></v-card-title>
          <v-avatar class="ma-3" size="125" tile>
            <v-img :src="artist.photo"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { artists } from "../assets/js/playlist";
export default {
  data: () => ({
    artists,
  }),
  methods: {
    goToArtistDetails(artistId) {
      this.$router.push({ name: "ArtistDetails", params: { artistId } });
    },
  },
};
</script>

<style></style>
