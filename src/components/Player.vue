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
            @click="
              goToArtistDetails(selectedSong.artist && selectedSong.artist.id)
            "
            >{{ selectedSong.title }}</span
          >
          <span
            class="float-right"
            @click="selectedSong.isLiked = !selectedSong.isLiked"
            style="cursor: pointer"
            ><v-icon>{{
              `mdi-${selectedSong.isLiked ? "heart" : "heart-outline"}`
            }}</v-icon></span
          >
        </h2>
        <p
          @click="
            goToArtistDetails(selectedSong.artist && selectedSong.artist.id)
          "
        >
          {{ selectedSong.artist && selectedSong.artist.name }}
        </p>
      </div>
      <audio id="audio" @timeupdate="setProgress"></audio>
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
      <div class="d-flex my-5 volume">
        <v-icon color="white">mdi-volume-low</v-icon>
        <v-slider
          class="mt-5"
          width="500"
          v-model="volume"
          @change="setVolume"
        ></v-slider>
        <v-icon color="white">mdi-volume-high</v-icon>
      </div>
    </div>
  </v-card>
</template>

<script>
import { playlist } from "../assets/js/playlist";
export default {
  props: {
    selectedSongId: Number,
    queuedSongId: Number,
  },
  data: () => ({
    queue: [],
    progress: 0,
    selectedSong: {},
    actionIcon: "",
    audio: null,
    onRepeatOnce: false,
    onShuffle: false,
    currentTime: "",
    duration: "",
    volume: 100,
    playlist,
  }),
  methods: {
    goToArtistDetails(artistId) {
      this.$router.push({ name: "ArtistDetails", params: { artistId } });
    },
    setCurrentTime() {
      this.audio.currentTime = (this.progress / 100) * this.audio.duration;
    },
    setVolume() {
      this.audio.volume = this.volume / 100;
    },
    togglePlay() {
      this.audio.paused ? this.audio.play() : this.audio.pause();
      this.setIcon();
    },
    next() {
      let nextSong;

      if (this.queue.length !== 0) {
        nextSong = this.queue[0];
        this.queue.shift();
      } else if (this.onShuffle) {
        const randomId = this.generateRandomId();
        nextSong = this.playlist.find((song) => song.id === randomId);
      } else
        nextSong = this.playlist.find(
          (song) => song.id === this.selectedSong.id + 1
        );

      if (nextSong) {
        this.selectedSong = nextSong;
        this.putSong();
      }
    },
    previous() {
      const previousSong = this.playlist.find(
        (song) => song.id === this.selectedSong.id - 1
      );

      if (this.audio.currentTime > 10 || this.selectedSong.id === 0)
        this.repeatSong();
      else if (previousSong) {
        this.selectedSong = previousSong;
        this.putSong();
      }
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
      this.selectedSong = this.playlist[0];
      this.putSong();

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
      else return this.generateRandomId();
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
    selectedSong() {
      this.$emit("selectedSongId", this.selectedSong.id);
    },
    selectedSongId() {
      this.selectedSong = this.playlist.find(
        (song) => song.id === this.selectedSongId
      );
      this.putSong();
    },
    queuedSongId() {
      const queuedSong = this.playlist.find(
        (song) => song.id === this.queuedSongId
      );
      this.queue.push(queuedSong);
      console.log("added to queue :", queuedSong.title);
      console.log("queue : ", this.queue);
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
</style>
