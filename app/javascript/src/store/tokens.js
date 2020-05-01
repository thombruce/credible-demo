import { authAPI as axios } from '../axios'

const jwtDecode = require('jwt-decode')

const state = () => ({
  sessionLoaded: false,
  refreshToken: null,
  accessToken: null
})

const getters = {
  currentSession: (state) => {
    if (state.accessToken) {
      return jwtDecode(state.accessToken).data
    } else {
      return null
    }
  },
  currentUser: (state, getters) => {
    if (state.accessToken) {
      return getters.currentSession.user
    } else {
      return null
    }
  }
}

const actions = {
  async init({ state, commit, dispatch }) {
    let refreshToken = localStorage.getItem('refresh-token')
    if (refreshToken) {
      commit('insert', { refreshToken })
      await dispatch('refresh', refreshToken)
    }
    commit('finish')
    return state.accessToken
  },
  create({ state, commit }, { refreshToken, accessToken }) {
    localStorage.setItem('refresh-token', refreshToken)
    commit('insert', { refreshToken, accessToken })
    return state.accessToken
  },
  destroy({ commit }) {
    localStorage.removeItem('refresh-token')
    commit('remove')
    return true
  },
  refresh({ state, commit }, refreshToken) {
    return axios
      .post('/refresh', { refresh_token: refreshToken })
      .then((res) => {
        localStorage.setItem('refresh-token', res.data.refresh_token)
        commit('insert', { refreshToken: res.data.refresh_token, accessToken: res.data.access_token })
        return state.accessToken
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  }
}

const mutations = {
  insert(state, { refreshToken, accessToken }) {
    state.refreshToken = refreshToken
    state.accessToken = accessToken
  },
  remove(state) {
    state.refreshToken = null
    state.accessToken = null
  },
  finish(state) {
    state.sessionLoaded = true
  }
}

const tokens = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default tokens
