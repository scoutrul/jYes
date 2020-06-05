<template lang="pug">
  .container
    CreatePost(:tagList="$store.state.docs.tags")
    gb-divider(size="large" color="purple")
    .posts
      .post(v-for="post in $store.state.docs.posts")
        gb-heading(tag='h3') {{post.title}}
        gb-button(@click="deletePost({ id: post.id})") Delete
        .body {{ post.body}}
        .tags
          .tag(v-for="tag in post.tags")
            gb-badge(size='micro') {{ tag }}
        gb-divider(size="large" color="turquoise")
</template>

<script>
import CreatePost from '~/components/CreatePost'
export default {
  components: { CreatePost },
  async fetch() {
    await this.$store.dispatch('fetchPosts', { ref: 'tags' })
    await this.$store.dispatch('fetchPosts', { ref: 'posts' })
  },

  methods: {
    async deletePost({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'posts',
        id
      })
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  max-width: 900px;
}
</style>
