<template>
  <div class="verbal-reasoning">
    <NavBar />
    <VerbalTest :testData="testData"/>
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

  mounted() {
    this.testData = testData.map((data: VerbalReasoningDetail) => {
      const newData = data;
      newData.alternatives = data.alternatives.map((alt: any) => ({
        answer: alt.answer.split('-'),
        id: alt.id,
      }));
      return newData;
    });
    console.log(this.testData);
    console.log(this.testData.length);
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
