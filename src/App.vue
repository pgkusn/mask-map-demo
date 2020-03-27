<template>
  <div id="app">
    <aside-menu @triggerMarkerPopup="openPopup" ref="menu" />
    <mask-map ref="map" />
    <light-box />
  </div>
</template>

<script>
import asideMenu from './components/asideMenu.vue';
import lightBox from './components/lightbox.vue';
import maskMap from './components/maskMap.vue';

export default {
  name: 'App',
  components: {
    asideMenu,
    lightBox,
    maskMap,
  },
  methods: {
    openPopup(id) {
      this.$refs.map.triggerPopup(id);
    },
  },
  mounted() {
    this.$store.dispatch('fetchLocations');
    this.$store.dispatch('fetchPharmacies');
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
