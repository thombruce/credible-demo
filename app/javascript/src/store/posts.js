import axios from '../axios'

const state = () => ({
  list: {}
})

const getters = {}

const actions = {
  index({ commit }) {
    return axios
      .get('/posts')
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  show({ commit }, id) {
    return axios
      .get('/posts/' + id)
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  create({ commit }, payload) {
    return axios
      .post('/posts', payload)
      .then((res) => {
        commit('insert', res.data)
      })
      .catch(function(error) {
        console.log(error)
      })
  }
}

const mutations = {
  insert(state, payload) {
    const isArray = Array.isArray(payload)
    let posts = isArray ? payload : [payload]
    posts.map((post) => {
      state.list[post.id] = { ...state.list[post.id], ...item }
    })
  }
}

const posts = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default posts