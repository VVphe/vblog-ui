<template>
    <div id="EditPage" >
        <editor @submitArticle="submitArticle"></editor>   
        <descriptionbox v-if="showBox" class="description" @closeDBox="closeBox" @publishMyArticle="publishArticle"></descriptionbox>
    </div>
    
</template>

<script>
import editor from "./editor/Editor.vue"
import descriptionbox from "./editor/DescriptionBox.vue"
export default {
  data() {
    return {
        showBox: false,
        title: '',
        description: '',
        content: ''
    }
  },
  methods: {
      submitArticle: function(value) {
          this.title = value.title
          this.content = value.article
          this.showBox = true
      },
      closeBox: function(value) {
          this.showBox = false
      },
      publishArticle: function(description) {
          this.description = description
          this.showBox = false
          var formData = new FormData()
          formData.append('auth', 'vv')
          formData.append('title', this.artitle)
          formData.append('content', this.content)
          formData.append('description', this.description)
          formData.append('category', 'java')
          console.log(description)
          console.log(formData)
          this.$http.post('http://localhost:8080/article/publish', formData)
            .then((res) => {
                console.log(res)
            }, (err) => {
                console.log(err)
            })
      }
  },
  components: {
      editor,
      descriptionbox
  },
  mounted() {
    
  },
}
</script>

<style scoped>
.description {
   
}
</style>
