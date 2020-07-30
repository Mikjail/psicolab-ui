<template>
  <div class="footer-nav__nav-btns">
      <button class="footer-nav__nav-btns__back btn"
        :disabled="isFirstPage || !testStarted"
        @click="onBack()">
        Volver
      </button>
      <button class="footer-nav__nav-btns__next btn"
        :disabled="isLastPage || !testStarted"
        @click="onNext()">
        Siguiente
      </button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class FooterNav extends Vue {
  @Prop({ required: true, default: false }) testStarted!: boolean;

  @Prop({ required: true, default: 1 }) currentPage!: number;

  @Prop({ required: true, default: 1 }) totalQuestions!: number;

  get isFirstPage() {
    return this.currentPage === 1;
  }

  get isLastPage() {
    return this.currentPage === this.totalQuestions;
  }

  onNext() {
    this.$emit('onChangeQuestion', this.currentPage + 1);
  }

  onBack() {
    this.$emit('onChangeQuestion', this.currentPage - 1);
  }
}
</script>
<style lang="scss">
  .footer-nav{
    &__nav-btns{
      margin-top: 120px;
      button{
        @include btn-primary;
      }
      &__next{
        float: right;
      }
      &__back{
        float:left;
      }
    }
  }
</style>
