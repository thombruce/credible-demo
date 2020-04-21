<template lang="pug">
div
  h1 New Session
  v-form(ref="form" :model="user" @submit.prevent="login()")
    v-text-field(label="Login" v-model="user.login" :error-messages="user.errors.login")
    v-text-field(label="Password" type="password" v-model="user.password" :error-messages="user.errors.password")
    v-btn(color="primary" type="submit") Log in
  p
    | Not got an account?
    |
    router-link(:to="{ name: 'signup_path' }") Sign up
    |
    | instead.
  p
    | Forgotten your password?
    |
    router-link(:to="{ name: 'reset_password_path' }") Reset password.
</template>

<script>
export default {
  data() {
    return {
      user: {
        login: '',
        password: '',
        errors: []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.currentUser) {
        return next(from || '/')
      }
    })
  },
  methods: {
    login() {
      this.$store.dispatch('login', { session: this.user }).then(() => {
        this.$router.push('/')
      }).catch((errors) => {
        this.user.errors = errors
      })
    }
  }
}

// TODO: Use @submit.prevent to prevent page refresh on login form
//       I have temporarily removed the `.prevent` because some other
//       problem is causing the application not to navigate on login,
//       even though the user-token does get set. It requires further
//       investigation.
</script>
