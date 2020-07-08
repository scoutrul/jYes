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
import TagList from '~/components/tags/TagList.vue'

export default Vue.extend({
  components: { TagList },
  async fetch() {
    const tags = this.$route.params.tagIds
    if (!tags) return
    await this.$store.dispatch('fetchPostsWhereTagIds', { tags })
  },
  data: () => ({}),

  methods: {}
})
</script>

<style scoped></style>
