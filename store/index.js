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
  LOAD_START(state) {
    state.loading = true
  },
  LOAD_FINISH(state) {
    state.loading = false
  },

  SHOW_ALERT(state, { text, color = 'green' }) {
    state.alert.show = true
    state.alert.text = text
    state.alert.color = color
  },

  HIDE_ALERT(state) {
    state.alert.show = false
    state.alert.text = ''
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
      commit('SHOW_ALERT', {
        text: 'Error getDocsFromCollection documents',
        color: 'red'
      })
      console.log(err)
    } finally {
      commit('LOAD_FINISH')
    }
  },
  async createDoc({ dispatch, commit }, { ref, doc }) {
    commit('LOAD_START')
    const collection = await fireDb.collection(ref)
    try {
      await collection.add(doc).then(async (snapshot) => {
        commit('SHOW_ALERT', { text: 'Added document' })
        console.log('Added document', snapshot)
        await dispatch('fetchPosts', { ref })
      })
    } catch (err) {
      commit('SHOW_ALERT', { text: 'Error createDoc documents', color: 'red' })
      console.log(err)
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
          commit('SHOW_ALERT', {
            text: 'Document successfully deleted',
            color: 'yellow'
          })
        })
    } catch (err) {
      commit('SHOW_ALERT', {
        text: 'Error deleteDoc documents',
        color: 'red'
      })
      console.log(err)
    } finally {
      await dispatch('fetchPosts', { ref })
      commit('LOAD_FINISH')
    }
  }
}
