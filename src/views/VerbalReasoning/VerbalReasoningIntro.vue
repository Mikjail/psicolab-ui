<template>
<div class="main">
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
                <p><strong>Duraction:</strong> 30min.</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="verbal-reasoning-intro__test">
          <div class="verbal-reasoning-intro__test__example-title">
              Una vez termines la prueba ejemplo, puedes empezar el test!
          </div>
          <router-link
            :disabled="testExampleCompleted"
            class="btn verbal-reasoning-intro__test__example-btn"
            to="/verbal-reasoning/example-test">
            Ejemplo
          </router-link>
          <b-button
            :disabled="!testExampleCompleted"
            class="btn verbal-reasoning-intro__test__test-btn btn-primary"
            @click="showModal = !showModal">
            Comenzar Test
          </b-button>
        </div>
      </div>
    </div>
  </div>
  <ModalAlert
      :showModal="showModal"
      :modalContent="modalContent"
      v-on:onCancel="showModal=false"
      v-on:onAccept="onStartTest">
       <p class="my-4">
          La prueba tiene una duración de 30 minutos, y no podrá repetirla.
          Por lo tanto, antes de comenzar asegúrese de encontrarse en un lugar tranquilo,
          con buena conexión a internet, y donde pueda concentrarse sin distracciones.
        </p>
  </ModalAlert>
</div>

</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ModalAlert from '@/components/common/ModalAlert.vue';
import { ViewMode } from './index.vue';

@Component({ components: { ModalAlert } })
export default class VerbalReasoning extends Vue {
  @Prop({ required: true, default: false }) testExampleCompleted!: boolean;

  showModal= false;

  viewMode = ViewMode;

   modalContent = {
     title: 'Antes de Comenzar!',
     content: '',
     size: 'lg',
     acceptBtn: 'Comenzar',
     cancelBtn: 'Cancelar',
   }

   onStartTest() {
     this.$router.push({ path: '/verbal-reasoning/test' });
   }
}
</script>
<style lang="scss">
.main {
  height: 100%;
  display:flex;
  align-items: center;
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
        text-align: center;
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
}

</style>
