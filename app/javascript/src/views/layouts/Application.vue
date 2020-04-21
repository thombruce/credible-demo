<template lang="pug">
v-app(:dark="$vuetify.theme.dark")
  v-app-bar(clipped-left fixed app dark color="primary")
    v-app-bar-nav-icon(@click.stop="drawer = !drawer")
    v-btn(:to="{ name: 'root_path' }" text)
      v-toolbar-title Credible Demo
    v-spacer
    span.mr-2
      strong Version
      |
      | {{ $store.getters.appVersion }}
    v-menu
      template(v-slot:activator="{ on }")
        v-btn(
          icon
          v-on="on"
        )
          v-icon mdi-account
      v-list
        v-list-item(
          :to="{ name: 'account_path' }"
        )
          v-list-item-title Account
        v-list-item(
          @click="signOut"
        )
          v-list-item-title Sign out
  v-content
    v-container
      slot
    v-footer
      span &copy; {{ new Date().getFullYear() }} Thom Bruce
</template>

<script>
export default {
  data() {
    return {
      drawer: null // [1]
    }
  },
  methods: {
    signOut: function () {
      this.$store.dispatch('signout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}

// [1] Using null as the starting value for its v-model will initialize the drawer as closed on mobile and as open on desktop.
//     https://vuetifyjs.com/en/components/navigation-drawers/#usage
</script>
