<template>
  <nav class="navbar fixed-top">
     <div class="container">
       <div class="d-flex justify-content-center w-100">
          <div class="navbar__progress col-12 col-xl-9">
              <div class="navbar__progress__bar">
                <b-progress
                  :value="totalProgress"
                  class="w-100"> </b-progress>
                  <p
                  id="dropdown-list"
                  class="navbar__progress__status"
                  href="javascript:void(0)">
                    {{totalAnswers}} de {{totalQuestions}} preguntas respondidas
                  </p>
              </div>
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
  @Prop({ required: true, default: 0 }) totalQuestions!: number;

  @Prop({ required: true, default: 0 }) totalAnswers!: number;

  // deadline!: Date;

  // currentTime = 0;

  // questionDropdown = false;

  // created() {
  //   document.addEventListener('click', this.onDocumentClick);
  // }

  // mounted() {
  //   const time = new Date();
  //   this.deadline = new Date();
  //   this.deadline.setTime(time.getTime() + (30 * 60 * 1000));
  //   this.countDown();
  // }

  // get seconds() {
  //   return Math.floor((this.currentTime / 1000) % 60);
  // }

  // get minutes() {
  //   return Math.floor((this.currentTime / 1000 / 60) % 60);
  // }

  get totalProgress() {
    return (this.totalAnswers / this.totalQuestions) * 100;
  }

  // onNavigateTo(index: number) {
  //   let page = 1;
  //   if (index < 10) {
  //     page = 1;
  //   } else if (index % 10 === 0) {
  //     page = index / 10;
  //   } else {
  //     page = Math.ceil(index / 10);
  //   }
  //   this.$emit('onChangeQuestion', { question: index, page });
  // }

  // countDown() {
  //   this.currentTime = this.deadline.getTime() - new Date().getTime();
  //   if (this.currentTime > 0) {
  //     setTimeout(this.countDown, 1000);
  //   } else {
  //     alert('Su tiempo ha finalizado');
  //     this.currentTime = 0;
  //   }
  // }
}
</script>
<style lang="scss">
.navbar{
  background-color: $primary;
  height: 72px;
  &__progress {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 56px;
    &__bar{
      display: block;
      width: 100%;
      height: auto;
    }
    &__status {
      display:block;
      margin-bottom:0;
      color: white;
      font-weight: bold;
      margin-top: 4px;
      &:after{
        content: "";
        display: inline-block;
        width: 12px;
        height: 12px;
        top: 2px;
        position: relative;
      }
    }
  }
}
</style>
