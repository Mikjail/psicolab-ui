<template>
  <nav class="navbar fixed-top">
    <div class="container">
      <div class="navbar__nav-btn">
        <button class="btn navbar__nav-btn__back"
        @click="onBack"
        v-if="currentPage > 1">
          Volver
      </button>
      <button class="btn navbar__nav-btn__next"
          v-if="currentPage < totalPages"
          @click="onNext">
          Siguiente
      </button>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  @Prop({ required: true, default: 1 }) currentPage!: number;

  @Prop({ required: true, default: 1 }) totalPages!: number;

  onNext() {
    this.$emit('onChangePage', this.currentPage + 1);
  }

  onBack() {
    this.$emit('onChangePage', this.currentPage - 1);
  }
}
</script>
<style lang="scss">
.navbar{
  background-color: $primary;
  height: 64px;
  .container{
    position: relative;
  }
  &__nav-btn{
    position: absolute;
    top: -12px;
    left: 0;
    right: 0;
    bottom: 0;
    &__back,
    &__next{
       @include btn-outline-white;
    }
    &__back {
      float:left;
    }
    &__next{
      float:right;
    }
  }
}
</style>
