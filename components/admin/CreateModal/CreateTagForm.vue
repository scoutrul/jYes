<template lang="pug">
  div
    gb-input(v-model="title" label="Новый тэг")
    gb-button(@click="createTag" :disabled="$store.state.loading") Добавить таг
</template>

<script>
export default {
  data: () => ({
    title: 'новый'
  }),

  methods: {
    async createTag() {
      await this.$store.dispatch('createDoc', {
        ref: 'tags',
        doc: { title: this.title }
      })
      await this.$store.commit('TOGGLE_CREATE_MODAL', false)
    }
  }
}
</script>

<style></style>
