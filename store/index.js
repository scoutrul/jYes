import { fireDb } from '~/plugins/firebase.js'

export const state = () => ({
  docs: {
    posts: [],
    tags: []
  },
  loading: false
})

export const mutations = {
  STORE_DOCS(state, { docs, ref }) {
    state.docs[ref] = docs
  },
  LOAD_START(state) {
    state.loading = true
  },
  LOAD_FINISH(state) {
    state.loading = false
  }
}

export const actions = {
  async fetchPosts({ commit, dispatch }, { ref }) {
    commit('LOAD_START')
    const collection = await fireDb.collection(ref)
    try {
      await collection.get().then((snapshot) => {
        const docs = []
        snapshot.forEach((doc) => {
          console.log(doc.id, '=>', doc.data())
          docs.push({ ...doc.data(), id: doc.id })
        })
        commit('STORE_DOCS', { ref, docs })
      })
    } catch (err) {
      console.log('Error getDocsFromCollection documents', err)
    } finally {
      commit('LOAD_FINISH')
    }
  },
  async createDoc({ dispatch, commit }, { ref, doc }) {
    commit('LOAD_START')
    const collection = await fireDb.collection(ref)
    try {
      await collection.add(doc).then(async (snapshot) => {
        console.log('Added document', snapshot)
        await dispatch('fetchPosts', { ref })
      })
    } catch (err) {
      console.log('Error createDoc documents', err)
    } finally {
      commit('LOAD_FINISH')
    }
  },
  async deleteDoc({ dispatch, commit }, { ref, id }) {
    commit('LOAD_START')
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
      await dispatch('fetchPosts', { ref })
      commit('LOAD_FINISH')
    }
  }
}
