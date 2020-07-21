<template>
  <div class="vr-example">
      <div class="vr-example__shadow">
        <div class="container">
          <div class="vr-example__shadow__panel-instruction"
            :class="`tip-${tip}`">
              <InstructionContent
               :okText="okText"
               v-on:onNextTip="onNextTip">
                <div v-if="tip === 1">
                  <p>
                    <strong>Barra de progreso: </strong>
                    Te indica la cantidad de preguntas respondidas.
                  </p>
                </div>
                <div v-if="tip === 2">
                  <p>
                    <strong>Mapa de preguntas: </strong>
                    Es una herramienta que puedes utilizar para navegar a cualquier pregunta
                    en especifico. También contiene la <strong> duración </strong> restante
                    de la prueba.
                  </p>
                  <p>
                    Como referencia, la pregunta sombreada se refiere a la pregunta respondida:
                  </p>
                  <ul>
                    <li>
                      <span class="tip-2__btn-answered">n</span>
                      <strong>Pregunta respondida</strong>
                    </li>
                    <li>
                      <span>n</span>
                      <strong>Pregunta no respondida</strong>
                    </li>
                  </ul>
                </div>
                <div v-if="tip === 3">
                  <p>
                    <strong>Siguiente:</strong>
                    Boton para navegar a la siguiente pregunta
                  </p>
                </div>
                <div v-if="tip === 4">
                  <p>
                    <strong>Volver:</strong>
                    Boton para navegar a la pregunta anterior
                  </p>
                </div>
                <div v-if="tip === 5">
                  <p>
                    <strong>Seccion de pregunta:</strong>
                    Todas las preguntas están ubicadas en esta sección.
                  </p>
                </div>
                <div v-if="tip === 6">
                  <p>
                    <strong>Seccion de respuesta:</strong>
                    Todas las preguntas están ubicadas en esta sección.
                  </p>
                  <p>
                    Tendras 5 respuestas con la posibilidad de seleccionar
                    1.
                    Con un click tienes marcas la respuesta que consideras correcta
                  </p>
              </div>
              <div v-if="tip === 7">
                  <p>
                    Ahora comencemos con la prueba de ejemplo!
                  </p>
              </div>
              </InstructionContent>
            </div>
        </div>
      </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import InstructionContent from '@/components/VerbalReasoning/InstructionContent.vue';
import { VerbalReasoningDetail } from '@/views/VerbalReasoning/VerbalReasoningTest.vue';

@Component({
  components: { InstructionContent },
})
export default class ComponentTour extends Vue {
  @Prop({ required: true, default: [] }) testData!: Array<VerbalReasoningDetail>;

  timeStarted=false;

  tip = 0;

  okText = 'Ok!';

  mounted() {
    this.onNextTip();
  }

  onNextTip() {
    this.tip += 1;
    const defaultIndex = '999';
    const upperIndex = '10001';
    ComponentTour.customZIndex('navbar', defaultIndex);
    ComponentTour.customZIndex('question-map', defaultIndex);
    ComponentTour.customZIndex('footer-nav', defaultIndex);
    ComponentTour.customZIndex('verbal__question-section__question-answer__question', defaultIndex);
    ComponentTour.customZIndex('verbal__question-section__question-answer__answer', defaultIndex);

    switch (this.tip) {
      case 1:
        ComponentTour.customZIndex('navbar', upperIndex);
        break;
      case 2:
        ComponentTour.customZIndex('question-map', upperIndex);
        break;
      case 3:
      case 4:
        ComponentTour.customZIndex('footer-nav', upperIndex);
        break;
      case 5:
        ComponentTour.customZIndex('verbal__question-section__question-answer__question', upperIndex);
        break;
      case 6:
        ComponentTour.customZIndex('verbal__question-section__question-answer__answer', upperIndex);
        break;
      case 7:
        this.okText = 'Comenzar!';
        break;
      default:
        this.$emit('onStartTest');
        break;
    }
  }

  static customZIndex(className: string, zIndex: string) {
    const element = (document.getElementsByClassName(className)[0]) as HTMLElement;
    element.style.zIndex = zIndex;
  }
}
</script>
<style lang="scss">
.vr-example{
  &__shadow{
    background-color: white;
    background-color: #ffffffdb;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    &__panel-instruction{
      width: 400px;
      height: 100px;
      margin: auto;
      padding: 10px;
      border: 2px solid $secondary;
      border-radius: 4px;
      background-color: white;
      position: relative;
      @include shadow-panel;
      &__okey{
        width: 85px;
        float: right;
        top: -15px;
        position: relative;
      }
      &.tip-1{
        margin-top: 8%;
      }
      &.tip-2{
        height: auto;
        margin-top: 180px;
        padding-bottom: 0;
        right: 10%;
        float: right;
        button{
          right: 5px;
        }
        ul {
          padding-left: 10px;
          li {
            list-style: none;
            display: flex;
            align-items: flex-end;
            margin-bottom: 12px;
            &:first-child{
              span{
                background-color: $primary;
                color: white;
              }
            }
            span{
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 30px;
              height: 30px;
              border: 2px solid $primary;
              border-radius: 4px;
              margin-right: 4px;
            }
          }
        }
      }
      &.tip-3{
        top: 700px;
        float: right;
        right: 140px;
      }
      &.tip-4{
        top: 700px;
        bottom: -10px;
        float: left;
        left: 140px;
        button{
          top: 4px;
        }
      }
      &.tip-5{
        top: 100px;
        bottom: -10px;
        left: -130px;
      }
      &.tip-6{
        top: 60px;
        bottom: -10px;
        right: -280px;
        height: auto;
        padding-bottom: 25px;
      }
      &.tip-7{
        top: 200px;
        display:flex;
        justify-content: center;
        height: 150px;
        div{
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 14px;
          button{
            top: 0px;
            width: 120px;
          }
        }
      }
    }
  }

}
</style>
