<template>
  <nav class="navbar fixed-top">
     <div class="container">
       <div class="d-flex justify-content-center w-100">
          <div class="navbar__progress col-12 col-xl-9 col-lg-9">
              <div class="navbar__progress__bar">
                <b-progress
                  :value="totalProgress"
                  class="w-100"> </b-progress>
                  <div class="navbar__progress__info">
                    <p
                      id="dropdown-list"
                      class="navbar__progress__info__status"
                      href="javascript:void(0)">
                      {{totalAnswers}} de {{totalQuestions}} preguntas respondidas
                    </p>
                    <img
                      id="status-progress-info"
                      src="../../assets/info-white.svg"
                      alt="">
                    <b-popover
                      custom-class="status-progress-info"
                      target="status-progress-info"
                      triggers="hover"
                      placement="bottom">
                        <template v-slot:title>
                          Barra de progreso
                        </template>
                        <p>Te indica la cantidad de preguntas respondidas.</p>
                    </b-popover>
                  </div>
              </div>
          </div>
       </div>
    </div>
    <div class="navbar__finish-btn">
         <button
          :disabled="!testStarted"
          @click="onFinishTest"
          class="btn white-outline-btn">
            Finalizar Test
         </button>
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

  @Prop({ required: true, default: false }) testStarted!: boolean;

  get totalProgress() {
    return (this.totalAnswers / this.totalQuestions) * 100;
  }

  onFinishTest() {
    this.$emit('onFinishTest');
  }
}
</script>
<style lang="scss">
.navbar{
  background-color: $primary;
  height: 72px;
  &__finish-btn{
    width: 130px !important;
    position: absolute;
    right: 10%;
  }
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
    &__info {
      display: flex;
       &__status {
        display:block;
        margin-bottom:0;
        color: white;
        font-weight: bold;
        margin-top: 4px;
      }
      img{
        width: 20px;
        margin-left: 10px;
        padding-top: 5px;
      }
    }
  }
}

.status-progress-info{
  h3{
    background-color: $light-gray;
  }
}
@media only screen and(max-width: 1500px) {
  .navbar{
    &__finish-btn{
      right: 12px;
    }
  }
}
</style>
