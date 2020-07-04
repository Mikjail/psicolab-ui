<template>
  <div class="verbal-reasoning">
    <NavBar
      v-on:onChangePage="onChangePage"
      v-on:onChangeQuestion="onChangeQuestion"
      :totalPages="totalPages"
      :currentPage="currentPage"
      :totalQuestions="totalQuestions"
      :totalAnswers="totalAnswers"
      :questionAsnwered="questionsSelected" />
    <VerbalTest
      :currentList="currentList"
      :currentPage="currentPage"
      :totalItems="testData.length"
      v-on:questionAsnwered="questionAsnwered" />
    <b-pagination
      class="verbal__pagination"
      align="center"
      :totalRows="totalRows"
      :perPage="pageSize"
      v-model="currentPage" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import VerbalTest from '@/components/VerbalTest.vue';
// eslint-disable-next-line
import testData from '../assets/data/verbal-reasoning.json';

@Component({ components: { NavBar, VerbalTest } })
export default class VerbalReasoning extends Vue {
  testData: Array<VerbalReasoningDetail> = [] ;

  totalPages = 1;

  currentPage = 1;

  pageSize = 10;

  totalAnswers = 0;

  totalQuestions = 0;

  questionsSelected = {};

  mounted() {
    this.testData = testData.map((data: VerbalReasoningDetail) => {
      const newData = data;
      newData.alternatives = data.alternatives.map((alt: any) => ({
        answer: alt.answer.split('-'),
        id: alt.id,
      }));
      return newData;
    });
    this.totalPages = Math.ceil(this.testData.length / this.pageSize);
    this.totalQuestions = this.testData.length;
  }

  get currentList() {
    const items = this.testData;
    return items.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize,
    );
  }

  get totalRows() {
    return this.testData.length;
  }

  questionAsnwered(questionSelected: any) {
    this.questionsSelected = questionSelected;
    this.totalAnswers = Object.keys(questionSelected).length;
  }

  onChangeQuestion(navigateTo: { page: number; question: number}) {
    const time = navigateTo.page !== this.currentPage ? 200 : 0;
    setTimeout(() => {
      VerbalReasoning.scrollToView(navigateTo.question);
      VerbalReasoning.toggleShadow(navigateTo.question);
    }, time);
    this.currentPage = navigateTo.page;
  }

  onChangePage(page: number) {
    this.currentPage = page;
  }

  static scrollToView(questionNumber: number) {
    const element = document.getElementById(`question-${questionNumber}`);
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  static toggleShadow(questionNumber: number) {
    // const element = document.getElementById(`question-number-${questionNumber}`);
    const element = document.getElementById(`question-${questionNumber}`);
    if (element) element.classList.add('selected');
    setTimeout(() => {
      if (element) element.classList.remove('selected');
    }, 1000);
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
  .verbal-reasoning{
      margin-top: 65px;
  }
</style>
