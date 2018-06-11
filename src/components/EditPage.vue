<template>
    <div id="EditPage" >
        <editor :tags="tags" @submitArticle="submitArticle" @toAddTag="toAddTag"></editor>   
        <descriptionbox v-if="showBox" @closeDBox="closeBox" @publishMyArticle="publishArticle"></descriptionbox>
        <tagbox v-if="showTagBox" @closeDBox="closeTagBox" @addTag="addTag" ></tagbox>
    </div>
    
</template>

<script>
import editor from "./editor/Editor.vue"
import descriptionbox from "./editor/DescriptionBox.vue"
import tagbox from "./editor/TagBox.vue"
export default {
  data() {
    return {
        showBox: false,
        showTagBox: false,
        title: '',
        description: '',
        content: '',
        tags: [],
        category: '',
    }
  },
  methods: {
      submitArticle: function(value) {
          this.title = value.title
          this.content = value.article
          this.category = value.category
          this.showBox = true
      },
      closeBox: function(value) {
          this.showBox = false
      },
      closeTagBox: function(value) {
          this.showTagBox = false
      },
      addTag: function(value) {
          this.tags.push(value)
          this.showTagBox = false
      },
      toAddTag: function(value) {
          this.showTagBox = true
      },
      publishArticle: function(description) {
          this.description = description
          this.showBox = false
          var formData = new FormData()
          formData.append('auth', 'vv')
          formData.append('title', this.title)
          formData.append('content', this.content)
          formData.append('description', this.description)
          formData.append('category', this.category)
          formData.append('tags', this.tags)
          console.log(description)
          console.log(formData)
          this.$http.post('http://localhost:8080/article/publish', formData)
            .then((res) => {
                toastr.success("发表成功")
            }, (err) => {
                toastr.error("无此权限")
            })
      }
  },
  components: {
      editor,
      descriptionbox,
      tagbox
  },
  mounted() {
    this.showBox = false
  },
}
</script>

<style scoped>

</style>
