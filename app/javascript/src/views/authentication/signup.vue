<template lang="pug">
div
  h1 New User
  v-form(ref="form" :model="user" @submit.prevent="signUp()")
    v-text-field(label="Email" v-model="user.email" :error-messages="user.errors.email")
    v-text-field(label="Password" type="password" v-model="user.password" :error-messages="user.errors.password")
    v-btn(color="primary" type="submit") Sign up
  p
    | Already have an account?
    |
    router-link(:to="{ name: 'login_path' }") Log in
    |
    | instead.
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
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
    signUp: function () {
      this.$store.dispatch('signup', { user: this.user }).then(() => {
        this.$router.push('/')
      }).catch((errors) => {
        this.user.errors = errors
      })
    }
  }
}
</script>
