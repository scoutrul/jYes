<template lang="pug">
  .admin
    .menu
      gb-heading(
        tag="h6"
        color="white"
        v-for="category in $store.state.admin.categories"
        :key="category.ref"
        @click="setCategory(category.ref)"
        :class="{active : (category.ref === $store.state.admin.activeCategory)}") {{ category.name }}
    DocList.docList
    EditZone.editZone
</template>

<script lang="ts">
import Vue from 'vue'
import DocList from '@/components/admin/DocList.vue'
import EditZone from '@/components/admin/EditZone.vue'

export default Vue.extend({
  components: { DocList, EditZone },
  async fetch() {
    await this.$store.dispatch('fetchDocs', { ref: 'tags' })
    await this.$store.dispatch('fetchDocs', { ref: 'posts' })
  },
  data: () => ({}),
  computed: {},
  methods: {
    setCategory(ref: String) {
      this.$store.commit('SET_CATEGORY', ref)
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
.active {
  background: darkslategrey;
}
</style>
