<template lang="pug">
  div
    gb-heading(tag='h3') {{ doc.id }}
    gb-input(v-model="title" label="Заголовок")
    gb-textarea(v-model="body" label="Содержимое")
    gb-divider(color="blue")
    .tagList(v-if="getTags.length")
      .tag(v-for="tag in getTags" :key="tag.id")
        gb-checkbox(:label="tag.title" @change="selectTag(tag)" :value="tag.selected")
        gb-button(size='micro' color='red' @click="deleteTag({ id: tag.id})") x
    CreateTag
    gb-button(@click="updatePost()") Сохранить
    gb-button(@click="deleteDoc({ id: doc.id})") Delete
</template>

<script>
import TagList from '~/components/tags/TagList'
import CreateTag from '@/components/tags/CreateTag'
export default {
  components: { TagList, CreateTag },
  props: {
    doc: {
      type: Object,
      default: () => {
        return {
          title: 'Title',
          id: 123,
          tags: [{ title: 'some', id: 123 }],
          body: 'body'
        }
      }
    }
  },
  data: () => ({
    tags: [{ title: '', id: 123 }],
    title: '',
    body: '',
    selectedTags: [],
    tagsmodel: {}
  }),
  computed: {
    getTags() {
      const docTags = this.doc.tags
      const tagList = this.$store.state.docs.tags
      const list = tagList.map((item) => {
        const tag = item
        // eslint-disable-next-line no-prototype-builtins
        if (docTags && docTags.hasOwnProperty(item.id) && docTags[item.id]) {
          tag.selected = true
        } else {
          tag.selected = false
        }
        return tag
      })

      return list
    }
  },
  watch: {
    doc(val, old) {
      const { title, id, tags, body } = val
      this.title = title
      this.id = id
      this.tags = tags
      this.body = body
    }
  },
  mounted() {
    const { title, id, tags, body } = this.doc
    this.title = title
    this.id = id
    this.tags = tags
    this.body = body
  },
  methods: {
    async deleteTag({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'tags',
        id
      })
    },
    selectTag(tag, event) {
      this.selectedTags = [this.selectedTags, tag]
    },
    async deleteDoc({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'posts',
        id
      })
    },
    async updatePost() {
      const tags = Object.entries(this.selectedTags)
        .filter(([k, v]) => v)
        .map((k) => this.tags[k])
      await this.$store.dispatch('updateDoc', {
        ref: 'posts',
        doc: this.postData({
          ...this.doc,
          title: this.title,
          body: this.body,
          tags
        })
      })
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
}
</script>

<style scoped></style>
