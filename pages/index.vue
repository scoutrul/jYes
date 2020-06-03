<template lang="pug">
  .container
    gb-button hello!
    gb-heading(tag='h1') how are you
</template>

<script>
import { fireDb } from '~/plugins/firebase.js'
export default {
  data() {
    return {
      writeSuccessful: false,
      tags: null
    }
  },
  async mounted() {
    await this.readFromFirestore()
  },
  methods: {
    async readFromFirestore() {
      const ref = fireDb.collection('tags')
      try {
        await ref.get().then((snapshot) => {
          const tags = []
          snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            tags.push(doc.data())
          })
          this.tags = tags
        })
      } catch (err) {
        console.log('Error getting documents', err)
      }
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  max-width: 900px;
}
</style>
