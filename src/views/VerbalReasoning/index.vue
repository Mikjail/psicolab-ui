<template>
  <div class="verbal-reasoning">
      <div class="verbal-reasoning__intro"
        v-if="viewMode === viewType.INTRO">
        <VerbalReasoningIntro v-on:onViewChanged="onViewChanged" />
      </div>
      <VerbalReasoningTest
      v-if="viewMode === viewType.TEST &&
      testData.length > 0"
      :testData="testData"/>

      <VerbalReasoningExample  v-if="viewMode === viewType.EXAMPLE_TEST &&
      testData.length > 0"
      :testData="testData" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import VerbalReasoningTest, { VerbalReasoningDetail } from './VerbalReasoningTest.vue';
import VerbalReasoningIntro from './VerbalReasoningIntro.vue';
import VerbalReasoningExample from './VerbalReasoningExmple.vue';

import testData from '../../assets/data/verbal-reasoning.json';
import exampleData from '../../assets/data/example-test.json';

export enum ViewMode {
  INTRO = 'intro',
  EXAMPLE_TEST = 'example_text',
  TEST = 'test',
  SUMMARY = 'summary'
}

@Component({ components: { VerbalReasoningTest, VerbalReasoningIntro, VerbalReasoningExample } })
export default class VerbalReasoning extends Vue {
  testData: Array<VerbalReasoningDetail> = [];

  viewType = ViewMode;

  viewMode = this.viewType.INTRO;

  onViewChanged(view: ViewMode) {
    console.log(view);
    this.viewMode = view;
  }

  @Watch('viewMode')
  onViewModeChanged() {
    const questions = this.viewType.TEST === this.viewMode ? testData : exampleData;
    console.log(questions);
    this.setTestData(questions);
  }

  setTestData(vrReasonigQuestions: Array<VerbalReasoningDetail>) {
    this.testData = vrReasonigQuestions.map((question: VerbalReasoningDetail) => {
      const newData = question;
      newData.alternatives = question.alternatives.map((alt: any) => ({
        answer: alt.answer.split('-'),
        id: alt.id,
      }));
      return newData;
    });
  }
}

</script>
<style lang="scss">
.verbal-reasoning{
  height: 100%;
    &__intro{
      display:flex;
      align-items: center;
      height: 100%;
    }
}
</style>
