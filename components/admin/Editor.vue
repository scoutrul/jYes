<template lang="pug">
  no-ssr
    VueEditor(
      v-model="content"
      :editorToolbar="customToolbar"
    )
</template>

<script>
let VueEditor
if (process.client) {
  VueEditor = require('vue2-editor').VueEditor
} else {
  VueEditor = { component: { template: '<div></div>' } }
}

export default {
  components: {
    VueEditor
  },
  props: ['value', 'editorDataUp'],
  data: () => ({
    content: '<h1>Some initial content</h1>',
    customToolbar: [
      [{ header: [false, 1, 2] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video', 'code-block']
    ]
  }),
  watch: {
    content(val, old) {
      if (val && val !== old) {
        this.editorDataUp(val)
      }
    },
    value(val, old) {
      if (val.body !== old.body) {
        this.content = this.value.body
      }
    }
  }
  // mounted() {
  //   this.content = this.value.isCode
  //     ? `<pre>${this.value.body}</pre>`
  //     : this.value.body
  // }
}
</script>

<style lang="css" scoped>
@import 'vue2-editor/dist/vue2-editor.css';
@import 'quill/dist/quill.core.css';
@import 'quill/dist/quill.bubble.css';
@import 'quill/dist/quill.snow.css';
.quillWrapper {
  background: #fff;
}
</style>
