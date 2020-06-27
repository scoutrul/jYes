<template lang="pug">
    .tags
      .tag(v-for="tag in pickTags(tags)" :key="tag.id")
        nuxt-link(:to="{ name: 'tags', params: { tagIds: [tag.id] }}")
          gb-badge(size='micro') {{ tag.title }}
</template>

<script>
export default {
  props: ['tags'],
  methods: {
    pickTags(tagIds) {
      const state = []

      tagIds.forEach((tagId) => {
        const findTag = this.$store.state.docs.tags.find(
          (tag) => tag.id === tagId
        )
        if (findTag.id) {
          state.push(findTag)
        }
      })
      return state
    }
  }
}
</script>

<style scoped></style>
