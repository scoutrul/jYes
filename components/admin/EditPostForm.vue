<template lang="pug">
  div(v-if="post.id")
    gb-heading(tag='h3') {{ post.id }}
    gb-input(v-model="title" label="Заголовок")
    Editor(:value="body" :editorDataUp="editorHandle")
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
import {
  PostInterface,
  TagInterface,
  TagIdsInterface,
  TagsInterface
} from '@/types'
export default Vue.extend({
  components: { CreateTag, Editor },
  mixins: [helpers],
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    tags: [],
    title: '',
    body: ''
  }),
  computed: {},
  watch: {
    post(val: PostInterface) {
      this.tags = this.markSelectedTags(val.tags)
      this.title = val.title
      this.body = val.body
    }
  },
  beforeMount() {
    this.tags = this.markSelectedTags(this.post.tags)
    this.title = this.post.title
    this.body = this.post.body
  },
  methods: {
    getTags(tags: TagsInterface) {
      return tags.map((tag: string) => {
        const tempTag = this.$store.state.docs.tags.find(
          (_tag: TagInterface) => _tag.id === tag.id
        )
        return tempTag
      })
    },
    editorHandle(val: string) {
      this.body = val
    },

    markSelectedTags(tags: TagIdsInterface = []) {
      const docTags = tags
      const tagList = this.$store.state.docs.tags
      return tagList.map((tag: TagInterface) => {
        const tempTag = this.$store.state.docs.tags.find(
          (_tag: TagInterface) => _tag.id === tag.id
        )
        tempTag.selected = docTags.some((tagId: string) => tagId === tag.id)
        return tempTag
      })
    },
    selectTag(selectedTag: TagInterface) {
      const tempTags: any = []
      this.$store.state.docs.tags.forEach((tag: TagInterface) => {
        const tempTag = this.$store.state.docs.tags.find(
          (_tag: TagInterface) => _tag.id === tag.id
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
      const cleanTags: TagIdsInterface = this.tags
        .filter((tag: TagInterface) => tag.selected)
        .map((tag: TagInterface) => tag.id)
      await this.$store.dispatch('updateDoc', {
        ref: 'posts',
        doc: {
          ...this.post,
          title: this.title,
          body: this.body,
          tags: cleanTags
        }
      })
    }
  }
})
</script>

<style scoped></style>
