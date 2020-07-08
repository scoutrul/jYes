<template lang="pug">
  div
    gb-heading(tag='h3') Точно?
    gb-button(@click="closeModal") Отмена
    gb-button(@click="confirm") Удалить
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    closeModal() {
      this.$store.commit('TOGGLE_MODAL', this.$store.state.admin.confirm.name)
    },
    confirm() {
      this.$store
        .dispatch('deleteDoc', {
          confirmed: true,
          ref: this.$store.state.admin.confirm.ref,
          id: this.$store.state.admin.confirm.id
        })
        .then(() => {
          this.closeModal()
        })
    }
  }
})
</script>

<style scoped></style>
