<template lang="pug">
  div
    gb-heading(tag='h3') {{doc.title}}
    .body {{ doc.body}}
    TagList(:tags="doc.tags")
    gb-button(@click="deletedoc({ id: doc.id})") Delete
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: ['doc'],
  methods: {
    async deletePost({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'posts',
        id,
      })
    },
  },
}
</script>

<style scoped></style>
