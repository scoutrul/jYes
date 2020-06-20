<template lang="pug">
  div
    gb-heading(tag='h3') {{ doc.id }}
    gb-input(v-model="title" label="Название")
    gb-divider(color="blue")
    gb-button(@click="updateTag()") Сохранить
    gb-button(@click="deleteTag({ id: doc.id})") Delete
</template>

<script>
export default {
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
    }
  },
  mounted() {
    this.title = this.doc.title
  },
  methods: {
    async deleteTag({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'tags',
        id
      })
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
