import axios from 'axios';
import TokenService from './storage.service';

export default class ApiService {
  errorInterceptor: any;

  static init(baseURL: string) {
    axios.defaults.baseURL = baseURL;
  }

  static setHeader() {
    axios.defaults.headers.common.Authorization = `Bearer ${TokenService.getToken()}`;
  }

  static removeHeader() {
    axios.defaults.headers.common = {};
  }

  static get(resource: string) {
    return axios.get(resource);
  }

  static post(resource: string, data: any) {
    return axios.post(resource, data);
  }

  static put(resource: string, data: any) {
    return axios.put(resource, data);
  }

  static delete(resource: string) {
    return axios.delete(resource);
  }

  /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
    * */
  static customRequest(data: any) {
    return axios(data);
  }
}
