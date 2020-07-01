<template>
  <nav class="navbar fixed-top">
     <div class="container">
       <div class="d-flex w-100">
         <div class="navbar__nav-btn">
           <button class="btn navbar__nav-btn__back"
            @click="onBack"
            v-if="currentPage > 1">
              Volver
          </button>
        </div>
        <div class="navbar__progress">
            <div class="navbar__progress__bar">
              <b-progress
                :value="totalProgress"
                class="w-100"> </b-progress>
              <p class="navbar__progress__text">
                {{totalAnswers}} de {{totalQuestions}} preguntas respondidas
              </p>
            </div>
        </div>
        <div class="navbar__timer">
          <span class="navbar__timer__time">
            {{minutes | formatTime }} : {{seconds | formatTime }}
          </span>
          <img src="@/assets/watch.svg" alt="watchIcon">
        </div>
        <div class="navbar__nav-btn">
          <button class="btn navbar__nav-btn__next"
              v-if="currentPage < totalPages"
              @click="onNext">
              Siguiente
          </button>
        </div>
       </div>

    </div>
  </nav>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  filters: {
    formatTime(value: number) {
      if (value < 10) {
        return `0${value}`;
      }
      return value;
    },
  },
})
export default class NavBar extends Vue {
  @Prop({ required: true, default: 1 }) currentPage!: number;

  @Prop({ required: true, default: 1 }) totalPages!: number;

  @Prop({ required: true, default: 0 }) totalQuestions!: number;

  @Prop({ required: true, default: 0 }) totalAnswers!: number;

  deadline!: Date;

  currentTime = 0

  mounted() {
    const time = new Date();
    this.deadline = new Date();
    this.deadline.setTime(time.getTime() + (30 * 60 * 1000));
    this.countDown();
  }

  get seconds() {
    return Math.floor((this.currentTime / 1000) % 60);
  }

  get minutes() {
    return Math.floor((this.currentTime / 1000 / 60) % 60);
  }

  get totalProgress() {
    return (this.totalAnswers / this.totalQuestions) * 100;
  }

  onNext() {
    this.$emit('onChangePage', this.currentPage + 1);
  }

  onBack() {
    this.$emit('onChangePage', this.currentPage - 1);
  }

  countDown() {
    this.currentTime = this.deadline.getTime() - new Date().getTime();
    if (this.currentTime > 0) {
      setTimeout(this.countDown, 1000);
    } else {
      alert('Su tiempo ha finalizado');
    }
  }
}
</script>
<style lang="scss">
.navbar{
  background-color: $primary;
  height: 72px;
  &__timer{
    display:flex;
    align-items: center;
    justify-content: flex-end;
    flex-basis: 12%;
    &__time{
      color: white;
      font-weight: bold;
      padding-right: 10px;
    }
  }
  &__progress {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 58%;
    height: 56px;
    &__bar{
      display: block;
      width: 450px;
      height: auto;
    }
    &__text{
      display:block;
      margin-bottom:0;
      color: white;
      font-weight: bold;
      margin-top: 4px;
    }
  }
  &__nav-btn{
    display: flex;
    align-items: center;
    top: 12px;
    flex-basis: 15%;
    &:last-child{
      justify-content: flex-end;
    }
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
