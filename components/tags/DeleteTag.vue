<template lang="pug">
  .tag(v-for="tag in tagList" :key="tag.id")
    gb-checkbox(:label="tag.title" @change="selectTag(tag)")
    gb-button(size='micro' color='red' @click="deleteTag({ id: tag.id})") x

</template>

<script>
export default {
  props: ['tagList'],
  methods: {
    selectTag(tag) {
      this.tags[tag.id] = tag
    },
    async deleteTag({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'tags',
        id
      })
    }
  }
}
</script>

<style></style>
