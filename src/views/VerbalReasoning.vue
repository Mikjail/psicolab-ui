<template>
  <div class="verbal-reasoning">
    <NavBar
      v-on:onChangePage="onChangePage"
      :totalPages="totalPages"
      :currentPage="currentPage" />
    <VerbalTest :currentList="currentList"
      :currentPage="currentPage"
      :totalItems="testData.length" />
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
  }

  onChangePage(page: number) {
    this.currentPage = page;
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
