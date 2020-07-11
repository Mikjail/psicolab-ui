<template>
  <div class="verbal-reasoning-test">
    <NavBar
      :totalQuestions="totalQuestions"
      :totalAnswers="totalAnswers" />
      <div class="container">
        <QuestionMap
          :totalQuestions="totalQuestions"
          :questionsAnswered="questionsSelected"
           v-on:onChangeQuestion="onChangeQuestion"  />
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
            <div class="col-12 col-xl-9 col-lg-9">
              <FooterNav
                :currentPage="currentPage"
                :totalQuestions="totalQuestions"
                v-on:onChangeQuestion="onChangeQuestion" />
            </div>
          </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/common/NavBar.vue';
import FooterNav from '@/components/common/FooterNav.vue';
import QuestionMap from '@/components/VerbalReasoning/QuestionMap.vue';
import VerbalTest from '@/components/VerbalReasoning/VerbalTest.vue';
// eslint-disable-next-line
import testData from '../../assets/data/verbal-reasoning.json';

@Component({
  components: {
    NavBar, VerbalTest, FooterNav, QuestionMap,
  },
})
export default class VerbalReasoningTest extends Vue {
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

  onChangeQuestion(page: number) {
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
