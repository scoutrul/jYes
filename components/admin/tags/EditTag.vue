<template lang="pug">
  div(v-if="isEditable")
    gb-heading(tag='h3') {{ tag.id }}
    gb-input(v-model="title" label="Название")
    gb-divider(color="blue")
    gb-button(@click="updateTag" :disabled="$store.state.loading") Сохранить
    gb-button(@click="deleteTag({ id: tag.id})" :disabled="$store.state.loading") Delete
</template>

<script lang="ts">
import Vue from 'vue'
import helpers from '@/mixins/helpers.js'
import { TagInterface } from '@/types'

export default Vue.extend({
  mixins: [helpers],
  props: {
    tag: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    title: ''
  }),
  watch: {
    tag(val: TagInterface) {
      this.title = val.title
      this.isEditable = true
    }
  },
  beforeMount() {
    this.title = this.tag.title
    this.isEditable = true
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
          ...this.tag,
          title: this.title
        }
      })
    }
  }
})
</script>

<style scoped></style>
