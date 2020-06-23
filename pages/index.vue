<template lang="pug">
  .container
    gb-divider(size="large" color="purple")
    .posts
      .post(v-for="post in $store.state.docs.posts")
        gb-heading(tag='h3') {{post.title}}
        .body(v-html="post.body")
        TagList(:tags="post.tags")
        gb-divider(size="large" color="turquoise")
</template>

<script lang="ts">
import Vue from 'vue'
import TagList from '~/components/admin/tags/TagList.vue'

export default Vue.extend({
  components: { TagList },
  async fetch() {
    await this.$store.dispatch('fetchDocs', { ref: 'tags' })
    await this.$store.dispatch('fetchDocs', { ref: 'posts' })
  },
  data: () => ({}),

  methods: {}
})
</script>

<style scoped></style>
