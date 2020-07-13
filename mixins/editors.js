export default {
  methods: {
    selectIsCode(editor) {
      this.editors = this.editors.map((_editor) => {
        if (_editor.id === editor.id) {
          return { ..._editor, isCode: !_editor.isCode }
        }
        return _editor
      })
    },
    removeEditor(id) {
      this.editors = this.editors.filter((editor) => editor.id !== id)
    },
    addEditor() {
      this.editors = [
        ...this.editors,
        {
          id:
            this.editors.length === 0
              ? 1
              : this.editors[this.editors.length - 1].id + 1
        }
      ]
    },
    editorHandle(id, val) {
      console.log(id, val)
      this.editors = this.editors.map((editor) => {
        if (id === editor.id) {
          return { ...editor, body: val }
        }
        return editor
      })
    },
    cleanContentIfCode(editors) {
      return editors.map((editor) => {
        if (editor.isCode) {
          return {
            ...editor,
            body: editor.body
              .replace('<p>', '')
              .replace(`<pre class="ql-syntax" spellcheck="false">`, '')
              .replace(`</pre>`, '')
              .replace('</p>', '')
          }
        } else {
          return editor
        }
      })
    }
  }
}
