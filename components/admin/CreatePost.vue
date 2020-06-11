<template lang="pug">
  .container
    gb-input(v-model="title" label="Заголовок")
    gb-textarea(v-model="body" label="Содержимое")
    gb-divider(color="blue")
    gb-checkbox(v-for="tag in $store.state.docs.tags" v-model="tags[tag.id]" :key="tag.id" :name="tag.name" :label="tag.title")
    gb-divider(color="green")
    gb-button(@click="createPost()") add document

</template>

<script>
export default {
  props: ['tagList'],
  data: () => ({
    title: 'new post',
    body: 'hello world!',
    tags: {},
  }),

  methods: {
    async createPost() {
      const tags = Object.entries(this.tags)
        .filter(([k, v]) => v)
        .map((tag) => tag[0])
      await this.$store.dispatch('createDoc', {
        ref: 'posts',
        doc: this.postData({ title: 'nezxt shit', tags }),
      })
    },
    postData({
      title = 'new post',
      authorId = 'admin',
      tags = ['other'],
      body = 'body',
    }) {
      return {
        title,
        authorId,
        tags,
        body,
      }
    },
  },
}
</script>

<style></style>
