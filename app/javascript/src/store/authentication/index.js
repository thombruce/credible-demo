import { authAPI as axios } from '../../axios'

import account from './account'

const actions = {
  login({ dispatch, rootGetters }, payload) {
    return axios
      .post('/login', payload)
      .then((res) => {
        let refreshToken = res.data.refresh_token,
            accessToken = res.data.access_token

        dispatch('tokens/create', { refreshToken, accessToken }, { root: true })

        return rootGetters['tokens/currentSession']
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  signup({ dispatch, rootGetters }, payload) {
    return axios
      .post('/signup', payload)
      .then((res) => {
        let refreshToken = res.data.refresh_token,
            accessToken = res.data.access_token

        dispatch('tokens/create', { refreshToken, accessToken }, { root: true })

        return rootGetters['tokens/currentSession']
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  confirm({ dispatch, rootGetters }, params) {
    return axios
      .get('/confirm/' + params.confirmation_token, { params: { email: params.email } })
      .then((res) => {
        let refreshToken = res.data.refresh_token,
            accessToken = res.data.access_token

        dispatch('tokens/create', { refreshToken, accessToken }, { root: true })

        return rootGetters['tokens/currentSession']
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  resetPassword({}, payload) {
    return axios
      .post('/reset_password', payload)
      .then((res) => {
        return true
      })
      .catch((error) => {
        return Promise.reject(error.response.data)
      })
  },
  signout({ dispatch }) {
    return axios
      .delete('/signout')
      .then((res) => {
        dispatch('tokens/destroy', { root: true })
        return true
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

const authentication = {
  namespaced: true,
  actions,
  modules: {
    account
  }
}

export default authentication
