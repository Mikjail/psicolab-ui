<template>
  <div class="verbal-reasoning">
      <router-view
      :testExampleCompleted="testExampleCompleted"
      @onTestExampleCompleted="onTestExampleCompleted">
      </router-view>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ComponentTour from '@/components/VerbalReasoning/ComponentTour.vue';
import VerbalReasoningTest from './VerbalReasoningTest.vue';
import VerbalReasoningIntro from './VerbalReasoningIntro.vue';

export enum ViewMode {
  INTRO = 'intro',
  EXAMPLE = 'example-test',
  TEST = 'test',
  SUMMARY = 'summary'
}

@Component({ components: { VerbalReasoningTest, VerbalReasoningIntro, ComponentTour } })
export default class VerbalReasoning extends Vue {
  testExampleCompleted=false;

  created() {
    const testExample = localStorage.getItem('testExample');
    this.testExampleCompleted = testExample === 'completed';
  }

  onTestExampleCompleted() {
    localStorage.setItem('testExample', 'completed');
    this.testExampleCompleted = true;
  }
}

</script>
<style lang="scss">
.verbal-reasoning{
  height: 100%;
    .verbal-reasoning-intro__main{
      display:flex;
      align-items: center;
      height: 100%;
    }
}
</style>
