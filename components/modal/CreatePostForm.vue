<template lang="pug">
  div
    gb-input(v-model="title" label="Заголовок")
    gb-divider(color="blue")
    gb-button(@click="addEditor" :disabled="$store.state.loading") +Form
    gb-divider(color="white")
    template(v-for="(editor) in editors")
      div(:key="editor.id")
        gb-checkbox(v-model="editors[editor.id].isCode" label="отобразить как код")
        Editor(value="" :editorDataUp="(val) => editorHandle(editor.id, val)" )
        gb-button(
          @click="removeEditor(editor.id)"
          :disabled="$store.state.loading"
          color="red"
          ) -
    gb-divider(color="white")
    gb-checkbox(
      v-for="tag in $store.state.docs.tags"
      v-model="tags[tag.id]"
      :key="tag.id"
      :name="tag.id"
      :label="tag.title")
    gb-divider(color="green")
    CreateTag
    gb-button(@click="createPost" :disabled="$store.state.loading") Создать

</template>
<script lang="ts">
import Vue from 'vue'
import CreateTag from '~/components/tags/CreateTag.vue'
import { ITagIds, ITag, IContents } from '~/types'
import Editor from '~/components/admin/Editor.vue'
import helpers from '@/mixins/helpers.js'

export default Vue.extend({
  components: { CreateTag, Editor },
  mixins: [helpers],
  data: (): any => ({
    editors: [
      {
        id: 0,
        body: '',
        isCode: false
      }
    ],
    title: 'new post',
    tags: {}
  }),

  methods: {
    async createPost() {
      const tags: ITagIds = []
      const content: IContents = this.cleanContentIfCode(this.editors)

      Object.entries(this.tags)
        .filter(([key, value]) => key && value)
        .forEach(([tagKey]) => {
          if (
            this.$store.state.docs.tags.some((_tag: ITag) => _tag.id === tagKey)
          ) {
            tags.push(tagKey)
          }
        })
      await this.$store.dispatch('createDoc', {
        ref: 'posts',
        doc: {
          title: this.title,
          tags,
          content
        }
      })
      await this.$store.commit('TOGGLE_MODAL', 'isCreateModal')
    }
  }
})
</script>
