<template>
  <v-card dark width="400" class="mx-5">
    <v-img
      class="ma-5"
      height="350"
      contain
      :src="selectedSong.coverUrl"
    ></v-img>
    <div class="px-5">
      <div class="text-left">
        <h2>
          <span
            @click="goToArtistDetails(selectedSong.artist.id)"
            class="clickable"
            >{{ selectedSong.title }}</span
          >
          <span
            class="float-right clickable"
            @click="toggleLike(selectedSong.id)"
            ><v-icon>{{
              `mdi-${isLiked ? "heart" : "heart-outline"}`
            }}</v-icon></span
          >
        </h2>
        <p @click="goToArtistDetails(selectedSong.artist.id)">
          <span class="clickable">{{ selectedSong.artist.name }}</span>
        </p>
      </div>
      <div class="d-flex flex-column">
        <v-slider
          width="500"
          v-model="progress"
          @change="setCurrentTime"
        ></v-slider>
        <div class="d-flex justify-space-between">
          <span>{{ currentTime }}</span
          ><span>{{ duration }}</span>
        </div>
      </div>
      <div class=" d-flex align-center justify-center my-5">
        <v-btn light small @click="onShuffle = !onShuffle" class="mr-7"
          ><v-icon :color="onShuffle ? 'blue' : ''">mdi-shuffle</v-icon></v-btn
        >
        <v-btn light small @click="previous"
          ><v-icon>mdi-skip-previous-circle-outline</v-icon></v-btn
        >
        <v-btn light @click="togglePlay" class="mx-5"
          ><v-icon>{{ actionIcon }}</v-icon></v-btn
        >
        <v-btn light small @click="next"
          ><v-icon>mdi-skip-next-circle-outline</v-icon></v-btn
        >
        <v-btn light small @click="onRepeatOnce = !onRepeatOnce" class="ml-7"
          ><v-icon :color="onRepeatOnce ? 'blue' : ''"
            >mdi-repeat-once</v-icon
          ></v-btn
        >
      </div>
      <div class="d-flex my-5 justify-center align-center volume">
        <knob-control
          v-model="volume"
          text-color="#fff"
          primary-color="gray"
          secondary-color="#fff"
        ></knob-control>
      </div>
    </div>
  </v-card>
</template>

<script>
import { playlist } from "../assets/js/playlist";
export default {
  data: () => ({
    playlist,
    progress: null,
    actionIcon: null,
    audio: null,
    onRepeatOnce: false,
    onShuffle: false,
    currentTime: null,
    duration: null,
    volume: 0,
  }),
  methods: {
    toggleLike(songId) {
      if (!this.isLiked) this.$store.commit("likeSong", songId);
      else this.$store.commit("unlikeSong", songId);
    },
    changeSong(songId) {
      this.$store.commit("changeSelectedSongId", songId);
    },
    goToArtistDetails(artistId) {
      this.$router.push({ name: "ArtistDetails", params: { artistId } });
    },
    setCurrentTime() {
      this.audio.currentTime = (this.progress / 100) * this.audio.duration;
    },
    togglePlay() {
      this.audio.paused ? this.audio.play() : this.audio.pause();
      this.setIcon();
    },
    next() {
      if (this.queue.length !== 0) {
        this.changeSong(this.queue.shift());
      } else if (this.onShuffle) {
        const randomSongId = this.generateRandomId();
        this.changeSong(randomSongId);
      } else if (this.selectedSong.id + 1 < this.playlist.length)
        this.changeSong(this.selectedSong.id + 1);
    },
    previous() {
      if (this.audio.currentTime > 10 || this.selectedSong.id === 0)
        this.repeatSong();
      else this.changeSong(this.selectedSong.id - 1);
    },
    repeatSong() {
      this.audio.currentTime = 0;
      if (this.audio.paused) this.audio.play();
      this.setIcon();
    },
    putSong() {
      this.audio.src = this.selectedSong.source;
      this.togglePlay();
    },
    setIcon() {
      this.actionIcon = this.audio.paused
        ? "mdi-arrow-right-drop-circle-outline"
        : "mdi-pause-circle-outline";
    },
    init() {
      this.audio = document.getElementById("audio");
      this.volume = 10;
      this.putSong();

      this.audio.addEventListener("timeupdate", () => {
        this.setProgress();
      });

      this.audio.addEventListener("ended", () => {
        this.setIcon();
        this.audio.currentTime = 0;
        if (this.onRepeatOnce) this.repeatSong();
        else this.next();
      });
    },
    setProgress() {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;

      const formattedDuration = this.formatTime(duration - currentTime);

      this.currentTime = this.formatTime(currentTime);
      this.duration =
        formattedDuration === "NaN:NaN" ? "00:00" : formattedDuration;
      this.progress = (currentTime / duration) * 100;
    },
    generateRandomId() {
      const index = Math.floor(
        Math.random() * Math.floor(this.playlist.length)
      );

      if (index !== this.selectedSong.id) return index;
      return this.generateRandomId();
    },
    formatTime(time) {
      let minutes = parseInt(time / 60, 10);
      let seconds = parseInt(time % 60);

      if (minutes < 10) {
        minutes = "0" + minutes.toString();
      }
      if (seconds < 10) {
        seconds = "0" + seconds.toString();
      }

      return `${minutes}:${seconds}`;
    },
  },
  watch: {
    volume() {
      this.audio.volume = this.volume / 100;
    },
    selectedSong() {
      this.putSong();
    },
  },
  computed: {
    selectedSong() {
      return this.playlist.find(
        (song) => song.id === this.$store.getters.getSelectedSongId
      );
    },
    queue() {
      return this.$store.getters.getQueue;
    },
    isLiked() {
      return this.$store.getters.getLikedSongsId.includes(this.selectedSong.id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  &:hover {
    .v-icon {
      color: #2196f3 !important;
    }
  }
}

.clickable {
  cursor: pointer;
}
</style>
