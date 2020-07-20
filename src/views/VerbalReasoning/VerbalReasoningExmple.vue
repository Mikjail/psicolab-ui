<template>
  <div class="vr-example">
      <div class="vr-example__shadow">
        <div class="container">
          <div class="vr-example__shadow__panel-instruction"
            :class="`step-${step}`">
              <InstructionContent v-if="step === 1">
                <p>
                <strong>Barra de progreso: </strong>
                Te indica la cantidad de preguntas respondidas.
                </p>
              </InstructionContent>
              <InstructionContent v-if="step === 2">
                <p >
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
                    <span class="step-2__btn-answered">n</span>
                    <strong>Pregunta respondida</strong>
                  </li>
                  <li>
                    <span>n</span>
                    <strong>Pregunta no respondida</strong>
                  </li>
                </ul>
              </InstructionContent>
              <InstructionContent v-if="step === 3">
                  <p>
                    <strong>Siguiente:</strong>
                    Boton para navegar a la siguiente pregunta
                  </p>
              </InstructionContent>
              <InstructionContent v-if="step === 4">
                  <p>
                    <strong>Volver:</strong>
                    Boton para navegar a la pregunta anterior
                  </p>
              </InstructionContent>
              <InstructionContent v-if="step === 5">
                  <p>
                    <strong>Seccion de pregunta:</strong>
                    Todas las preguntas están ubicadas en esta sección.
                  </p>
              </InstructionContent>
              <InstructionContent v-if="step === 6">
                <p>
                  <strong>Seccion de respuesta:</strong>
                  Tendras 5 respuestas, tendrás la posibilidad de seleccionar
                  1.
                </p>
                <p>
                  Con un click tienes la posibiilidad
                  de marcar la respuesta que consideras correcta
                </p>
              </InstructionContent>
            </div>
        </div>
      </div>
      <VerbalReasoningTest
        v-if="testData.length > 0"
        :timeStarted= "timeStarted"
        :testData = "testData"
      />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import InstructionContent from '@/components/VerbalReasoning/InstructionContent.vue';
import VerbalReasoningTest, { VerbalReasoningDetail } from './VerbalReasoningTest.vue';

@Component({
  components: { VerbalReasoningTest, InstructionContent },
})
export default class VerbalReasoningExample extends Vue {
  @Prop({ required: true, default: [] }) testData!: Array<VerbalReasoningDetail>;

  timeStarted=false;

  step = 6;

  mounted() {
    this.onChangeStep();
  }

  onChangeStep() {
    const navBar = (document.getElementsByClassName('navbar')[0]) as HTMLElement;
    const questionMap = (document.getElementsByClassName('question-map')[0]) as HTMLElement;
    const footerNav = (document.getElementsByClassName('footer-nav')[0]) as HTMLElement;
    const questionSection = (document
      .getElementsByClassName('verbal__question-section__question-answer__question')[0]) as HTMLElement;
    const answerSection = (document
      .getElementsByClassName('verbal__question-section__question-answer__answer')[0]) as HTMLElement;

    switch (this.step) {
      case 1:
        questionMap.style.zIndex = '999';
        navBar.style.zIndex = '1000';
        break;
      case 2:
        navBar.style.zIndex = '999';
        questionMap.style.zIndex = '1001';
        break;
      case 3:
      case 4:
        navBar.style.zIndex = '999';
        footerNav.style.zIndex = '1001';
        break;
      case 5:
        navBar.style.zIndex = '999';
        questionSection.style.zIndex = '1001';
        break;
      case 6:
        navBar.style.zIndex = '999';
        answerSection.style.zIndex = '1001';
        break;
      default:
        VerbalReasoningExample.revertIndex([navBar, questionMap, footerNav]);
    }
  }

  static revertIndex(elements: Array<HTMLElement>) {
    elements.forEach((elem: HTMLElement) => {
      let { zIndex } = elem.style;
      zIndex = '999';
    });
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
      &.step-1{
        margin-top: 8%;
      }
      &.step-2{
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
      &.step-3{
        top: 700px;
        float: right;
        right: 140px;
      }
      &.step-4{
        top: 700px;
        bottom: -10px;
        float: left;
        left: 140px;
        button{
          top: 4px;
        }
      }
      &.step-5{
        top: 100px;
        bottom: -10px;
        left: -130px;
      }
      &.step-6{
        top: 100px;
        bottom: -10px;
        right: -280px;
        height: auto;
        padding-bottom: 25px;
      }
    }
  }

}
</style>
