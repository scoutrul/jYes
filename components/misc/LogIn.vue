<template lang="pug">
  gb-button(@click="LogIn" ) Log In
</template>

<script>
export default {
  methods: {
    LogIn() {
      this.$store.dispatch('LogIn')
    }
  }
}
</script>

<style scoped>
.alert {
  position: fixed;
  z-index: 1000;
  bottom: -100px;
  left: 24px;
}
.active {
  bottom: 24px;
}
</style>
