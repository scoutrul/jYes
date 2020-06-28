export default {
  methods: {
    checkCategory(ref) {
      return ref === this.$store.state.admin.activeCategory
    },
    modalState(modalProp) {
      return this.$store.state.admin[modalProp]
    }
  }
}
