<template lang="pug">
  client-only
    gb-alert(color='blue' :closable="true" v-show="showAlert" @close="onAlertClose").alert My Toast
</template>

<script>
export default {
  data: () => ({
    showAlert: true
  }),

  methods: {
    onAlertClose() {
      console.log('close')
      this.showAlert = false
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
