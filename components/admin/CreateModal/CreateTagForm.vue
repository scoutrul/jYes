<template lang="pug">
  div
    gb-input(v-model="title" label="Новый тэг")
    gb-button(@click="createTag" :disabled="$store.state.loading") Добавить таг
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    title: 'новый'
  }),

  methods: {
    async createTag() {
      await this.$store.dispatch('createDoc', {
        ref: 'tags',
        doc: { title: this.title }
      })
      await this.$store.commit('TOGGLE_MODAL', 'isCreateModal')
    }
  }
})
</script>
