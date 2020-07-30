<template>
  <div class="verbal-reasoning-test"
  :class="{'test-example': viewMode == viewType.EXAMPLE}">
     <ComponentTour
      v-if="viewMode === viewType.EXAMPLE &&
      testData.length > 0 &&
      !testStarted"
      :testData="testData"
      v-on:onStartTest="onStartTest" />
    <NavBar
      :totalQuestions="totalQuestions"
      :totalAnswers="totalAnswers"
      :testStarted = "testStarted"
      v-on:onFinishTest="onFinishTest" />
      <div class="container">
        <QuestionMap
          :totalQuestions="totalQuestions"
          :questionsAnswered="questionsSelected"
          :testStarted="testStarted"
          :viewMode="viewMode"
           v-on:onChangeQuestion="onChangeQuestion"
           v-on:onFinishTest="onFinishTest" />
          <div class="row justify-content-center">
            <div class="col-12 col-xl-9 col-lg-9">
              <VerbalTest
              :currentQuestion="currentQuestion"
              :currentPage="currentPage"
              :totalItems="testData.length"
              :testStarted="testStarted"
              v-on:questionAsnwered="questionAsnwered" />
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="footer-nav col-12 col-xl-9 col-lg-9">
              <FooterNav
                :testStarted="testStarted"
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
      <ModalAlert
      :showModal="showFinishModal"
      :modalContent="finishTestModal"
      v-on:onCancel="onCancelModal"
      v-on:onAccept="onAcceptModal">
        <div v-if="timeExpired">
            <p>Usted respondió {{this.totalAnswers}} de {{this.totalQuestions}}</p>
            <p> Muchas gracias por su participación! </p>
        </div>
        <p v-else-if="totalAnswers === totalQuestions">
          ¿Está seguro que quiere finalizar el test?
        </p>
        <p v-else>
          Usted tiene {{this.totalAnswers}} de {{this.totalQuestions}}
          preguntas respondidas. ¿Está seguro que quiere finalizar el test?
        </p>
      </ModalAlert>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import NavBar from '@/components/common/NavBar.vue';
import FooterNav from '@/components/common/FooterNav.vue';
import QuestionMap from '@/components/VerbalReasoning/QuestionMap.vue';
import VerbalTest from '@/components/VerbalReasoning/VerbalTest.vue';
import ModalAlert from '@/components/common/ModalAlert.vue';
import ComponentTour from '@/components/VerbalReasoning/ComponentTour.vue';

import { ViewMode } from './index.vue';

import testData from '../../assets/data/verbal-reasoning.json';
import exampleData from '../../assets/data/example-test.json';

@Component({
  components: {
    NavBar, VerbalTest, FooterNav, QuestionMap, ModalAlert, ComponentTour,
  },
})
export default class VerbalReasoningTest extends Vue {
  testData: Array<VerbalReasoningDetail> = [];

  viewMode = ViewMode.EXAMPLE;

  testStarted = false;

  viewType = ViewMode;

  totalPages = 1;

  currentPage = 1;

  pageSize = 10;

  totalAnswers = 0;

  totalQuestions = 0;

  questionsSelected: any = {};

  showAnswerTip = false;

  isAnswerCorrect = false;

  showFinishModal=false;

  timeExpired = false;

  finishTestModal = {
    title: '',
    content: '',
    size: 'md',
    acceptBtn: 'Aceptar',
    cancelBtn: 'Cancelar',
  }

  beforeMount() {
    const urlPath = this.$route.path.split('/');
    this.viewMode = urlPath[urlPath.length - 1] as ViewMode;
    const questions = this.viewType.TEST === this.viewMode ? testData : exampleData;
    this.setTestData(JSON.parse(JSON.stringify(questions)));
  }

  get currentQuestion() {
    return this.testData[this.currentPage - 1] || {};
  }

  get totalRows() {
    return this.testData.length;
  }

  setTestData(vrReasonigQuestions: Array<VerbalReasoningDetail>) {
    const vrData = vrReasonigQuestions;
    this.testData = vrData.map((question: VerbalReasoningDetail) => {
      const newData = question;
      newData.alternatives = question.alternatives.map((alt: any) => ({
        answer: alt.answer.split('-'),
        id: alt.id,
      }));
      return newData;
    });
    this.totalPages = Math.ceil(this.testData.length / this.pageSize);
    this.totalQuestions = this.testData.length;
    this.testStarted = this.viewMode === this.viewType.TEST;
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
    this.questionAsnwered(this.questionsSelected);
  }

  onStartTest() {
    this.testStarted = true;
  }

  onFinishTest() {
    this.finishTestModal.title = 'Finalizar Test';
    this.showFinishModal = true;
  }

  onEndedTime() {
    this.finishTestModal.title = '¡Tiempo Finalizado!';
    this.showFinishModal = true;
  }

  onCancelModal() {
    this.showFinishModal = false;
  }

  onAcceptModal() {
    this.showFinishModal = false;
    this.$emit('onTestExampleCompleted');
    this.$router.push({ path: '/verbal-reasoning' });
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
      &.test-example{
        padding-top: 120px;
      }
      &__answer-tip {
        border: 2px solid $primary;
        border-radius: 4px;
        padding: 10px;
        background-color: $primary-light-2;
        &.incorrect{
          border-color: $secondary;
          background-color: $secondary-light;
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
