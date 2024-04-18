import Cookies from 'js-cookie';
import axios from 'axios';
import { baseURL } from '../Server';

const TOKEN_KEY = 'user_token';

const AuthService = {

  setToken(token) {
    Cookies.set(TOKEN_KEY, token);
  },


  getToken() {
    return Cookies.get(TOKEN_KEY);
  },


  removeToken() {
    Cookies.remove(TOKEN_KEY);
  },

  isAuthenticated() {
    return !!this.getToken();
  },


  async login(email, password) {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email: email,
        password: password
      });
      const token = response.data.token;
      this.setToken(token); 
      return token;
    } catch (error) {
      throw error;
    }
  },

  logout() {
    this.removeToken(); 
  }
};

export default AuthService;
