<template>
  <div id="app">
    <aside-menu />
    <div class="mask-map" id="mask-map"></div>

  </div>
</template>

<script>
import asideMenu from './components/asideMenu.vue';

export default {
  name: 'App',
  components: {
    asideMenu,
  },
};
</script>

<style lang="scss" src="./style.scss"></style>
