import auth from '@/api/auth'

const state = {
  user: null,
  isLogin: false
}

const getters = {
  // 直接将数据抛出去，而不用 state 的层级eg: auth.state.user
  user: state => state.user,
  isLogin: state => state.isLogin
}

const mutations = {
  setUser(state, payload) {
    state.user = payload.user
  },

  setLogin(state, payload) {
    state.isLogin = payload.isLogin
  }
}

const actions = {
  // 第一个参数是默认的 { commit }
  login({ commit }, { username, password }) {
    // return promise 以便登录以后需要做的操作
    return auth.login({ username, password })
      .then(res => {
        commit('setUser', { user: res.data })
        commit('setLogin', { isLogin: true })
      })
  },
  // 与上面的写法相同，返回的仍然是 promise 对象
  async register({ commit }, { username, password }) {
    let res = await auth.register({ username, password })
    commit('setUser', { user: res.data })
    commit('setLogin', { isLogin: true })
    // 这里返回调用的时候想得到 then 里面的数据
    return res.data
  },

  async logout({ commit }) {
    await auth.logout()
    commit('setUser', { user: null }) 
    commit('setLogin', { isLogin: false })
  },

  async checkLogin({ commit, state }) {
    // 判断 state 中有无登录状态，有则返回 true
    if (state.isLogin) return true
    // 如果 state 中没有，调用 auth.getInfo 获取登录状态
    let res = await auth.getInfo()
    // 从 res 中获取并设置登录状态
    commit('setLogin', { isLogin: res.isLogin })
    // 如果登录状态为未登录，返回 false
    if (!res.isLogin) return false 
    // 如果已登录，设置 user 并返回 true
    commit('setUser', { user: res.data })
    return true
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}