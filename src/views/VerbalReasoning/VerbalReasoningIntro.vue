<template>
<div class="container-fluid verbal-reasoning-intro">
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="verbal-reasoning-intro__title">Razonamiento Verbal</h1>
      <div class="col-12 col-xl-10 verbal-reasoning-intro__text-preview">
        <div class="verbal-reasoning-intro__text-preview__text">
            <p>La siguiente prueba contiene 50 oraciones incompletas (numeradas de la 1 a la 50).
            A cada una de esas oraciones le falta la primera y la última palabra.
            En cada caso usted deberá elegir las dos palabras que completarían las oraciones
            de tal manera que resultarían válidas y coherentes.</p>
            <p>
              Para completar esas oraciones incompletas se le ofrecen 5 parejas de palabras.
            Entre ellas usted deberá seleccionar aquella pareja de palabras que considere
            apropiada para cada una de las oraciones.
            Son apropiadas cuando la primera llena correctamente el vacío del comienzo
            de la oración y
            la segunda palabra del par llena correctamente el vacío del final de la oración.
            Cuando usted haya elegido el par que completa correctamente la oración que examina,
            márquela haciendo click en ella.
            </p>
        </div>
        <div class="verbal-reasoning-intro__text-preview__preview">
              <img src="../../assets/verbal-reasoning.svg" alt="">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="verbal-reasoning-intro__test">
        <div class="verbal-reasoning-intro__test__example-title">
            Una vez termines la prueba ejemplo, puedes empezar el test!
        </div>
        <button
          :class="{disabled : exampleCompleted}"
          class="btn verbal-reasoning-intro__test__example-btn">
          Ejemplo
        </button>
        <b-button
          :class="{disabled : !exampleCompleted}"
          class="btn verbal-reasoning-intro__test__test-btn btn-primary"
          @click="showModal = !showModal">
          Comenzar Test
        </b-button>
      </div>
    </div>
  </div>
  <b-modal
    class="verbal-reasoning-intro__modal"
    v-model="showModal"
    size="lg"
    centered
    title="Antes de Comenzar!">
      <p class="my-4">
        La prueba tiene una duración de 30 minutos, y no podrá repetirla.
        Por lo tanto, antes de comenzar asegúrese de encontrarse en un lugar tranquilo,
        con buena conexión a internet, y donde pueda concentrarse sin distracciones.
      </p>
      <template v-slot:modal-footer>
        <div class="verbal-reasoning-intro__modal__footer w-100">
           <button
            class="btn primary-outline-btn verbal-reasoning-intro__modal__footer__cancel"
            @click="showModal=false">
            Cancelar
          </button>
          <button
            class="btn primary-btn verbal-reasoning-intro__modal__footer__start"
            @click="onStartTest"
          >
            Comenzar
          </button>
        </div>
      </template>
  </b-modal>
</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ViewMode } from './index.vue';

@Component
export default class VerbalReasoning extends Vue {
  exampleCompleted = true;

  showModal= false;

  onStartTest() {
    this.showModal = false;
    this.$emit('onViewChanged', ViewMode.TEST);
  }
}
</script>
<style lang="scss">
.verbal-reasoning-intro{
  padding: 56px 0;
  background-color: $light-gray;
  &__title{
    text-align: center;
    width: 100%;
  }
  &__text-preview{
    display:flex;
    margin-top: 32px;
    &__text{
      padding-right: 40px;
    }
    &__preview{
      img{
        width: 200px;
      }
    }
  }
  &__test{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    width: 100%;
    margin-top: 32px;
    &__example-btn,
    &__test-btn {
      @include btn-primary;
      margin-top: 32px;
    }
  }
  &__modal{
    &__footer{
      display:flex;
      justify-content: flex-end;
      &__cancel,
      &__start {
        height: 34px;
      }
      &__cancel{
        margin-right: 16px;
      }
    }
  }
}
</style>
