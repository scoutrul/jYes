<template lang="pug">
  .admin
    .menu menu дшые
    .docList doclist
    .edit edit window
</template>

<script>
import CreatePost from '~/components/CreatePost'

export default {
  components: { CreatePost },
  async fetch() {
    await this.$store.dispatch('fetchPosts', { ref: 'tags' })
    await this.$store.dispatch('fetchPosts', { ref: 'posts' })
  },
  data: () => ({})
}
</script>

<style scoped>
.admin {
  display: flex;
  width: 100%;
}
.menu {
  width: 200px;
}
.docList {
  width: 200px;
}
.edit {
  width: 100%;
}
</style>
