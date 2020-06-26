<template lang="pug">
  div
    gb-input(v-model="title" label="Заголовок")
    gb-textarea(v-model="body" label="Содержимое")
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

export default Vue.extend({
  components: { CreateTag },
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    title: 'new post',
    body: 'hello world!',
    tags: {}
  }),

  methods: {
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
        doc: this.postData({
          title: this.title,
          tags,
          body: this.body
        })
      })
      await this.$store.commit('TOGGLE_CREATE_MODAL', false)
    },
    postData({
      title = 'new post',
      authorId = 'admin',
      tags = ['other'],
      body = 'body'
    }) {
      return {
        title,
        authorId,
        tags,
        body
      }
    }
  }
})
</script>
