<template>
  <div id="app">
    <v-app>
      <v-main>
        <div id="nav">
          <router-link to="/home">Player</router-link> |
          <router-link to="/artists">Artists</router-link>
        </div>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: #353b48;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #fff;
    text-decoration: none;

    &:hover {
      color: #7f8fa6;
    }

    &.router-link-active {
      color: #2196f3;
    }
  }
}
</style>
