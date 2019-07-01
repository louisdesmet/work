import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
axios.defaults.baseURL = 'http://generalapi.test/api';
axios.defaults.headers.common['Accept'] = 'application/json';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    enduser: null,
    userProducts: null,
    userDomains: null,
    users: null,
    vendors: null,
    categories: null,
    products: null
  },
  mutations: {
    user(state, payload) {
      state.user = payload;
    },
    users(state, payload) {
      state.users = payload;
    },
    userProducts(state, payload) {
      state.userProducts = payload;
    },
    userDomains(state, payload) {
      state.userDomains = payload;
    },
    vendors(state, payload) {
      state.vendors = payload;
    },
    categories(state, payload) {
      state.categories = payload;
    },
    products(state, payload) {
      state.products = payload;
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
    userProducts(state) {
      return state.userProducts;
    },
    userDomains(state) {
      return state.userDomains;
    },
    vendors(state) {
      return state.vendors;
    },
    categories(state) {
      return state.categories;
    },
    products(state) {
      return state.products;
    },
    enduser(state) {
      return state.enduser;
    },
  },
  actions: {
    users({commit, state}) {
      axios.get('/users/' + state.user.user.id + '/users', {
        headers: {
          Authorization: 'Bearer ' + state.user.auth.access_token
        }
      }).then( response => {
        commit('users', response.data.data);
      });
    },
    user({commit, state}) {
      commit('user', JSON.parse(localStorage.getItem('user')));
    },
    userProducts({commit, state}) {
      let id = (state.enduser) ? state.enduser.id : state.user.user.id;
      axios.get('/users/' + id + '/products', {
        headers: {
          Authorization: 'Bearer ' + state.user.auth.access_token
        }
      }).then( response => {
        commit('userProducts', response.data.data);
      });
    },
    userDomains({commit, state}) {
      let id = (state.enduser) ? state.enduser.id : state.user.user.id;
      axios.get('/users/' + id + '/domains', {
        headers: {
          Authorization: 'Bearer ' + state.user.auth.access_token
        }
      }).then( response => {
        commit('userDomains', response.data.data);
      });
    },
    vendors({commit, state}) {
      axios.get('/vendors', {
        headers: {
          Authorization: 'Bearer ' + state.user.auth.access_token
        }
      }).then(response=>{
        commit('vendors', response.data.data);
      });
    },
    categories({commit, state}) {
      axios.get('/categories', {
        headers: {
          Authorization: 'Bearer ' + state.user.auth.access_token
        }
      }).then(response=>{
        commit('categories', response.data.data);
      });
    },
    products({commit, state}) {
      axios.get('/products', {
        headers: {
          Authorization: 'Bearer ' + state.user.auth.access_token
        }
      }).then(response=>{
        commit('products', response.data.data);
      });
    },

    showUser(state, user) {
      this.state.enduser = user.user;
    }
  }
})
