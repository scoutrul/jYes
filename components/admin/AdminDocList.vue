<template lang="pug">
  div
    gb-button(size='micro' color='green' :full-width="true" @click="ToggleCreateDoc" :disabled="modalState('isCreateModal')") Добавить
    gb-divider(color="yellow")
    template(v-if="getDocs.length")
      .doc(v-for="doc in getDocs" :key="doc.id" @click="editDoc(doc)" :class="{active : (doc.id === $store.state.admin.editDoc.id)}")
        gb-heading(tag="h6" color="orange" ) {{ doc.title }}
        gb-heading(tag="small" color="grey") {{ dateFormat(doc.timestamp) }}
        gb-divider(color="yellow")
</template>

<script>
import dayjs from 'dayjs'
import helpers from '~/mixins/helpers.js'

export default {
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
    // this.ToggleCreateDoc()
  },
  methods: {
    ToggleCreateDoc() {
      this.$store.commit('TOGGLE_MODAL', 'isCreateModal')
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
