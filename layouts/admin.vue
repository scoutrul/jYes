<template lang="pug">
  .adminMain
    Alert
    Modal(:name="'isCreateModal'")
      CreatePostForm(v-if="checkCategory('posts')")
      CreateTagForm(v-if="checkCategory('tags')")
    Modal(:name="'isDeleteModal'")
      ConfirmForm
    nuxt
</template>

<script>
import Alert from '~/components/Alert'
import Modal from '@/components/admin/Modal/Modal'
import helpers from '~/mixins/helpers.js'
export default {
  components: {
    Modal,
    Alert,
    CreatePostForm: () => import('@/components/admin/Modal/CreatePostForm.vue'),
    CreateTagForm: () => import('@/components/admin/Modal/CreateTagForm'),
    ConfirmForm: () => import('@/components/admin/Modal/ConfirmForm')
  },
  mixins: [helpers]
}
</script>

<style>
body {
  background: #222c3c;
}
.adminMain {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 120vh;
  justify-content: center;
  padding: 10px 0;
  background: #222c3c;
}
</style>
