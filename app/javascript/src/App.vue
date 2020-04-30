<template lang="pug">
  div
    component(:is="layout")
      router-view
</template>

<script>
const default_layout = "application"

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    }
  }
}
</script>