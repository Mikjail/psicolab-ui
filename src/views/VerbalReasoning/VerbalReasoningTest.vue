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
                :timeStarted="timeStarted"
                :currentPage="currentPage"
                :totalQuestions="totalQuestions"
                v-on:onChangeQuestion="onChangeQuestion" />
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

  totalPages = 1;

  currentPage = 1;

  pageSize = 10;

  totalAnswers = 0;

  totalQuestions = 0;

  questionsSelected: any = {};

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
