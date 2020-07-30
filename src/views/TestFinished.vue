<template>
  <div class="main">
    <div class="container-fluid test-finished">
      <div class="container">
        <h3 class="test-finished__title">
          Gracias por su participacion! Usted ha terminado el test:
        </h3>
        <div class="test-finished__test">
            <img src="../assets/verbal-reasoning.svg" alt="">
            <h3>Razonamiento Verbal</h3>
        </div>
        <div class="test-finished__back-btn">
          <router-link
            to="/"
            class="btn primary-btn">
              Volver a inicio
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class TestFinished extends Vue {

}
</script>
<style lang="scss">
.main {
  height: 100%;
  display:flex;
  align-items: center;
  .test-finished{
    padding: 56px 0;
    background-color: $light-gray;
    &__title{
      font-weight: 600;
      margin-bottom: 72px;
      text-align: center;
    }
    &__test{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 72px;
      img{
        width: 200px;
      }
      h3{
        margin-top: 20px;
        font-weight: 600;
      }
    }
    &__back-btn{
      margin: auto;
      width: 180px;
    }
  }
}
</style>
