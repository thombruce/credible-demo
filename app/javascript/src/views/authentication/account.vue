<template lang="pug">
div(v-if="user")
  h1 Edit User
  v-form(ref="form" :model="user" @submit.prevent="update")
    v-text-field(label="Email" v-model="user.email" :error-messages="user.errors.email")
    v-text-field(label="Password" type="password" v-model="user.password" :error-messages="user.errors.password")
    v-btn(color="primary" type="submit") Save

  v-alert.my-4(
    type="error"
    colored-border
    border="left"
    elevation="2"
  )
    h4.title Danger Zone
    p.body-1 Your account cannot be restored if deleted. Please be certain this is what you want.
    p.body-2 You will also lose all of the workspaces, templates and entities associated with this account.
    v-dialog(v-model="dialog" persistent max-width="600px")
      template(v-slot:activator="{ on }")
        v-btn(color="error" v-on="on") Delete Account
      v-card
        v-card-title
          span(class="headline") Delete Account
        v-card-text
          p.body-2 All of your workspace, templates and content entries associated with this account will be lost.
          p.body-1 Are you sure you want to delete your account?
        v-card-actions
          v-spacer
          v-btn(@click="dialog = false") Cancel
          v-btn(color="error" @click="destroy") Delete Account
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      user: {
        errors: []
      }
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.user = null
      this.$store.dispatch('authentication/account/show').then(() => {
        this.user = this.$store.state.authentication.account.info
      })
    },
    update: function () {
      this.$store.dispatch('authentication/account/update', { id: this.user.id, user: this.user }).then(() => {
        this.$router.push('/')
      }).catch((errors) => {
        this.user.errors = errors
      })
    },
    destroy: function () {
      this.$store.dispatch('authentication/account/destroy').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
