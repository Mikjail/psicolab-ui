<template>
  <div class="verbal-reasoning-test">
    <NavBar
      :totalQuestions="totalQuestions"
      :totalAnswers="totalAnswers" />
      <div class="container">
        <QuestionMap
          :totalQuestions="totalQuestions"
          :questionsAnswered="questionsSelected"
          :timeStarted="timeStarted"
          :viewMode="viewMode"
           v-on:onChangeQuestion="onChangeQuestion"/>
          <div class="row justify-content-center">
            <div class="col-12 col-xl-9 col-lg-9">
              <VerbalTest
              :currentQuestion="currentQuestion"
              :currentPage="currentPage"
              :totalItems="testData.length"
              v-on:questionAsnwered="questionAsnwered" />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="footer-nav col-12 col-xl-9 col-lg-9">
              <FooterNav
                :timeStarted="isNavEnable"
                :currentPage="currentPage"
                :totalQuestions="totalQuestions"
                v-on:onChangeQuestion="onChangeQuestion" />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="mt-4 col-12 col-xl-9 col-lg-9">
              <div
                v-if="viewMode === viewType.EXAMPLE && showAnswerTip"
                class="verbal-reasoning-test__answer-tip"
                :class="{'incorrect' : !isAnswerCorrect}">
                <h6
                :class="{'incorrect' : !isAnswerCorrect}"
                >Respuesta {{isAnswerCorrect ? 'Correcta' : 'Incorrecta'}}</h6>
                <p>
                  <strong>La frase bien completada es: </strong>
                  <span
                  class="verbal-reasoning-test__answer-tip__correct-phrase"
                  v-html="testData[currentPage - 1].correct_phrase">
                  </span>
                </p>
                <p
                 class="verbal-reasoning-test__answer-tip__explanation"
                 v-html="testData[currentPage - 1].explanation">
                </p>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import NavBar from '@/components/common/NavBar.vue';
import FooterNav from '@/components/common/FooterNav.vue';
import QuestionMap from '@/components/VerbalReasoning/QuestionMap.vue';
import VerbalTest from '@/components/VerbalReasoning/VerbalTest.vue';
import { ViewMode } from './index.vue';

@Component({
  components: {
    NavBar, VerbalTest, FooterNav, QuestionMap,
  },
})
export default class VerbalReasoningTest extends Vue {
  @Prop({ required: true, default: [] }) testData!: Array<VerbalReasoningDetail>;

  @Prop({ required: true, default: false }) timeStarted!: boolean;

  @Prop({ required: true, default: true })

  @Prop({ required: true, default: 'EXAMPLE' }) viewMode!: ViewMode;

  viewType = ViewMode;

  totalPages = 1;

  currentPage = 1;

  pageSize = 10;

  totalAnswers = 0;

  totalQuestions = 0;

  questionsSelected: any = {};

  showAnswerTip = false;

  isAnswerCorrect = false;

  mounted() {
    this.totalPages = Math.ceil(this.testData.length / this.pageSize);
    this.totalQuestions = this.testData.length;
  }

  get currentQuestion() {
    return this.testData[this.currentPage - 1] || {};
  }

  get totalRows() {
    return this.testData.length;
  }

  get isNavEnable() {
    if (this.viewMode === this.viewType.EXAMPLE) {
      return this.timeStarted && this.isAnswerCorrect;
    }
    return this.timeStarted;
  }

  questionAsnwered(questionSelected: any) {
    this.questionsSelected = questionSelected;
    let totalAns = 0;
    Object.keys(questionSelected)
      .forEach((index: string) => {
        if (questionSelected[index]) {
          totalAns += 1;
        }
      });
    this.totalAnswers = totalAns;
    if (this.viewMode === this.viewType.EXAMPLE) {
      this.showAnswerTip = !!this.questionsSelected[this.currentPage];
      const correctAnswer = this.testData[this.currentPage - 1].correct_answer;
      const currentAnswer = this.questionsSelected[this.currentPage] ? this.questionsSelected[this.currentPage].split('_')[1] : '';
      this.isAnswerCorrect = currentAnswer === correctAnswer;
    }
  }

  onChangeQuestion(page: number) {
    if (this.viewMode === this.viewType.EXAMPLE && !this.questionsSelected[page]) {
      this.isAnswerCorrect = false;
      this.showAnswerTip = false;
    }
    this.currentPage = page;
  }
}

export interface VerbalReasoningDetail {
    id: string;
    points: string;
    category: string;
    description: string;
    alternatives: Array<{id: string; answer: string }>;
    correct_answer: string;
}
</script>
<style lang="scss">
  .verbal-reasoning-test{
      padding-top: 180px;
      &__answer-tip {
        border: 2px solid $primary;
        border-radius: 4px;
        padding: 10px;
        &.incorrect{
          border-color: $secondary;
        }
        h6{
          text-align: center;
          font-weight: bold;
          color: $primary;
          &.incorrect{
            color: $secondary
          }
        }
        &__correct-phrase{
          color: $primary;
          span{
            font-weight: bold;
          }
        }
        &__explanation{
          span{
            color: $primary;
            font-weight: bold;
          }
        }
      }
    &__nav-btns{
      display:flex;
      justify-content: space-between;
      margin-top: 120px;
      button{
        @include btn-primary;
      }
    }
  }
</style>
