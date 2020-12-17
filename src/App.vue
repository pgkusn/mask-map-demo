<template>
  <div id="app">
    <aside-menu />
    <mask-map />
    <light-box />
  </div>
</template>

<script>
import asideMenu from './components/asideMenu.vue';
import maskMap from './components/maskMap.vue';
import lightBox from './components/lightbox.vue';

import {
  fetchLocations,
  fetchPharmacies
} from './composition/store';

export default {
  name: 'App',
  components: {
    asideMenu,
    maskMap,
    lightBox,
  },
  setup () {
    fetchLocations();
    fetchPharmacies();
  }
};
</script>

<style lang="scss" src="./style/app.scss"></style>
