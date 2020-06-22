<template lang="pug">
    .tags
      .tag(v-for="tag in tags" :key="tag.id" v-if="removeNotActiveTags(tag.id)")
        gb-badge(size='micro') {{ tag.title }}
</template>

<script>
export default {
  props: ['tags'],
  methods: {
    removeNotActiveTags(tagId) {
      return this.$store.state.docs.tags.some((tag) => tag.id === tagId)
    }
    // TODO отображать неактивные теги?
  }
}
</script>

<style scoped></style>
