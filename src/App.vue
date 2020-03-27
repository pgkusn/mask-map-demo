<template>
  <div id="app">
    <aside-menu />
    <div class="mask-map" id="mask-map"></div>

    <light-box />
  </div>
</template>

<script>
import asideMenu from './components/asideMenu.vue';
import lightBox from './components/lightbox.vue';

export default {
  name: 'App',
  components: {
    asideMenu,
    lightBox,
  },
  mounted() {
    this.$store.dispatch('fetchLocations');
    this.$store.dispatch('fetchPharmacies');
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
