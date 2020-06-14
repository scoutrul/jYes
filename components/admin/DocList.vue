<template lang="pug">
  div
    CreatePost(:opened="newDocModal")
    gb-button(size='micro' color='green' :full-width="true" @click="openCreateDoc" :disabled="newDocModal") Добавить
    gb-divider(color="yellow")
    .doc(v-for="doc in $store.state.docs.posts" :key="doc.id" @click="editDoc(doc)")
      gb-heading(tag="h6" color="orange") {{ doc.title }}
      gb-heading(tag="small" color="grey") {{ dateFormat(doc.timestamp) }}
      gb-divider(color="yellow")
</template>

<script>
import dayjs from 'dayjs'
import CreatePost from '~/components/admin/CreatePost'

export default {
  components: {
    CreatePost
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

<style scoped></style>
