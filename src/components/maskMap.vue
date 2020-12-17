<template>
  <div class="mask-map" id="mask-map"></div>
</template>

<script>
import { mapInit } from '../composition/map';

export default {
  name: 'maskMap',
  setup () {
    mapInit();
  }
};
</script>


<style lang="scss">
.popup-name {
  font-size: 1.25rem;
}
</style>
