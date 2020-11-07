<template>
  <div class="login">
    <div class="login__panel">
      <form class="login__panel__form">
        <div class="form-group">
          <label for="username">
            Usuario
          </label>
          <input class="form-control"
                v-model="username"
                placeholder="jlopez"
                type="text"
                id="username"
                >
        </div>
        <div class="form-group">
          <label for="password">
            Contraseña
          </label>
          <input class="form-control"
          v-model="password"
          type="password"
          id="password"
          placeholder="········">
        </div>
      </form>
      <a href="" class="login__panel__forgot-pass">Olvidaste tu contraseña?</a>
      <button class="primary-btn" @click="handleSubmit">Iniciar sesion</button>
      <div class="error-text">
          {{this.authenticationError}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapGetters } from 'vuex';
import { Action } from 'vuex-class';

@Component({
  computed: {
    ...mapGetters('auth', [
      'authenticating',
      'authenticationError',
      'authenticationErrorCode',
    ]),
  },
  methods: {
    ...mapActions('auth',
      ['login']),
  },
})
export default class Login extends Vue {
  username!: string;

  password!: string

  constructor() {
    super();
    this.username = '';
    this.password = '';
  }

  @Action('auth/login')
  public login!: (user: { email: string; password: string}) => void;

  handleSubmit() {
    // Perform a simple validation that email and password have been typed in
    if (this.username !== '' && this.password !== '') {
      this.login({ email: this.username, password: this.password });
    }
  }
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
