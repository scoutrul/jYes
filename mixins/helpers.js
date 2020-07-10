export default {
  data: () => ({
    editors: [
      {
        id: 0,
        body: '',
        isCode: false
      }
    ],
    title: 'new post',
    tags: {}
  }),
  methods: {
    checkCategory(ref) {
      return ref === this.$store.state.admin.activeCategory
    },
    modalState(modalProp) {
      return this.$store.state.admin[modalProp]
    },
    removeEditor(id) {
      this.editors = this.editors.filter((editor) => editor.id !== id)
    },
    addEditor() {
      this.editors = [
        ...this.editors,
        { id: this.editors.length === 0 ? 1 : this.editors.length }
      ]
    },
    editorHandle(id, val) {
      this.editors[id].body = val
    },
    cleanContentIfCode(editors) {
      return editors.map((editor) => {
        if (editor.isCode) {
          return {
            ...editor,
            body: editor.body.replace('<p>', '').replace('</p>', '')
          }
        } else {
          return editor
        }
      })
    }
  }
}
