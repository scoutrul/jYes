<template lang="pug">
  div(v-if="post.id")
    gb-heading(tag='h3') {{ post.id }}
    gb-input(v-model="title" label="Заголовок")
    gb-button(@click="addEditor" :disabled="$store.state.loading") +Form

    div(v-for="(editor) in editors" :key="editor.id")
      gb-checkbox(@change="selectIsCode(editor)" :value="editor.isCode" label="отобразить как код")
      Editor(:value="editor.body" :editorDataUp="(val) => editorHandle(editor.id, val)" )
      gb-button(
        @click="removeEditor(editor.id)"
        :disabled="$store.state.loading"
        color="red"
        ) -
    gb-divider(color="blue")
    .tagList
      .tag(v-for="tag in getTags(tags)" :key="tag.id" v-if="tag.id")
        gb-checkbox(:label="tag.title" @change="selectTag(tag)" :value="tag.selected")
        gb-button(size='micro' color='red' @click="deleteTag({ id: tag.id})") x
    CreateTag
    gb-button(@click="updatePost" :disabled="$store.state.loading") Сохранить
    gb-button(@click="deleteDoc({ id: post.id})" :disabled="$store.state.loading") Delete
</template>

<script lang="ts">
import Vue from 'vue'
import CreateTag from '@/components/tags/CreateTag.vue'
import Editor from '@/components/admin/Editor.vue'
import helpers from '@/mixins/helpers.js'
import editorsMixin from '@/mixins/editors.js'
import { IPost, ITag, ITagIds, ITags, IContents } from '@/types'

export default Vue.extend({
  components: { CreateTag, Editor },
  mixins: [helpers, editorsMixin],
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  data: (): any => ({
    editors: [
      {
        id: 0,
        body: ''
      }
    ],
    title: 'new post',
    tags: {}
  }),
  computed: {},
  watch: {
    post(val: IPost, old: IPost) {
      if (val.id !== old.id) {
        this.tags = this.markSelectedTags(val.tags)
        this.title = val.title
        this.editors = val.content
      }
    }
  },
  beforeMount() {
    this.tags = this.markSelectedTags(this.post.tags)
    this.title = this.post.title
    this.editors = this.post.content
  },
  methods: {
    getTags(tags: ITags) {
      return tags.map((tag: string) => {
        const tempTag = this.$store.state.docs.tags.find(
          (_tag: ITag) => _tag.id === tag.id
        )
        return tempTag
      })
    },

    markSelectedTags(tags: ITagIds = []) {
      const docTags = tags
      const tagList = this.$store.state.docs.tags
      return tagList.map((tag: ITag) => {
        const tempTag = this.$store.state.docs.tags.find(
          (_tag: ITag) => _tag.id === tag.id
        )
        tempTag.selected = docTags.some((tagId: string) => tagId === tag.id)
        return tempTag
      })
    },
    selectTag(selectedTag: ITag) {
      const tempTags: any = []
      this.$store.state.docs.tags.forEach((tag: ITag) => {
        const tempTag = this.$store.state.docs.tags.find(
          (_tag: ITag) => _tag.id === tag.id
        )
        if (tag.id === selectedTag.id) {
          tempTag.selected = !tempTag.selected
        }
        tempTags.push(tempTag)
      })
      this.tags = tempTags
    },
    async deleteTag({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'tags',
        id
      })
    },
    async deleteDoc({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'posts',
        id
      })
    },
    async updatePost() {
      const cleanTags: ITagIds = this.tags
        .filter((tag: ITag) => tag.selected)
        .map((tag: ITag) => tag.id)

      const content: IContents = this.cleanContentIfCode(this.editors)

      await this.$store.dispatch('updateDoc', {
        ref: 'posts',
        doc: {
          ...this.post,
          title: this.title,
          content,
          tags: cleanTags
        }
      })
    }
  }
})
</script>

<style scoped></style>
