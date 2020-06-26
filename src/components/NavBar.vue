<template>
  <nav class="navbar">
    <div class="container">
      <button class="btn navbar__nav-btn">
            Volver
        </button>
        <button class="btn navbar__nav-btn">
            Siguiente
        </button>
    </div>
  </nav>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {}
</script>
<style lang="scss">
.navbar{
  background-color: $primary;
  height: 64px;
  &__nav-btn{
    @include btn-outline-white;
  }
}
</style>
