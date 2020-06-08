<template lang="pug">
  .admin
    .menu menu дшые
    DocList(:docs="getActualPost").docList
    .edit edit window
</template>

<script>
import dayjs from 'dayjs'
import DocList from '~/components/admin/DocList'

export default {
  components: { DocList },
  async fetch() {
    await this.$store.dispatch('fetchDocs', { ref: 'tags' })
    await this.$store.dispatch('fetchDocs', { ref: 'posts' })
  },
  data: () => ({}),
  computed: {
    getActualPost() {
      return this.$store.state.docs.posts
    }
  }
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
