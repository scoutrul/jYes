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
          .tag(v-for="tag in post.tags" :key="tag.id" v-if="cleanTagList(tag.id)")
            gb-badge(size='micro') {{ tag.title }}
        gb-divider(size="large" color="turquoise")
</template>

<script>
import CreatePost from '~/components/CreatePost'

export default {
  components: { CreatePost },
  async fetch() {
    await this.$store.dispatch('fetchDocs', { ref: 'tags' })
    await this.$store.dispatch('fetchDocs', { ref: 'posts' })
  },
  data: () => ({}),

  methods: {
    cleanTagList(tagId) {
      return this.$store.state.docs.tags.some((tag) => tag.id === tagId)
    },
    async deletePost({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'posts',
        id
      })
    }
  }
}
</script>

<style scoped></style>
