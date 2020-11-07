import router from '@/router';
import TokenService from '@/services/storage.service';
import { UserService, AuthenticationError } from '@/services/user.service';

interface AuthState {
  authenticating: boolean;
  accessToken: string;
  authenticationErrorCode: number;
  authenticationError: string;
}

const getters = {
  loggedIn: (state: AuthState) => (!!state.accessToken),

  authenticationErrorCode: (state: AuthState) => state.authenticationErrorCode,

  authenticationError: (state: AuthState) => state.authenticationError,

  authenticating: (state: AuthState) => state.authenticating,
};

const actions = {
  async login(
    { commit }: { commit: any},
    { email, password }: { email: string; password: string},
  ) {
    commit('loginRequest');

    try {
      const token = await UserService.login(email, password);
      commit('loginSuccess', token);

      // Redirect the user to the page he first tried to visit or to the home view
      router.push((router as any).history.current.query.redirect || '/');

      return true;
    } catch (e) {
      if (e instanceof AuthenticationError) {
        commit('loginError', { errorCode: e.errorCode, errorMessage: e.message });
      }

      return false;
    }
  },

  logout({ commit }: { commit: any}) {
    UserService.logout();
    commit('logoutSuccess');
    router.push('/login');
  },
};

const mutations = {
  loginRequest(state: AuthState) {
    state.authenticating = true;
    state.authenticationError = '';
    state.authenticationErrorCode = 0;
  },

  loginSuccess(state: AuthState, accessToken: string) {
    state.accessToken = accessToken;
    state.authenticating = false;
  },

  loginError(state: AuthState, { errorCode, errorMessage }:
     { errorCode: number; errorMessage: string }) {
    state.authenticating = false;
    state.authenticationErrorCode = errorCode;
    state.authenticationError = errorMessage;
  },

  logoutSuccess(state: AuthState) {
    state.accessToken = '';
  },

  refreshToken({ commit, state }: { commit: any; state: any}) {
    // If this is the first time the refreshToken has been called, make a request
    // otherwise return the same promise to the caller
    if (!state.refreshTokenPromise) {
      const p = UserService.refreshToken();
      commit('refreshTokenPromise', p);

      // Wait for the UserService.refreshToken() to resolve.
      // On success set the token and clear promise
      // Clear the promise on error as well.
      p.then(
        (response) => {
          commit('refreshTokenPromise', null);
          commit('loginSuccess', response);
        },
        (error) => {
          commit('refreshTokenPromise', null);
        },
      );
    }

    return state.refreshTokenPromise;
  },
};

const state = {
  authenticating: false,
  accessToken: TokenService.getToken(),
  authenticationErrorCode: 0,
  authenticationError: '',
};

const auth = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

export default auth;
