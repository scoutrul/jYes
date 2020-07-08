<template lang="pug">
  .admin
    AdminMenu.menu
    AdminDocList.docList
    AdminEditZone.editZone
</template>

<script lang="ts">
import Vue from 'vue'
import AdminDocList from '~/components/admin/AdminDocList.vue'
import AdminEditZone from '~/components/admin/AdminEditZone.vue'
import AdminMenu from '~/components/admin/AdminMenu.vue'

export default Vue.extend({
  components: { AdminDocList, AdminEditZone, AdminMenu },
  layout: 'admin',
  async fetch() {
    await this.$store.dispatch('fetchDocs', { ref: 'tags' })
    await this.$store.dispatch('fetchDocs', { ref: 'posts' })
  },
  data: () => ({}),
  computed: {},
  methods: {
    setCategory(ref: String) {
      this.$store.commit('SET_CATEGORY', ref)
      this.$store.commit('SET_EDIT_DOC', {})
    }
  }
})
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
