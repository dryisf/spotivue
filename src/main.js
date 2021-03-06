import Vue from "vue";
import KnobControl from "vue-knob-control";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import "./registerServiceWorker";
import store from "./store";

Vue.config.productionTip = false;
Vue.component("knob-control", KnobControl);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
