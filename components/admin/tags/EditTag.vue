<template lang="pug">
  div(v-if="isEditable")
    gb-heading(tag='h3') {{ doc.id }}
    gb-input(v-model="title" label="Название")
    gb-divider(color="blue")
    gb-button(@click="updateTag" :disabled="$store.state.loading") Сохранить
    gb-button(@click="deleteTag({ id: doc.id})" :disabled="$store.state.loading") Delete
</template>

<script>
import helpers from '@/mixins/helpers.js'
export default {
  mixins: [helpers],
  props: {
    doc: {
      type: Object,
      default: () => {
        return {
          title: 'Title',
          id: 123
        }
      }
    }
  },
  data: () => ({
    title: ''
  }),
  watch: {
    doc(val, old) {
      this.title = val.title
      this.isEditable = true
    }
  },

  methods: {
    async deleteTag({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'tags',
        id
      })
      this.isEditable = false
    },
    async updateTag() {
      await this.$store.dispatch('updateDoc', {
        ref: 'tags',
        doc: {
          ...this.doc,
          title: this.title
        }
      })
    }
  }
}
</script>

<style scoped></style>
