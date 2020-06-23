<template lang="pug">
  div
    CreateModal(:opened="modalState")
      CreatePostForm(v-if="checkCategory('posts')")
      CreateTagForm(v-if="checkCategory('tags')")
    gb-button(size='micro' color='green' :full-width="true" @click="openCreateDoc" :disabled="modalState") Добавить
    gb-divider(color="yellow")
    template(v-if="getDocs.length")
      .doc(v-for="doc in getDocs" :key="doc.id" @click="editDoc(doc)" :class="{active : (doc.id === $store.state.admin.editDoc.id)}")
        gb-heading(tag="h6" color="orange" ) {{ doc.title }}
        gb-heading(tag="small" color="grey") {{ dateFormat(doc.timestamp) }}
        gb-divider(color="yellow")
</template>

<script>
import dayjs from 'dayjs'
import CreateModal from '@/components/admin/CreateModal/CreateModal'
import CreatePostForm from '@/components/admin/CreateModal/CreatePostForm.vue'
import CreateTagForm from '@/components/admin/CreateModal/CreateTagForm'
import helpers from '~/mixins/helpers.js'

export default {
  components: {
    CreateModal,
    CreatePostForm,
    CreateTagForm
  },
  mixins: [helpers],
  computed: {
    dateFormat() {
      return (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
    },
    getDocs() {
      const ref = this.$store.state.admin.activeCategory
      return this.$store.state.docs[ref]
    }
  },
  mounted() {
    this.closeCreateDoc()
  },
  methods: {
    openCreateDoc() {
      this.$store.commit('TOGGLE_CREATE_MODAL', true)
    },
    closeCreateDoc() {
      this.$store.commit('TOGGLE_CREATE_MODAL', false)
    },
    editDoc(doc) {
      this.$store.commit('SET_EDIT_DOC', doc)
    }
  }
}
</script>

<style scoped>
.active {
  background: darkslategrey;
}
</style>
