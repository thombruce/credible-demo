import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
Vue.use(Vuex)

import tokens from './tokens'
import authentication from './authentication'

const state = () => ({
  packageVersion: process.env.PACKAGE_VERSION || '0'
})

const getters = {
  appVersion: (state) => {
    return state.packageVersion
  }
}

const actions = {
  login({ dispatch }, payload) { // A shortcut for...
    return dispatch('authentication/login', payload)
  },
  signup({ dispatch }, payload) { // A shortcut for...
    return dispatch('authentication/signup', payload)
  },
  signout({ dispatch }) { // A shortcut for...
    return dispatch('authentication/signout')
  }
}

const refreshSessionPlugin = (store) => {
  store.subscribeAction((action, state) => {
    if (!['tokens/refresh', 'tokens/forceRefresh'].includes(action.type)) {
      console.log(action.type)
      store.dispatch('tokens/refresh', null, { root: true })
    }
  })
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  plugins: [refreshSessionPlugin],
  modules: {
    tokens,
    authentication
  }
})

export default store
