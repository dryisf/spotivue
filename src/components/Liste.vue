<template>
  <div>
    <header>
      <slot name="header">
        <h1>Liste des prénoms</h1>
      </slot>
    </header>

    <v-card class="mx-auto" max-width="400" tile>
      <v-list>
        <v-list-item v-for="(prenom, index) in filterPrenoms" :key="index">
          <Item @increase="increase" :title="prenom" />
        </v-list-item>
      </v-list>
    </v-card>
    <p>Nb de click: {{ nbClick }}</p>
  </div>
</template>

<script>
import Item from "./Item";
export default {
  name: "Liste",
  props: {
    filterPrenoms: Array,
  },
  data: function() {
    return {
      nbClick: 0,
    };
  },
  methods: {
    increase(val) {
      this.nbClick += val;
    },
  },
  components: {
    Item,
  },
};
</script>
