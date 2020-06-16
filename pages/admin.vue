<template lang="pug">
  .admin
    .menu
      gb-heading(tag="h6" color="white") Посты
      gb-heading(tag="h6" color="white") Таги
    DocList().docList
    EditZone(:doc="$store.state.admin.editDoc" v-if="$store.state.admin.editDoc.id").editZone
</template>

<script>
import DocList from '~/components/admin/DocList'
import EditZone from '~/components/admin/EditZone'

export default {
  components: { DocList, EditZone },
  async fetch() {
    await this.$store.dispatch('fetchDocs', { ref: 'tags' })
    await this.$store.dispatch('fetchDocs', { ref: 'posts' })
  },
  data: () => ({}),
  computed: {}
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
