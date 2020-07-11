<template>
      <div class="verbal">
        <div class="verbal__question-section"
        :id="`question-${currentPage}`">
          <div
          class="verbal__question-section__number"
          :id="`question-number-${currentPage}`">
            PREGUNTA {{currentPage}}/{{totalItems}}
          </div>
          <div
          v-if="currentQuestion.description"
          class="verbal__question-section__question-answer">
            <div class="verbal__question-section__question-answer__question">
                  <span></span>{{currentQuestion.description}}<span></span>
            </div>
            <div class="verbal__question-section__question-answer__answer">
                <div v-for="option in currentQuestion.alternatives"
                :key="`${currentQuestion.id}__${option.id}`">
                  <input
                    v-model="questionSelected[currentQuestion.id]"
                    :value="`${currentQuestion.id}_${option.id}`"
                    :id="`${currentQuestion.id}_${option.id}`"
                    type="radio"/>
                  <label
                    :for="`${currentQuestion.id}_${option.id}`">
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
import { VerbalReasoningDetail } from '@/views/VerbalReasoning/VerbalReasoningTest.vue';

@Component
export default class VerbalTest extends Vue {
  @Prop({ required: true }) currentQuestion!: Array<VerbalReasoningDetail>;

  @Prop({ required: true, default: 1 }) currentPage!: number;

  @Prop({ required: true, default: 1 }) totalItems!: number;

  questionSelected: any = {};

  @Watch('questionSelected')
  onMssgesChanged() {
    this.questionAnswered();
  }

  questionAnswered() {
    this.$emit('questionAsnwered', this.questionSelected);
  }
}
</script>
<style scoped lang="scss">
.verbal{
  &__pagination{
    margin-top: 30px;
  }
  &__question-section {
    border-bottom: 0.5px solid $primary;
    transition: 1s;
        &.selected{
          @include shadow-panel-secondary;
        }
    &:last-of-type{
      border-bottom: 0;
    }
      &__number{
        color: $secondary;
        font-weight: 500;
        font-size: 18px;
      }
      &__question-answer{
        display:flex;
        justify-content: space-between;
        margin-top: 80px;
        &__question{
          flex-basis: 68%;
        }
        &__answer{
          flex-basis: 32%;
        }
        &__question {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          color: $dark-gray;
          font-size: 18px;
          span{
            position:relative;
            color: $primary;
            top: 8px;
            width: 50px;
            font-weight: 600;
            border-bottom: 2px solid $primary;
            margin: 0 10px;
          }
        }
        &__answer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
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
                justify-content: space-between;
                font-weight: 600;
                width: 270px;
                position: relative;
                padding: 14px 12px;
                margin-bottom: 16px;
                cursor: pointer;
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
