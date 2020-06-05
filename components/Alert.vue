<template lang="pug">
  client-only
    gb-alert(
      :class="$store.state.alert.show ? 'active' : 'notactive'"
      :text="$store.state.alert.text"
      :color='$store.state.alert.color'
      :closable="true"
      @close="onAlertClose"
      ).alert {{ $store.state.alert.text }}
</template>

<script>
export default {
  methods: {
    onAlertClose() {
      console.log('close')
      this.$store.commit('HIDE_ALERT')
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
