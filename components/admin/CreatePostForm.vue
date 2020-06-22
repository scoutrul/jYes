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

<script>
import CreateTag from '@/components/tags/CreateTag'
export default {
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
      const tags = []
      Object.entries(this.tags)
        .filter(([key, value]) => value)
        .forEach(([tagKey]) => {
          if (this.$store.state.docs.tags.some((_tag) => _tag.id === tagKey)) {
            tags.push(
              this.$store.state.docs.tags.find((_tag) => _tag.id === tagKey)
            )
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
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 100;
  top: -100%;
  left: 0;
  min-width: 100vw;
  height: 100%;
  background-color: rgba(33, 43, 59, 0.74);
  opacity: 0;
}
.modal.active {
  top: 0;
  opacity: 1;
}
.modal .container {
  position: relative;
  padding: 40px;
  margin: 10vh auto auto;
  background-color: #546e98;
  opacity: 0;
  transition: 0.2s ease-out 0.1s;
}
.modal.active .container {
  opacity: 1;
}
.closeBtn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
