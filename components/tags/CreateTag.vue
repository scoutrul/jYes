<template lang="pug">
  div
    gb-input(v-model="title" label="Новый тэг").input
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
    }
  }
}
</script>

<style scoped>
.input {
  display: inline-block;
}
</style>
