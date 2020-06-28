export default {
  methods: {
    checkCategory(ref) {
      return ref === this.$store.state.admin.activeCategory
    },
    modalState(modalProp) {
      return this.$store.state.admin[modalProp]
    }
  },
  computed: {},
  // watch: {
  //   doc(val) {
  //     const { title, id, tags, body } = val
  //     this.title = title
  //     this.id = id
  //     this.tags = tags
  //     this.body = body
  //     this.isEditable = true
  //   }
  // },

  data: () => ({
    isEditable: true
  })
}
