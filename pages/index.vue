<template lang="pug">
  .container
    CreatePost(:tagList="docs.tags")
    gb-divider(size="large" color="purple")
    .posts
      .post(v-for="post in docs.posts")
        gb-heading(tag='h3') {{post.title}}
        gb-button(@click="deletePost({ id: post.id})") Delete
        .body {{ post.body}}
        .tags
          .tag(v-for="tag in post.tags")
            gb-badge(size='micro') {{ tag }}
        gb-divider(size="large" color="turquoise")
</template>

<script>
import crud from '~/mixins/crud.js'
import CreatePost from '~/components/CreatePost'
export default {
  components: { CreatePost },
  extends: crud,
  async fetch() {
    await this.getDocsFromCollection({ ref: 'tags' })
    await this.getDocsFromCollection({ ref: 'posts' })
  },
  mounted() {
    this.$nextTick()
  },
  methods: {
    async deletePost({ id }) {
      await this.deleteDoc({
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
