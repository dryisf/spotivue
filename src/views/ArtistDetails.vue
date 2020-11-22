<template>
  <v-row justify="center" class="artist-details flex-column mx-16">
    <v-img
      class="ma-5"
      height="350"
      contain
      :src="selectedArtist.photo"
    ></v-img>
    <div class="text-h2 mx-5">{{ selectedArtist.name }}</div>
    <div class="text-justify">{{ selectedArtist.description }}</div>
  </v-row>
</template>

<script>
import { artists } from "../assets/js/playlist";

export default {
  data: () => ({
    artists,
    selectedArtist: {},
  }),
  methods: {
    getSelectedArtist() {
      let { artistId } = this.$route.params;
      console.log(this.artists.find((artist) => artist.id === artistId));
      this.selectedArtist = this.artists.find(
        (artist) => artist.id === artistId
      );
    },
  },
  created() {
    this.getSelectedArtist();
  },
};
</script>

<style></style>
