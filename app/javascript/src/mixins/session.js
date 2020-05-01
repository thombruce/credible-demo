const session = {
  computed: {
    currentSession () {
      return this.$store.getters['tokens/currentSession']
    },
    currentUser () {
      return this.$store.getters['tokens/currentUser']
    }
  }
}

export default session
