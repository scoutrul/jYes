<template lang="pug">
  .container
    gb-input(v-model="title" label="Заголовок")
    gb-textarea(v-model="body" label="Содержимое")
    gb-divider(color="blue")
    span(v-for="tag in tagList" )
      gb-checkbox(v-model="tags[tag.id]" :key="tag.id" :name="tag.name" :label="tag.title")
      gb-button(size='micro' @click="deleteTag({ id: tag.id})") Удалить таг
    CreateTag
    gb-divider(color="green")
    gb-button(@click="createPost()") Добавить пост

</template>

<script>
import CreateTag from '~/components/CreateTag'
export default {
  components: { CreateTag },
  props: ['tagList'],
  data: () => ({
    title: 'new post',
    body: 'hello world!',
    tags: {}
  }),

  methods: {
    async createPost() {
      const tags = Object.entries(this.tags)
        .filter(([k, v]) => v)
        .map((tag) => tag[0])
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
    async deleteTag({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'tags',
        id
      })
    }
  }
}
</script>

<style></style>
