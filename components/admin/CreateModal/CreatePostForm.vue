<template lang="pug">
  div
    gb-input(v-model="title" label="Заголовок")
    Editor(:value="body" :editorDataUp="editorHandle")
    gb-divider(color="blue")
    gb-checkbox(v-for="tag in $store.state.docs.tags" v-model="tags[tag.id]" :key="tag.id" :name="tag.id" :label="tag.title")
    gb-divider(color="green")
    CreateTag
    gb-button(@click="createPost" :disabled="$store.state.loading") add document

</template>
<script lang="ts">
import Vue from 'vue'
import CreateTag from '@/components/admin/tags/CreateTag.vue'
import { TagInterface } from '@/types'
import Editor from '@/components/admin/Editor.vue'

export default Vue.extend({
  components: { CreateTag, Editor },
  data: () => ({
    title: 'new post',
    body: '',
    tags: {}
  }),

  methods: {
    editorHandle(val: string) {
      this.body = val
    },
    async createPost() {
      const tags: any = []
      Object.entries(this.tags)
        .filter(([key, value]) => key && value)
        .forEach(([tagKey]) => {
          if (
            this.$store.state.docs.tags.some(
              (_tag: TagInterface) => _tag.id === tagKey
            )
          ) {
            tags.push(tagKey)
          }
        })
      await this.$store.dispatch('createDoc', {
        ref: 'posts',
        doc: {
          title: this.title,
          tags,
          body: this.body
        }
      })
      await this.$store.commit('TOGGLE_MODAL', 'isCreateModal')
    }
  }
})
</script>
