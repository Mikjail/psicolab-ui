<template>
      <div class="verbal">
        <div class="verbal__question-section"
        :id="`question-${currentPage}`">
          <div
          class="verbal__question-section__number"
          :id="`question-number-${currentPage}`">
            PREGUNTA {{currentPage}}/{{totalItems}}
          </div>
          <div class="verbal__question-section__info">
              <img
                id="answer-section-info"
                src="../../assets/info.svg"
                alt="">
                <b-popover
                  custom-class="my-popover-class"
                  target="answer-section-info"
                  triggers="hover"
                  placement="top">
                <template v-slot:title>Seccion de respuestas</template>
                <p>Dale click a la opción correcta!</p>
                </b-popover>
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
                    :disabled="!testStarted"
                    v-model="questionSelected[currentQuestion.id]"
                    :value="`${currentQuestion.id}_${option.id}`"
                    :id="`${currentQuestion.id}_${option.id}`"
                    type="radio"
                    @change="onChange"
                    @click="onCheck(currentQuestion.id)"/>
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
  Vue, Prop, Component,
} from 'vue-property-decorator';
import { VerbalReasoningDetail } from '@/views/VerbalReasoning/VerbalReasoningTest.vue';

@Component
export default class VerbalTest extends Vue {
  @Prop({ required: true }) currentQuestion!: VerbalReasoningDetail;

  @Prop({ required: true, default: 1 }) currentPage!: number;

  @Prop({ required: true, default: 1 }) totalItems!: number;

  @Prop({ required: true, default: false }) testStarted!: boolean;

  questionSelected: any = {};

  prevSelection: any = {}

  onChange() {
    this.$set(this.prevSelection,
      this.currentQuestion.id,
      this.questionSelected[this.currentQuestion.id]);
    this.$emit('questionAsnwered', this.questionSelected);
  }

  onCheck(questionId: string) {
    if (this.prevSelection[questionId] &&
    this.questionSelected[questionId] &&
    this.prevSelection[questionId] === this.questionSelected[questionId]) {
      this.$nextTick(() => {
        this.$set(this.questionSelected, questionId, false);
        this.$emit('questionAsnwered', this.questionSelected);
      });
    } else {
      this.$nextTick(() => {
        this.$set(this.prevSelection, questionId, this.questionSelected[questionId]);
      });
    }
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
      &__info{
        text-align: right;
        margin-top: 50px;
        margin-bottom: 20px;
      }
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
