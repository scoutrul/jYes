<template lang="pug">
  div
    CreateModal(:opened="newDocModal")
      CreatePostModal(v-if="checkCategory('post')")
      CreateTag(v-if="checkCategory('tags')")
    gb-button(size='micro' color='green' :full-width="true" @click="openCreateDoc" :disabled="newDocModal") Добавить
    gb-divider(color="yellow")
    template(v-if="getDocs.length")
      .doc(v-for="doc in getDocs" :key="doc.id" @click="editDoc(doc)" :class="{active : (doc.id === $store.state.admin.editDoc.id)}")
        gb-heading(tag="h6" color="orange" ) {{ doc.title }}
        gb-heading(tag="small" color="grey") {{ dateFormat(doc.timestamp) }}
        gb-divider(color="yellow")
</template>

<script>
import dayjs from 'dayjs'
import CreateModal from '~/components/admin/CreateModal'
import CreatePostModal from '~/components/admin/CreatePostModal'
import CreateTag from '~/components/tags/CreateTag'
import helpers from '~/mixins/helpers.js'

export default {
  components: {
    CreateModal,
    CreatePostModal,
    CreateTag
  },
  mixins: [helpers],
  data: () => ({
    newDocModal: false
  }),
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
    this.$on('closeModal', this.closeCreateDoc)
  },
  methods: {
    openCreateDoc() {
      this.newDocModal = true
    },
    closeCreateDoc() {
      this.newDocModal = false
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
