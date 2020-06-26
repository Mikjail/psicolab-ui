<template>
  <div class="home">
    <nav-bar> </nav-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// @ is an alias to /src
import NavBar from '@/components/NavBar.vue';

@Component({ components: { NavBar } })
export default class Home extends Vue {

}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
