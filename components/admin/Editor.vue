<template>
  <ckeditor
    @input="editorDataUp"
    :editor="editor"
    :config="editorConfig"
    :value="value"
  ></ckeditor>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default {
  name: 'Editor',
  props: ['value', 'editorDataUp'],
  data: () => ({
    editor: ClassicEditor,
    editorConfig: {
      // The configuration of the editor.
    }
  })
}
</script>
