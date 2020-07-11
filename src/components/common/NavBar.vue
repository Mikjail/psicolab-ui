<template>
  <nav class="navbar fixed-top">
     <div class="container">
       <div class="d-flex justify-content-center w-100">
          <div class="navbar__progress col-12 col-xl-9 col-lg-9">
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

  get totalProgress() {
    return (this.totalAnswers / this.totalQuestions) * 100;
  }
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
