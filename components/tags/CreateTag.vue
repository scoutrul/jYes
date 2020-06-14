<template lang="pug">
  .container
    gb-input(v-model="title" label="Новый тэг")
    gb-button(@click="createTag()") Добавить таг
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

<style></style>
