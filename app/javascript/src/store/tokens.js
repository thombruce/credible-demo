import { authAPI as axios } from '../../axios'

const jwtDecode = require('jwt-decode')

const state = () => ({
  sessionLoaded: false,
  accessToken: null
})

const getters = {
  accessTokenExpiresAt: (state) => {
    if (state.accessToken) {
      return jwtDecode(state.accessToken).exp
    } else {
      return null
    }
  },
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
  async init ({ state, commit, dispatch }) {
    await dispatch('forceRefresh')
    commit('finish')
    return state.accessToken
  },
  create ({ state, commit, dispatch }, { refreshToken, accessToken }) {
    localStorage.setItem('refresh-token', refreshToken)
    commit('insert', { accessToken })

    setTimeout(() => {
      dispatch('refresh')
    }, 120000) // 2 minutes

    return state.accessToken
  },
  destroy ({ commit }) {
    localStorage.removeItem('refresh-token')
    commit('remove')
    return true
  },
  /**
   * Refresh session if accessToken is near expiry or doesn't exist
   */
  async refresh ({ state, getters, dispatch }) {
    const accessToken = state.accessToken
    const accessTokenExpiry = getters.accessTokenExpiresAt
    const currentTime = Date.now() / 1000

    if (!accessToken || accessTokenExpiry - 1800 < currentTime) {
      await dispatch('forceRefresh')
    }
  },
  /**
   * Force session refresh without checking accessToken
   */
  async forceRefresh ({ state, commit, dispatch }) {
    const refreshToken = localStorage.getItem('refresh-token')

    if (refreshToken) {
      await axios
        .post('/refresh', { refresh_token: refreshToken })
        .then((res) => {
          const refreshToken = res.data.refresh_token
          const accessToken = res.data.access_token

          localStorage.setItem('refresh-token', refreshToken)
          commit('insert', { accessToken })

          setTimeout(() => {
            dispatch('refresh')
          }, 120000) // 2 minutes

          return state.accessToken
        })
        .catch((error) => {
          return Promise.reject(error.response.data)
        })
    }
  }
}

const mutations = {
  insert (state, { accessToken }) {
    state.accessToken = accessToken
  },
  remove (state) {
    state.accessToken = null
  },
  finish (state) {
    state.sessionLoaded = true
  }
}

const tokens = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default tokens
