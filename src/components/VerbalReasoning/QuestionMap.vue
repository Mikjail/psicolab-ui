<template>
  <div class="question-map">
    <div class="question-map__timer">
        <span class="question-map__timer__time"
          v-if="timeStarted">
          {{minutes}}:{{seconds}}
        </span>
        <span class="question-map__timer__time"
          v-if="!timeStarted">
            -- : --
        </span>
        <span class="question-map__timer__icon"></span>
      </div>
      <div class="question-map__title">
        <span>
          Preguntas
        </span>
      </div>
      <div class="question-map__list">
        <div class="question-map__list__row-1">
          <button
          class="btn"
          :class="{ answered : questionsAnswered[index]}"
          @click="onNavigateTo(index)"
          v-for="index in firstRow"
          :key="index">
              {{index}}
          </button>
        </div>
        <div class="question-map__list__row-2">
          <button
          @click="onNavigateTo(secondRowNumber(index))"
          class="btn"
          :class="{ answered : questionsAnswered[secondRowNumber(index)]}"
          v-for="index in secondRow"
          :key="index">
              {{secondRowNumber(index)}}
          </button>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';

@Component
export default class QuestionMap extends Vue {
  @Prop({ required: true, default: 1 }) totalQuestions!: number;

  @Prop({ required: true, default: 1 }) questionsAnswered!: {[key: string]: string};

  @Prop({ required: false, default: false }) timeStarted!: boolean;

  deadline!: Date;

  currentTime = 0;

  mounted() {
    if (this.timeStarted) {
      this.initTimeAndCountDown();
    }
  }

  get firstRow() {
    return Math.ceil(this.totalQuestions / 2);
  }

  get secondRow() {
    return Math.round(this.totalQuestions / 2);
  }

  get seconds() {
    const time = Math.floor((this.currentTime / 1000) % 60);
    return time < 10 ? `0${time}` : time;
  }

  get minutes() {
    const time = Math.floor((this.currentTime / 1000 / 60) % 60);
    return time < 10 ? `0${time}` : time;
  }

  @Watch('timeStarted')
  onTimeStarted() {
    if (this.timeStarted) {
      this.initTimeAndCountDown();
    }
  }

  initTimeAndCountDown() {
    const time = new Date();
    this.deadline = new Date();
    this.deadline.setTime(time.getTime() + (30 * 60 * 1000));
    this.countDown();
  }

  countDown() {
    this.currentTime = this.deadline.getTime() - new Date().getTime();
    if (this.currentTime > 0) {
      setTimeout(this.countDown, 1000);
    } else {
      alert('Su tiempo ha finalizado');
      this.currentTime = 0;
    }
  }

  secondRowNumber(index: number) {
    const firstHalf = Math.ceil(this.totalQuestions / 2);
    return firstHalf + index;
  }

  onNavigateTo(index: number) {
    this.$emit('onChangeQuestion', index);
  }
}
</script>
<style lang="scss">
  .question-map{
    @include shadow-panel;
    width: 120px;
    height: 400px;
    border-radius: 4px;
    position: absolute;
    right: 10%;
    background-color: white;
    z-index:900;
    &__timer {
      display:flex;
      justify-content: flex-end;
      align-items: center;
      background-color: $primary;
      height: 40px;
      color: white;
      font-weight: bold;
      padding: 0 10px;
      &__time{
        margin-right: 8px;
      }
      &__icon{
        background: url('../../assets/watch.svg') no-repeat;
        height: 30px;
        width: 30px;
        position: relative;
      }
    }
    &__title{
      padding: 10px;
      span {
        position: relative;
        display: block;
        width: 100%;
        text-align: center;
        border-bottom: 2px solid $primary;
        padding-bottom: 5px;
        font-weight: bold;
        color: $dark-gray;
      }
    }
    &__list{
      display: flex;
      justify-content: space-evenly;
      padding: 10px;
      overflow: scroll;
      height: 308px;
      &__row-1,
      &__row-2{
        display:flex;
        flex-direction: column;
        button{
          @include btn-outline-primary;
          min-width: 10px !important;
          margin-bottom: 10px;
          padding: 0 !important;
          width: 30px;
          height: 30px;
          font-size: 14px;
          font-weight: 600;
          &.answered{
            background: $primary;
            color: white;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1500px) {
    .question-map{
      right: 16px;
    }
  }
</style>