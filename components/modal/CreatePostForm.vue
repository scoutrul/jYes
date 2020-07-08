<template lang="pug">
  div
    gb-input(v-model="title" label="Заголовок")
    Editor(:value="body" :editorDataUp="editorHandle")

    gb-divider(color="blue")
    gb-button(@click="addEditor" :disabled="$store.state.loading") +Form
    gb-divider(color="white")
    template(v-for="(editor, i) in editors")
      div(:key="i")
        gb-checkbox(v-model="isCode[editor.id]" label="отобразить как код")
        Editor(value="editor.body" :editorDataUp="editorHandle" )
        gb-button(
          @click="removeEditor(editor.id)"
          :disabled="$store.state.loading"
          color="red"
          ) -
    gb-divider(color="white")
    gb-checkbox(v-for="tag in $store.state.docs.tags" v-model="tags[tag.id]" :key="tag.id" :name="tag.id" :label="tag.title")
    gb-divider(color="green")
    CreateTag
    gb-button(@click="createPost" :disabled="$store.state.loading") Создать

</template>
<script lang="ts">
import Vue from 'vue'
import CreateTag from '~/components/tags/CreateTag.vue'
import { TagInterface } from '~/types'
import Editor from '~/components/admin/Editor.vue'

export default Vue.extend({
  components: { CreateTag, Editor },
  data: () => ({
    title: 'new post',
    body: '',
    tags: {},
    editors: [],
    isCode: {}
  }),

  methods: {
    removeEditor(id: number) {
      this.editors = this.editors.filter((editor) => editor.id !== id)
    },
    addEditor() {
      this.editors = [
        ...this.editors,
        { id: this.editors.length === 0 ? 1 : this.editors.length + 1 }
      ]
    },
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
