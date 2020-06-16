<template lang="pug">
  .modal(:class="{active : opened}")
    .container
      gb-input(v-model="title" label="Заголовок")
      gb-textarea(v-model="body" label="Содержимое")
      gb-divider(color="blue")
      gb-checkbox(v-for="tag in $store.state.docs.tags" v-model="tags[tag.id]" :key="tag.id" :name="tag.id" :label="tag.title")
      gb-divider(color="green")
      CreateTag
      gb-button(@click="createPost" :disabled="$store.state.loading") add document
      gb-button(@click="closeModal").closeBtn x

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
    closeModal() {
      this.$parent.$emit('closeModal')
    },
    async createPost() {
      const tags = Object.entries(this.tags)
        .filter(([k, v]) => v)
        .map((tag) => tag[0])
      await this.$store.dispatch('createDoc', {
        ref: 'posts',
        doc: this.postData({
          title: this.title,
          tags: this.tags,
          body: this.body
        })
      })
      this.closeModal()
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
