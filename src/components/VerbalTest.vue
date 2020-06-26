<template>
  <div class="container verbal">
    <div class="verbal__question-section"
    v-for="(question, index) in testData" :key="question.id">
      <div class="verbal__question-section__number">
        PREGUNTA {{index+1}}/{{testData.length}}
      </div>
      <div class="verbal__question-section__question-answer">
        <div class="verbal__question-section__question-answer__question">
              <span></span>{{question.description}}<span></span>
        </div>
        <div class="verbal__question-section__question-answer__answer">
            <div v-for="option in question.alternatives" :key="`${question.id}__${option.id}`">
              <input
                v-model="questionSelected[question.id]"
                :value="`${question.id}_${option.id}`"
                :id="`${question.id}_${option.id}`"
                type="radio"/>
              <label
                :for="`${question.id}_${option.id}`">
                {{option.answer[0]}}
                <span></span>
                {{option.answer[1]}}
              </label>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  Vue, Prop, Component, Watch,
} from 'vue-property-decorator';
import { VerbalReasoningDetail } from '../views/VerbalReasoning.vue';

@Component
export default class VerbalTest extends Vue {
  @Prop({ required: true }) testData!: Array<VerbalReasoningDetail>;

  questionSelected: any = {};

  @Watch('testData')
  onMssgesChanged() {
    this.testData.forEach((question) => {
      this.$set(this.questionSelected, question.id, `${question.id}_${question.correct_answer}`);
    });
  }
}
</script>

<style scoped lang="scss">
.verbal{
  &__question-section {
    padding: 20px;
    border-bottom: 0.5px solid $primary;
      &__number{
        color: $secondary;
        font-weight: 500;
      }
      &__question-answer{
        display:flex;
        justify-content: space-between;
        &__question,
        &__answer{
          flex-basis: 50%;
        }
        &__question {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: $dark-gray;
          span{
            position:relative;
            color: $primary;
            top: 8px;
            width: 30px;
            font-weight: 600;
            border-bottom: 2px solid $primary;
          }
        }
        &__answer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
            input[type="radio"] {
              opacity: 0;
              position: fixed;
              width: 0;
              &:checked + label{
                  background-color: $primary;
                  color:white;
                  span{
                      border-bottom: 2px solid white;
                  }

              }
            }
            label{
                @include btn-outline-primary;
                font-weight: 600;
                width: 270px;
                justify-content: space-between;
                position: relative;
                padding: 14px 20px;
                margin-bottom: 16px;
                span{
                  position: absolute;
                  border-bottom: 2px solid $primary;
                  width: 30px;
                  left: 115px;
                }
                &:hover{
                  span{
                    border-bottom: 2px solid white;
                    transition: 0.2s;
                  }
                }
            }
        }
      }
  }
}
</style>
