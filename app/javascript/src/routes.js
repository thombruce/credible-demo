import Vue from 'vue/dist/vue.esm'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Login from './views/authentication/login.vue'
import ResetPassword from './views/authentication/resetPassword.vue'
import Signup from './views/authentication/signup.vue'
import Confirm from './views/authentication/confirm.vue'
import Account from './views/authentication/account.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Account, name: 'root_path' },
    { path: '/login', component: Login, name: 'login_path', meta: { layout: "authentication" } },
    { path: '/reset_password', component: ResetPassword, name: 'reset_password_path', meta: { layout: "authentication" } },
    { path: '/signup', component: Signup, name: 'signup_path', meta: { layout: "authentication" } },
    { path: '/confirm/:confirmation_token', component: Confirm, name: 'confirm_path', meta: { layout: "authentication" } },
    { path: '/account', component: Account, name: 'account_path' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['login_path', 'signup_path', 'confirm_path', 'reset_password_path']
  const authRequired = !publicPages.includes(to.name)
  const loggedIn = localStorage.getItem('user-token')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
