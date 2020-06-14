<template lang="pug">
  div
    CreatePost(:tagList="$store.state.docs.tags" v-if="newDocModal")
    gb-button(size='micro' color='green' :full-width="true" @click="openCreateDoc()") Добавить
    gb-divider(color="yellow")
    .doc(v-for="doc in docs" :key="doc.id" @click="editDoc(doc)")
      gb-heading(tag="h6" color="orange") {{ doc.title }}
      gb-heading(tag="small" color="grey") {{ dateFormat(doc.timestamp) }}
      gb-divider(color="yellow")
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: ['docs'],
  data: () => ({
    newDocModal: false
  }),
  components: {
    CreatePost: ()  => import('~/components/CreatePost')
  },
  computed: {
    dateFormat() {
      return (date) => {
        return dayjs(date).format('DD/MM/YYYY')
      }
    }
  },
  methods: {
    openCreateDoc(){
      this.newDocModal = true
    },
    editDoc(doc){
      this.$store.commit('SET_EDIT_DOC', doc)
    }
  }
}
</script>

<style scoped></style>
