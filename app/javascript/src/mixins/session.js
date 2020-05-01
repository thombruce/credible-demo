const session = {
  computed: {
    sessionLoaded () {
      return this.$store.state.tokens.sessionLoaded
    },
    currentSession () {
      return this.$store.getters['tokens/currentSession']
    },
    currentUser () {
      return this.$store.getters['tokens/currentUser']
    }
  }
}

export default session
