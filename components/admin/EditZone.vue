<template lang="pug">
  div
    gb-heading(tag='h3') {{doc.title}}
    .body {{ doc.body}}
    TagList(:tags="doc.tags")
    gb-button(@click="createPost()") Добавить пост
    gb-button(@click="deletedoc({ id: doc.id})") Delete
</template>

<script>
import TagList from '~/components/tags/TagList'
export default {
  components: { TagList },
  props: {
    doc: {
      type: Object,
      default: () => {
        return { title: 'Title', id: 123, tags: ['notag'], body: 'body' }
      }
    }
  },
  data: () => ({
    title: 'new post',
    body: 'hello world!',
    tagsmodel: {},
    tags: {}
  }),
  mounted() {
    this.title = this.doc.title
    this.body = this.doc.body
    this.tags = this.doc.tags
  },
  methods: {
    async createPost() {
      const tags = Object.entries(this.tagsmodel)
        .filter(([k, v]) => v)
        .map((k) => this.tags[k])
      await this.$store.dispatch('createDoc', {
        ref: 'posts',
        doc: this.postData({ title: 'nezxt shit', tags })
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
    },
    async deletePost({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'posts',
        id
      })
    }
  }
}
</script>

<style scoped></style>
