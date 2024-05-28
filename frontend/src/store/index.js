import { createStore } from 'vuex';
// import apiService from "../services/api.services";
import axios from "axios";

const getHeader = () => {
  return {
    headers: { "Content-Type": "application/json" },
  };
};

const getUrl = () => {
  return "https://chatify-app-zeta.vercel.app";
};

export default createStore({
  state: {
    userData: {
      isLoggedInUser: false,
      user: null
    },
  },
  getters: {
  },
  mutations: {
    updateUserData(state, payload) {
      state.userData = payload
      
    }
  },
  actions: {
    async getUserData({ commit }) {
      let responseUser;
      try {
        let response = await axios.get(getUrl() + "/authentication/usersession", { withCredentials: true }, getHeader())
        responseUser = { user: response.data.user, isLoggedInUser: true }
        commit('updateUserData', responseUser);
    
      }
      catch (err) {
        responseUser = { user: null, isLoggedInUser: false }
        commit('updateUserData', responseUser);
      }
      return responseUser
    }
  },
  modules: {
  }
})
