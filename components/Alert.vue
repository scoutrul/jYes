<template lang="pug">
  client-only
    gb-alert(
      v-show="$store.state.alert.show"
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

<style>
.alert {
  position: fixed;
  bottom: 10px;
  left: 10px;
  transition: 0.3 ease;
}
</style>
