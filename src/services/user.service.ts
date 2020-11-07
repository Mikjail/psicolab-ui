import ApiService from './api.service';
import TokenService from './storage.service';

class AuthenticationError extends Error {
  errorCode: string;

  constructor(errorCode: string, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errorCode = errorCode;
  }
}

class UserService {
  /**
     * Login the user and store the access token to TokenService.
     *
     * @returns access_token
     * @throws AuthenticationError
    * */
  static async login(email: string, password: string) {
    const requestData = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      url: '/api/user/login',
      data: {
        username: email,
        password,
      },
    };

    try {
      const response = await ApiService.customRequest(requestData);

      TokenService.saveToken(response.data.jwt);
      // TokenService.saveRefreshToken(response.data.jwt);
      ApiService.setHeader();

      return response.data.access_token;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data);
    }
  }

  /**
     * Refresh the access token.
    * */
  static async refreshToken() {
    const requestData = {
      method: 'post',
      url: '/o/token/',
      data: {
        grantType: 'refresh_token',
      },
      auth: {
        username: process.env.VUE_APP_CLIENT_ID,
        password: process.env.VUE_APP_CLIENT_SECRET,
      },
    };

    try {
      const response = await ApiService.customRequest(requestData);

      TokenService.saveToken(response.data.access_token);
      TokenService.saveRefreshToken(response.data.refresh_token);
      // Update the header in ApiService
      ApiService.setHeader();

      return response.data.access_token;
    } catch (error) {
      throw new AuthenticationError(error.response.status, error.response.data.detail);
    }
  }

  /**
     * Logout the current user by removing the token from storage.
     *
     * Will also remove `Authorization Bearer <token>` header from future requests.
    * */
  static logout() {
    // Remove the token and remove Authorization header from Api Service as well
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    ApiService.removeHeader();
  }
}

export { UserService, AuthenticationError };
