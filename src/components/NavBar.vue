<template>
  <nav class="navbar fixed-top">
     <div class="container">
       <div class="d-flex w-100">
         <div class="navbar__nav-btn">
           <button class="btn navbar__nav-btn__back"
            @click="onBack"
            v-if="currentPage > 1">
              Volver
          </button>
        </div>
        <div class="navbar__progress">
            <div class="navbar__progress__bar">
              <b-progress
                :value="totalProgress"
                class="w-100"> </b-progress>
                <a
                id="dropdown-list"
                class="navbar__progress__dropdown-btn"
                href="javascript:void(0)"
                @click="onToggleDropdown">
                  {{totalAnswers}} de {{totalQuestions}} preguntas respondidas
                </a>
                <div
                v-if="questionDropdown"
                class="navbar__progress__dropdown-list">
                  <div class="navbar__progress__dropdown-list__title">
                    Navegar a:
                  </div>
                  <ul>
                    <template v-for="index in totalQuestions">
                      <li :class="{ answered: questionAsnwered[index]}"
                          :key="index"
                          @click="onNavigateTo(index)">
                            PREGUNTA {{index}}
                      </li>
                    </template>
                  </ul>
                </div>
            </div>
        </div>
        <div class="navbar__timer">
          <span class="navbar__timer__time">
            {{minutes | formatTime }} : {{seconds | formatTime }}
          </span>
          <img src="@/assets/watch.svg" alt="watchIcon">
        </div>
        <div class="navbar__nav-btn">
          <button class="btn navbar__nav-btn__next"
              v-if="currentPage < totalPages"
              @click="onNext">
              Siguiente
          </button>
           <button class="btn navbar__nav-btn__next"
              v-if="currentPage === totalPages"
              @click="onFinish">
              Finalizar
          </button>
        </div>
       </div>

    </div>
  </nav>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { BIconTypeStrikethrough } from 'bootstrap-vue';

@Component({
  filters: {
    formatTime(value: number) {
      if (value < 10) {
        return `0${value}`;
      }
      return value;
    },
  },
})
export default class NavBar extends Vue {
  @Prop({ required: true, default: 1 }) currentPage!: number;

  @Prop({ required: true, default: 1 }) totalPages!: number;

  @Prop({ required: true, default: 0 }) totalQuestions!: number;

  @Prop({ required: true, default: 0 }) totalAnswers!: number;

  @Prop({ required: true, default: {} }) questionAsnwered!: number;

  deadline!: Date;

  currentTime = 0;

  questionDropdown = false;

  created() {
    document.addEventListener('click', this.onDocumentClick);
  }

  mounted() {
    const time = new Date();
    this.deadline = new Date();
    this.deadline.setTime(time.getTime() + (30 * 60 * 1000));
    this.countDown();
  }

  get seconds() {
    return Math.floor((this.currentTime / 1000) % 60);
  }

  get minutes() {
    return Math.floor((this.currentTime / 1000 / 60) % 60);
  }

  get totalProgress() {
    return (this.totalAnswers / this.totalQuestions) * 100;
  }

  onNext() {
    this.$emit('onChangePage', this.currentPage + 1);
  }

  onBack() {
    this.$emit('onChangePage', this.currentPage - 1);
  }

  onToggleDropdown() {
    this.questionDropdown = !this.questionDropdown;
  }

  onNavigateTo(index: number) {
    let page = 1;
    if (index < 10) {
      page = 1;
    } else if (index % 10 === 0) {
      page = index / 10;
    } else {
      page = Math.ceil(index / 10);
    }
    this.$emit('onChangeQuestion', { question: index, page });
  }

  onFinish() {
    this.$emit('onChangePage', this.currentPage + 1);
  }

  countDown() {
    this.currentTime = this.deadline.getTime() - new Date().getTime();
    if (this.currentTime > 0) {
      setTimeout(this.countDown, 1000);
    } else {
      alert('Su tiempo ha finalizado');
      this.currentTime = 0;
    }
  }

  onDocumentClick(e: any) {
    const element = document.getElementById('dropdown-list');
    const { target } = e;
    if ((element && element !== target) && !element.contains(target)) {
      this.questionDropdown = false;
    }
  }

  destroyed() {
    document.removeEventListener('click', this.onDocumentClick);
  }
}
</script>
<style lang="scss">
.navbar{
  background-color: $primary;
  height: 72px;
  &__timer{
    display:flex;
    align-items: center;
    justify-content: flex-end;
    flex-basis: 12%;
    &__time{
      color: white;
      font-weight: bold;
      padding-right: 10px;
    }
  }
  &__progress {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 58%;
    height: 56px;
    &__bar{
      display: block;
      width: 450px;
      height: auto;
    }
    &__dropdown-btn{
      display:block;
      margin-bottom:0;
      color: white;
      font-weight: bold;
      margin-top: 4px;
      &:after{
        content: "";
        display: inline-block;
        background: url("../assets/dropdown_arrow.svg") no-repeat;
        width: 12px;
        height: 12px;
        top: 2px;
        position: relative;
      }
      &:hover{
        color:white;
        text-decoration: none;
      }
    }
    &__dropdown-list{
      position: absolute;
      background-color: white;
      list-style: none;
      border-radius: 4px;
      height: 250px;
      top: 73px;
      box-shadow: 10px 10px 20px -5px rgba(0, 0, 0, 0.35);
      &__title{
        padding: 5px 16px;
        height: 15%;
        background-color: $primary;
        color: white;
        font-weight: bold;
      }
      ul {
        padding-left: 16px;
        list-style-type: none;
        overflow: scroll;
        height: 85%;
        li{
          width: 130px;
          padding-bottom: 5px;
          font-size: 14px;
          font-weight: bold;
          color: $primary-light;
          cursor: pointer;
          &.answered{
            color: $primary;
          }
        }
      }
    }
  }
  &__nav-btn{
    display: flex;
    align-items: center;
    top: 12px;
    flex-basis: 15%;
    &:last-child{
      justify-content: flex-end;
    }
    &__back,
    &__next{
       @include btn-outline-white;
    }
    &__back {
      float:left;
    }
    &__next{
      float:right;
    }
  }
}
</style>
