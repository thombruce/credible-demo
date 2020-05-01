<template lang="pug">
  div
    component(:is="layout")
      router-view(v-if="currentUser")
</template>

<script>
const default_layout = "application"

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    }
  },
  created: function () {
    this.fetchSession()
  },
  methods: {
    fetchSession () {
      this.$store.dispatch('tokens/init')
    }
  }
}
</script>