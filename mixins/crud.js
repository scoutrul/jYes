import { fireDb } from '~/plugins/firebase.js'

export default {
  data: () => ({
    loading: false,
    docs: {}
  }),
  methods: {
    async getDocsFromCollection({ ref }) {
      this.onLoading()
      const collection = await fireDb.collection(ref)
      try {
        await collection.get().then((snapshot) => {
          const tags = []
          snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data())
            tags.push({ ...doc.data(), id: doc.id })
          })
          this.docs[ref] = tags
        })
      } catch (err) {
        console.log('Error getDocsFromCollection documents', err)
      } finally {
        this.offLoading()
      }
    },
    async createDoc({ ref, doc }) {
      this.onLoading()
      const collection = await fireDb.collection(ref)
      try {
        await collection.add(doc).then(async (snapshot) => {
          console.log('Added document', snapshot)
          await this.getDocsFromCollection({ ref })
        })
      } catch (err) {
        console.log('Error createDoc documents', err)
      } finally {
        this.offLoading()
      }
    },
    async deleteDoc({ ref, id }) {
      this.onLoading()
      const collection = await fireDb.collection(ref)
      try {
        await collection
          .doc(id)
          .delete()
          .then(() => {
            console.log('Document successfully deleted!')
          })
      } catch (err) {
        console.log('Error deleteDoc documents', err)
      } finally {
        await this.getDocsFromCollection({ ref })
        this.offLoading()
      }
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
    },

    onLoading() {
      this.loading = true
    },
    offLoading() {
      this.loading = false
    }
  }
}
