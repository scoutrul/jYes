<template lang="pug">
  div
    EditTag(v-if="checkCategory('tags')" :doc="doc")
    EditPost(v-if="checkCategory('posts')" :doc="doc")
</template>

<script>
import helpers from '~/mixins/helpers.js'
export default {
  components: {
    EditPost: () => import('~/components/admin/EditPost'),
    EditTag: () => import('~/components/admin/EditTag')
  },
  mixins: [helpers],
  props: ['doc']
}
</script>

<style scoped></style>
