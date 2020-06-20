export default {
  methods: {
    checkCategory(ref) {
      return ref === this.$store.state.admin.activeCategory
    }
  }
}
