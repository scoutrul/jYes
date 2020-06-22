<template lang="pug">
  div(v-if="isEditable")
    gb-heading(tag='h3') {{ doc.id }}
    gb-input(v-model="title" label="Заголовок")
    gb-textarea(v-model="body" label="Содержимое")
    gb-divider(color="blue")
    .tagList(v-if="getTags.length")
      .tag(v-for="tag in getTags" :key="tag.id")
        gb-checkbox(:label="tag.title" @change="selectTag(tag)" :value="tag.selected")
        gb-button(size='micro' color='red' @click="deleteTag({ id: tag.id})") x
    CreateTag
    gb-button(@click="updatePost" :disabled="$store.state.loading") Сохранить
    gb-button(@click="deleteDoc({ id: doc.id})" :disabled="$store.state.loading") Delete
</template>

<script>
import TagList from '~/components/tags/TagList'
import CreateTag from '@/components/tags/CreateTag'
import helpers from '~/mixins/helpers.js'
export default {
  components: { TagList, CreateTag },
  mixins: [helpers],
  props: {
    doc: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    tags: [],
    title: '',
    body: ''
  }),
  computed: {
    getTags() {
      const docTags = this.doc.tags || []
      const tagList = this.$store.state.docs.tags
      const tagsWithSelected = []
      tagList.forEach((tag) => {
        if (docTags.some((_tag) => _tag.id === tag.id)) {
          tag.selected = true
        } else {
          tag.selected = false
        }
        tagsWithSelected.push(tag)
      })
      return tagsWithSelected
    }
  },
  mounted() {
    this.tags = this.doc.tags
    this.title = this.doc.title
    this.body = this.doc.body
  },

  methods: {
    selectTag(selectedTag) {
      const tempTags = []
      this.tags.forEach((tag) => {
        const tempTag = tag
        if (tag.id === selectedTag.id) {
          if (tempTag.selected) {
            tempTag.selected = false
          } else {
            tempTag.selected = true
          }
        }
        tempTags.push(tempTag)
      })
      this.tags = tempTags
    },
    async deleteTag({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'tags',
        id
      })
    },
    async deleteDoc({ id }) {
      await this.$store.dispatch('deleteDoc', {
        ref: 'posts',
        id
      })
      this.isEditable = false
    },
    async updatePost() {
      await this.$store.dispatch('updateDoc', {
        ref: 'posts',
        doc: {
          ...this.doc,
          title: this.title,
          body: this.body,
          tags: this.tags
        }
      })
    }
  }
}
</script>

<style scoped></style>
