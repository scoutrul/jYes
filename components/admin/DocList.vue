<template lang="pug">
  div
    CreatePostModal(:opened="newDocModal")
    gb-button(size='micro' color='green' :full-width="true" @click="openCreateDoc" :disabled="newDocModal") Добавить
    gb-divider(color="yellow")
    template(v-if="$store.state.docs.posts.length")
      .doc(v-for="doc in $store.state.docs.posts" :key="doc.id" @click="editDoc(doc)" :class="{active : (doc.id === $store.state.admin.editDoc.id)}")
        gb-heading(tag="h6" color="orange" ) {{ doc.title }}
        gb-heading(tag="small" color="grey") {{ dateFormat(doc.timestamp) }}
        gb-divider(color="yellow")
</template>

<script>
import dayjs from 'dayjs'
import CreatePostModal from '~/components/admin/CreatePostModal'

export default {
  components: {
    CreatePostModal
  },
  data: () => ({
    newDocModal: false
  }),
  computed: {
    dateFormat() {
      return (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
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
