<template>
  <div class="question-map">
    <div class="question-map__timer">
        <img
        id="question-map-info"
        src="../../assets/info-white.svg"
        alt="">
         <b-popover
            custom-class="my-popover-class"
            target="question-map-info"
            triggers="hover"
            placement="left">
          <template v-slot:title>Mapa de preguntas</template>
          <p>
            Es una herramienta que puedes utilizar para navegar a cualquier pregunta
            en especifico. También contiene la <strong> duración </strong> restante
            de la prueba.
          </p>
          <p>
            Como referencia, la pregunta sombreada se refiere a la pregunta respondida:
          </p>
          <ul>
            <li>
                <span class="tip-2__btn-answered">n</span>
                <strong>Pregunta respondida</strong>
            </li>
            <li>
                <span>n</span>
              <strong>Pregunta no respondida</strong>
            </li>
        </ul>
        </b-popover>
        <span class="question-map__timer__time"
          v-if="testStarted && viewMode === viewType.TEST">
          {{minutes}}:{{seconds}}
        </span>
        <span class="question-map__timer__time"
          v-if="!testStarted || viewMode === viewType.EXAMPLE">
            -- : --
        </span>
        <span class="question-map__timer__icon"></span>
      </div>
      <div class="question-map__title">
        <span>
          Preguntas
        </span>
      </div>
      <div class="question-map__list"
        v-if="viewMode === viewType.EXAMPLE">
          <div class="question-map__list__row-example">
             <button
             :disabled="!testStarted"
              class="btn"
              :class="{ answered : questionsAnswered[index]}"
              @click="onNavigateTo(index)"
              v-for="index in totalQuestions"
              :key="index">
                  {{index}}
              </button>
          </div>
      </div>
      <div class="question-map__list"
        v-if="viewMode === viewType.TEST">
        <div class="question-map__list__row-1">
          <button
          :disabled="!testStarted"
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
          :disabled="!testStarted"
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
import { ViewMode } from '@/views/VerbalReasoning/index.vue';

@Component
export default class QuestionMap extends Vue {
  @Prop({ required: true, default: 1 }) totalQuestions!: number;

  @Prop({ required: true, default: 1 }) questionsAnswered!: {[key: string]: string};

  @Prop({ required: false, default: false }) testStarted!: boolean;

  @Prop({ required: true, default: '' }) viewMode!: ViewMode;

  viewType = ViewMode;

  deadline!: Date;

  currentTime = 0;

  mounted() {
    if (this.testStarted && this.viewMode !== this.viewType.EXAMPLE) {
      this.initTimeAndCountDown();
    }
  }

  get firstRow() {
    return Math.ceil(this.totalQuestions / 2);
  }

  get secondRow() {
    return Math.floor(this.totalQuestions / 2);
  }

  get seconds() {
    const time = Math.floor((this.currentTime / 1000) % 60);
    return time < 10 ? `0${time}` : time;
  }

  get minutes() {
    const time = Math.floor((this.currentTime / 1000 / 60) % 60);
    return time < 10 ? `0${time}` : time;
  }

  @Watch('testStarted')
  ontestStarted() {
    if (this.testStarted && this.viewMode !== this.viewType.EXAMPLE) {
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
      this.currentTime = 0;
      this.$emit('onFinishTest', true);
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
    width: 130px;
    height: 400px;
    border-radius: 4px;
    position: absolute;
    right: 10%;
    background-color: white;
    z-index:900;
    &__timer {
      display:flex;
      justify-content: space-between;
      align-items: center;
      background-color: $primary;
      height: 40px;
      color: white;
      font-weight: bold;
      padding: 0 10px;
      &__icon{
        background: url('../../assets/watch.svg') no-repeat;
        height: 30px;
        width: 30px;
        position: relative;
      }
      img{
        width: 20px;
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
      }
      &__row-1,
      &__row-2,
      &__row-example {
        button{
          @include btn-outline-primary;
          min-width: 10px !important;
          margin-bottom: 10px;
          padding: 0 !important;
          min-height: 30px;
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
      &__row-example {
        width: 70px;
        button{
          display: inline-block;
          margin-right: 10px;
          &:nth-child(even){
            margin-right: 0;
          }
        }
      }
    }
  }
  .my-popover-class{
    h3{
      background-color: $light-gray;
    }
    ul {
        padding-left: 10px;
        li {
          list-style: none;
          display: flex;
          align-items: flex-end;
          margin-bottom: 12px;
          &:first-child{
            span{
              background-color: $primary;
              color: white;
            }
          }
          span{
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border: 2px solid $primary;
            border-radius: 4px;
            margin-right: 4px;
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
