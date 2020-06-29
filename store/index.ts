import { ActionTree, MutationTree } from 'vuex'
import dayjs from 'dayjs'
import { fireDb } from '~/plugins/firebase.js'

export const state: any = () => ({
  docs: {
    posts: [],
    tags: []
  },
  loading: false,
  alert: {
    text: '',
    show: false
  },
  admin: {
    confirm: {},
    isCreateModal: false,
    isDeleteModal: false,
    editDoc: {},
    activeCategory: 'posts',
    categories: [
      { ref: 'posts', name: 'Посты' },
      { ref: 'tags', name: 'Теги' }
    ]
  }
})
// eslint-disable-next-line no-undef
export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  STORE_CONFIRM_DOC(state, doc) {
    state.admin.confirm = { ...state.admin.confirm, ...doc }
  },
  TOGGLE_MODAL(state, modalProp) {
    state.admin[modalProp] = !state.admin[modalProp]
  },
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
  },

  SET_EDIT_DOC(state, doc) {
    state.admin.editDoc = doc
  },
  SET_CATEGORY(state, ref) {
    state.admin.activeCategory = ref
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async showAlert({ commit }, { text, color }) {
    await commit('SHOW_ALERT', {
      text,
      color
    })
    await setTimeout(() => {
      commit('HIDE_ALERT')
    }, 3000)
  },
  async fetchPostsWhereTagIds({ commit, dispatch }, { tags }) {
    if (!tags.length) return

    commit('LOADING_START')
    const collection = await fireDb.collection('posts')
    const docs: any = []
    console.log(tags)
    try {
      await collection
        .where('tags', 'in', [tags])
        .get()
        .then((snapshot) => {
          console.log(snapshot)

          snapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id })
          })
          commit('STORE_DOCS', { ref: 'posts', docs })
        })
    } catch (err) {
      dispatch('showAlert', {
        text: 'Error fetchPostsWhereTags documents',
        color: 'red'
      })
      console.log(err)
    } finally {
      commit('LOADING_FINISH')
    }
  },
  async fetchDocs({ commit, dispatch }, { ref }) {
    commit('LOADING_START')
    const collection = await fireDb.collection(ref)
    try {
      await collection.get().then((snapshot) => {
        const docs: any = []
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
    const timestamp = dayjs().format()
    const docWithDate = { ...doc, timestamp }

    commit('LOADING_START')
    const collection = await fireDb.collection(ref)
    try {
      await collection.add(docWithDate).then(async (snapshot) => {
        await dispatch('fetchDocs', { ref })
        dispatch('showAlert', { text: 'Added document' })
        console.log('Added document', snapshot)
      })
    } catch (err) {
      dispatch('showAlert', { text: 'Error createDoc documents', color: 'red' })
      console.log(err)
    } finally {
      commit('LOADING_FINISH')
    }
  },
  async updateDoc({ dispatch, commit }, { ref, doc }) {
    console.log(ref, doc)
    const timestamp = dayjs().format()
    const docWithDate = { ...doc, timestamp }

    commit('LOADING_START')
    const collection = await fireDb.collection(ref).doc(doc.id)
    try {
      await collection.update(docWithDate).then(async () => {
        dispatch('showAlert', { text: 'Updated document' })
        await dispatch('fetchDocs', { ref })
      })
    } catch (err) {
      dispatch('showAlert', { text: 'Error update documents', color: 'red' })
      console.log(err)
    } finally {
      commit('LOADING_FINISH')
    }
  },

  async deleteDoc({ dispatch, commit }, { ref, id, confirmed = false }) {
    console.log(ref, id, confirmed)
    if (!confirmed) {
      const name = 'isDeleteModal'
      commit('STORE_CONFIRM_DOC', { ref, id, name })
      console.log('false')
      commit('TOGGLE_MODAL', name)
    } else {
      console.log('true')
      commit('LOADING_START')

      const collection = await fireDb.collection(ref)
      try {
        await collection
          .doc(id)
          .delete()
          .then(async () => {
            await dispatch('fetchDocs', { ref })
            dispatch('showAlert', {
              text: 'Document successfully deleted',
              color: 'yellow'
            })
            commit('SET_EDIT_DOC', {})
          })
      } catch (err) {
        dispatch('showAlert', {
          text: 'Error deleteDoc documents',
          color: 'red'
        })
        console.log(err)
      } finally {
        commit('LOADING_FINISH')
      }
    }
  }
}