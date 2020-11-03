<template>
  <div class="login">
    <div class="login__panel">
      <form class="login__panel__form">
        <div class="form-group">
          <label for="username">
            Usuario
          </label>
          <input class="form-control"
                placeholder="jlopez@gmail.com"
                type="text"
                id="username">
        </div>
        <div class="form-group">
          <label for="password">
            Contraseña
          </label>
          <input class="form-control"
          type="password"
          id="password"
          placeholder="········">
        </div>
      </form>
      <a href="" class="login__panel__forgot-pass">Olvidaste tu contraseña?</a>
      <button class="primary-btn">Iniciar sesion</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {

}
</script>

<style lang="scss">
.login{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: $light-gray;
  &__panel{
   @include shadow-panel;
   display: grid;
   justify-items: center;
   grid-gap: 20px;
   border-radius: 10px;
   padding: 20px;
   width: 400px;
   background: $white;
   &__form {
     display: flex;
     flex-direction: column;
     width: 300px;
     .form-group {
       &:last-child {
         margin-bottom: 0;
       }
     }
   }
   &__forgot-pass {
       color: $primary;
       &:hover {
         text-decoration: none;
         color: $primary;
       }
   }
  }
}
</style>
