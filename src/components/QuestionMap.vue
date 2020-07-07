<template>
  <div class="question-map">
    <div class="question-map__timer">
        30:00
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
          v-for="index in firstRow"
          :key="index">
              {{index}}
          </button>
        </div>
        <div class="question-map__list__row-2">
          <button
          class="btn"
          v-for="index in secondRow"
          :key="index">
              {{secondRowNumber(index)}}
          </button>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class QuestionMap extends Vue {
  @Prop({ required: true, default: 1 }) totalQuestions!: number;

  @Prop({ required: true, default: 1 }) questionsAnswered!: any;

  get firstRow() {
    return Math.ceil(this.totalQuestions / 2);
  }

  get secondRow() {
    return Math.round(this.totalQuestions / 2);
  }

  secondRowNumber(index: number) {
    const firstHalf = Math.ceil(this.totalQuestions / 2);
    return firstHalf + index;
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
    &__timer {
      display:flex;
      justify-content: center;
      align-items: center;
      background-color: $primary;
      height: 40px;
      color: white;
      font-weight: bold;
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
        }
      }
    }
  }
</style>
