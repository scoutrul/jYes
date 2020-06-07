import { fireDb } from '~/plugins/firebase.js'

export const state = () => ({
  docs: {
    posts: [],
    tags: []
  },
  loading: false,
  alert: {
    text: '',
    show: false
  }
})

export const mutations = {
  STORE_DOCS(state, { docs, ref }) {
    state.docs[ref] = docs
  },
  LOADING_START(state) {
    state.loading = true
  },
  LOADING_FINISH(state) {
    state.loading = false
  },

  SHOW_ALERT(store, { text, color = 'green' }) {
    store.alert.show = true
    store.alert.text = text
    store.alert.color = color
  },

  HIDE_ALERT(state) {
    state.alert.show = false
  }
}

export const actions = {
  async showAlert({ commit }, { text, color }) {
    await commit('SHOW_ALERT', {
      text,
      color
    })
    await setTimeout(() => {
      commit('HIDE_ALERT')
    }, 3000)
  },
  async fetchPosts({ commit, dispatch }, { ref }) {
    commit('LOADING_START')
    const collection = await fireDb.collection(ref)
    try {
      await collection.get().then((snapshot) => {
        const docs = []
        snapshot.forEach((doc) => {
          console.log(ref, doc.id, '=>', doc.data())
          docs.push({ ...doc.data(), id: doc.id })
        })
        commit('STORE_DOCS', { ref, docs })
      })
    } catch (err) {
      dispatch('showAlert', {
        text: 'Error getDocsFromCollection documents',
        color: 'red'
      })
      console.log(err)
    } finally {
      commit('LOADING_FINISH')
    }
  },
  async createDoc({ dispatch, commit }, { ref, doc }) {
    commit('LOADING_START')
    const collection = await fireDb.collection(ref)
    try {
      await collection.add(doc).then(async (snapshot) => {
        dispatch('showAlert', { text: 'Added document' })
        console.log('Added document', snapshot)
        await dispatch('fetchPosts', { ref })
      })
    } catch (err) {
      dispatch('showAlert', { text: 'Error createDoc documents', color: 'red' })
      console.log(err)
    } finally {
      commit('LOADING_FINISH')
    }
  },
  async deleteDoc({ dispatch, commit }, { ref, id }) {
    commit('LOADING_START')
    const collection = await fireDb.collection(ref)
    try {
      await collection
        .doc(id)
        .delete()
        .then(() => {
          dispatch('showAlert', {
            text: 'Document successfully deleted',
            color: 'yellow'
          })
        })
    } catch (err) {
      dispatch('showAlert', {
        text: 'Error deleteDoc documents',
        color: 'red'
      })
      console.log(err)
    } finally {
      await dispatch('fetchPosts', { ref })
      commit('LOADING_FINISH')
    }
  }
}
