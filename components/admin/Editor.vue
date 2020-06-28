<template>
  <ckeditor
    :editor="editor"
    :config="editorConfig"
    :value="value || ''"
    :disabled="$store.state.loading"
    @input="editorDataUp"
  ></ckeditor>
</template>

<script>
let ClassicEditor
let CKEditor
if (process.client) {
  ClassicEditor = require('@ckeditor/ckeditor5-build-classic')
  CKEditor = require('@ckeditor/ckeditor5-vue')
} else {
  CKEditor = { component: { template: '<div></div>' } }
}
export default {
  name: 'Editor',
  components: {
    ckeditor: CKEditor.component
  },
  props: ['value', 'editorDataUp'],
  data: () => ({
    editor: ClassicEditor,
    editorConfig: {
      // The configuration of the editor.
    }
  })
}
</script>

<style>
.ck.ck-content {
  min-height: 200px;
}
</style>
