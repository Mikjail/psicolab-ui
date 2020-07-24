<template>
  <div class="verbal-reasoning">
      <div class="verbal-reasoning__intro"
        v-if="viewMode === viewType.INTRO">
        <VerbalReasoningIntro v-on:onViewChanged="onViewChanged" />
      </div>

      <ComponentTour
      v-if="viewMode === viewType.EXAMPLE &&
      testData.length > 0 &&
      !timeStarted"
      :testData="testData"
      v-on:onStartTest="onStartTest" />

      <VerbalReasoningTest
      :viewMode="viewMode"
      v-if="testData.length > 0"
      :timeStarted="timeStarted"
      :testData="testData"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import ComponentTour from '@/components/VerbalReasoning/ComponentTour.vue';
import VerbalReasoningTest, { VerbalReasoningDetail } from './VerbalReasoningTest.vue';
import VerbalReasoningIntro from './VerbalReasoningIntro.vue';

import testData from '../../assets/data/verbal-reasoning.json';
import exampleData from '../../assets/data/example-test.json';

export enum ViewMode {
  INTRO = 'intro',
  EXAMPLE = 'example',
  TEST = 'test',
  SUMMARY = 'summary'
}

@Component({ components: { VerbalReasoningTest, VerbalReasoningIntro, ComponentTour } })
export default class VerbalReasoning extends Vue {
  testData: Array<VerbalReasoningDetail> = [];

  viewType = ViewMode;

  viewMode = this.viewType.INTRO;

  timeStarted = false;

  onViewChanged(view: ViewMode) {
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

  onStartTest() {
    this.timeStarted = true;
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
