<template>
  <div class="verbal-reasoning">
      <div class="verbal-reasoning__intro"
        v-if="viewMode === viewType.INTRO">
        <VerbalReasoningIntro v-on:onViewChanged="onViewChanged" />
      </div>
      <VerbalReasoningTest   v-if="viewMode === viewType.TEST"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import VerbalReasoningTest from './VerbalReasoningTest.vue';
import VerbalReasoningIntro from './VerbalReasoningIntro.vue';

export enum ViewMode {
  INTRO = 'intro',
  TEST = 'test',
  SUMMARY = 'summary'
}

@Component({ components: { VerbalReasoningTest, VerbalReasoningIntro } })
export default class VerbalReasoning extends Vue {
  viewType = ViewMode;

  viewMode = this.viewType.INTRO;

  onViewChanged(view: ViewMode) {
    this.viewMode = view;
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
