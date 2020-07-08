<template lang="pug">
  div
    EditTag(v-if="checkCategory('tags') && $store.state.admin.editDoc.id" :tag="$store.state.admin.editDoc")
    EditPost(v-if="checkCategory('posts') && $store.state.admin.editDoc.id" :post="$store.state.admin.editDoc")
</template>

<script>
import helpers from '~/mixins/helpers.js'
import EditTag from '@/components/admin/EditTagForm'
import EditPost from '@/components/admin/EditPostForm'
export default {
  components: {
    EditPost,
    EditTag
  },
  mixins: [helpers]
}
</script>

<style scoped></style>
