<template>
  <div class="dashboard">
    <div class="dashboard__welcome">
      <h1>Bienvenido {{user.name}}</h1>
      <h3>Usted tiene
          {{tests.length > 1 ? 'los siguientes tests' : 'el siguiente test'}}
          para completar:
      </h3>
    </div>
    <div class="container dashboard__tests">
      <div class="row">
        <div v-for="test in tests"
          :key="test.id"
          class="col-4">
            <router-link
            :to="routesLink[test.type]">
              <div class="dashboard__tests__test-panel">
                <div class="dashboard__tests__test-panel__title">
                <h5>{{test.name}}</h5>
              </div>
              <div class="dashboard__tests__test-panel__img">
                <img
                class=""
                v-if="test.type === testType.VERBAL_REASONING"
                src="../assets/verbal-reasoning.svg"
                alt="">
              </div>
              <div class="dashboard__tests__test-panel__duration">
                <strong>Duracion: {{test.duration | duration('minutes')}}min.</strong>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export enum TestTypes {
  VERBAL_REASONING = 'verbal-reasoning'
}

@Component
export default class Home extends Vue {
  user = {
    name: 'Nicolas',
  }

  tests = [{
    id: 1,
    name: 'Razonamiento Verbal',
    duration: 1800000,
    type: 'verbal-reasoning',
  }]

  routesLink = {
    [TestTypes.VERBAL_REASONING]: '/verbal-reasoning',
  }

  testType = TestTypes;
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.dashboard{
  &__welcome{
    background-color: $primary;
    color: white;
    text-align: center;
    padding: 32px 0;
    h1,h3{
      font-weight: 600;
    }
    h1{
      margin-bottom: 20px;
    }
  }
  &__tests{
    display: flex;
    justify-content: center;
     a {
      color: black;
      text-decoration: none;
  }
    &__test-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 280px;
        margin-top: 32px;
        padding: 20px 0;
        border-radius: 4px;
        transition: box-shadow .25s ease-in;
        cursor: pointer;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,.15);
        &:hover{
          box-shadow: -2px 8px 22px 0 rgba(0,0,0,.15);
        }
        &__title {
          h5 {
            font-size: 16px;
            font-weight: 600;
          }
        }
        &__img{
          img{
            width: 120px;
          }
        }
        &__duration{
          font-size: 12px;
        }
    }
  }
}
</style>
