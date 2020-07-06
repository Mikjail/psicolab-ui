<template>
  <div class="verbal-reasoning">
    <NavBar
      :totalQuestions="totalQuestions"
      :totalAnswers="totalAnswers" />
      <VerbalTest
      :currentQuestion="currentQuestion"
      :currentPage="currentPage"
      :totalItems="testData.length"
      v-on:questionAsnwered="questionAsnwered" />
      <FooterNav
        :currentPage="currentPage"
        :totalQuestions="totalQuestions"
        v-on:onChangePage="onChangePage" />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import VerbalTest from '@/components/VerbalTest.vue';
import FooterNav from '@/components/FooterNav.vue';
// eslint-disable-next-line
import testData from '../assets/data/verbal-reasoning.json';

@Component({ components: { NavBar, VerbalTest, FooterNav } })
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

  get currentQuestion() {
    return this.testData[this.currentPage - 1] || {};
  }

  get totalRows() {
    return this.testData.length;
  }

  questionAsnwered(questionSelected: any) {
    this.questionsSelected = questionSelected;
    this.totalAnswers = Object.keys(questionSelected).length;
  }

  onChangePage(page: number) {
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
  .verbal-reasoning{
      padding-top: 180px;
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
