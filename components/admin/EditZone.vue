<template lang="pug">
  div
    EditTag(v-if="checkCategory('tags')" :doc="doc")
    EditPost(v-if="checkCategory('posts')" :doc="doc")
</template>

<script>
import helpers from '~/mixins/helpers.js'
import EditPost from '~/components/admin/EditPost'
import EditTag from '~/components/admin/EditTag'
export default {
  // components: {
  //   EditPost: () => import('~/components/admin/EditPost'),
  //   EditTag: () => import('~/components/admin/EditTag')
  // },
  components: { EditPost, EditTag },
  mixins: [helpers],
  props: {
    doc: {
      type: Object,
      default: () => {
        return {
          title: 'Title',
          id: 123,
          tags: [{ title: 'some', id: 123 }],
          body: 'body'
        }
      }
    }
  }
}
</script>

<style scoped></style>
