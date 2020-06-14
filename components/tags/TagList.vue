<template lang="pug">
    .tags
      .tag(v-for="tag in tags" :key="tag.id" v-if="removeNotActiveTags(tag.id)")
        gb-badge(size='micro') {{ tag.title }}
</template>

<script>
import tagsMxn from '~/mixins/tags'

export default {
  mixins: [tagsMxn],
  props: ['tags'],
  methods: {
    removeNotActiveTags(tagId) {
      return this.$store.state.docs.tags.some((tag) => tag.id === tagId)
    },
  },
}
</script>

<style scoped></style>
