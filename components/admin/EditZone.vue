<template lang="pug">
  div
    EditTag(v-if="checkCategory('tags') && $store.state.admin.editDoc.id" :doc="$store.state.admin.editDoc")
    EditPost(v-if="checkCategory('posts') && $store.state.admin.editDoc.id" :doc="$store.state.admin.editDoc")
</template>

<script>
import helpers from '~/mixins/helpers.js'
export default {
  components: {
    EditPost: () => import('~/components/admin/EditPost'),
    EditTag: () => import('@/components/admin/tags/EditTag')
  },
  mixins: [helpers]
}
</script>

<style scoped></style>
