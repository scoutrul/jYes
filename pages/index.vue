<template lang="pug">
  .container
    gb-divider(size="large" color="purple")
    .posts
      .post(v-for="post in $store.state.docs.posts")
        gb-heading(tag='h3') {{post.title}}
        .body {{ post.body}}
        TagList(:tags="post.tags")
        gb-divider(size="large" color="turquoise")
</template>

<script>

import TagList from '~/components/tags/TagList'

export default {
  components: { CreatePost },
  async fetch() {
    await this.$store.dispatch('fetchDocs', { ref: 'tags' })
    await this.$store.dispatch('fetchDocs', { ref: 'posts' })
  },
  data: () => ({}),

  methods: {


  }
}
</script>

<style>
.container {
  width: 100%;
  max-width: 900px;
}
</style>
