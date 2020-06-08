<template lang="pug">
  .container
    gb-input(v-model="title" label="Заголовок")
    gb-textarea(v-model="body" label="Содержимое")
    gb-divider(color="blue")
    .tagList
      .tag(v-for="tag in tagList" :key="tag.id")
        gb-checkbox(v-model="tagsmodel[tag.id]" :label="tag.title" @change="selectTag(tag)")
        gb-button(size='micro' color='red' @click="deleteTag({ id: tag.id})") x
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
    tagsmodel: {},
    tags: {}
  }),

  methods: {
    selectTag(tag, event) {
      this.tags[tag.id] = tag
    },
    async createPost() {
      const tags = Object.entries(this.tagsmodel)
        .filter(([k, v]) => v)
        .map(([k, v]) => this.tags[k])
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
