import axios from 'axios'

import store from './store'

// Default settings
axios.defaults.baseURL = '/auth'
axios.defaults.headers.common['Accept'] = 'application/json'

// Interceptor Functions
const requestInterceptor = (request) => {
  let token = store.state.tokens.accessToken

  if (token) {
    request.headers['Authorization'] = `Bearer ${ token }`
  }

  return request
}

const responseErrorInterceptor = (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('refresh-token')
    window.location = '/login'
  } else {
    return Promise.reject(error)
  }
}

// Axios Instances
const authAPI = axios.create({
  baseURL: '/auth'
})

authAPI.interceptors.request.use(
  requestInterceptor,
  (error) => { return Promise.reject(error) }
)

authAPI.interceptors.response.use(
  (response) => { return response },
  responseErrorInterceptor
)

export default authAPI

export { authAPI }
