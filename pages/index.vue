<template lang="pug">
  .container
    gb-divider(size="large" color="purple")
    PostList(:posts="$store.state.docs.posts")
</template>

<script lang="ts">
import Vue from 'vue'
import PostList from '@/components/posts/PostList.vue'

export default Vue.extend({
  components: { PostList },
  async fetch() {
    await this.$store.dispatch('fetchDocs', { ref: 'tags' })
    await this.$store.dispatch('fetchDocs', { ref: 'posts' })
  }
})
</script>

<style scoped></style>
