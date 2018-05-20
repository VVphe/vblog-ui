<template>
  <div id="Editor">
    <!-- <div class="wrapper wrapper-content"> -->
        <div class="row">
            <div class="col-lg-12">
            <div class="ibox float-e-margins">
                
                <div class="ibox-content">
                    <h1><span>Title&nbsp</span><input type="text" class="title-in" v-model="title"></h1>
                    
                    <hr>
                    <div class="md-editor" id="1526324061049">
                        <textarea name="content" data-provide="markdown-editable" rows="30" v-model="article">
                        </textarea>
                        <div class="md-fullscreen-controls">
                            <a href="#" class="exit-fullscreen" title="Exit fullscreen">
                                <span class="glyphicon glyphicon-fullscreen"></span>
                            </a>
                        </div> 
                    </div>
                    <div class=" editor-flex">
                    <button type="button" class="btn btn-w-m btn-primary" @click="publishArticle">Publish</button>
                    </div>
                </div>
                
            </div>
            
            </div>
            
        </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: 'editor', 
  data() {
    return {
        title: '',
        article: '',
    }
  },
  methods: {
      publishArticle: function() {
        //   var formData = new FormData()
        //   formData.append('auth', 'vv')
        //   formData.append('title', this.ariticleTitle)
        //   formData.append('content', this.article)
        //   formData.append('description')
        this.$emit('submitArticle', {title: this.title, article: this.article})
      }
  },
  mounted() {

  }
}
</script>

<style scoped>
.editor-flex {
    display: flex;
    justify-content: flex-end;
}
.title-in {
    text-align: center;
    border-color:#1ab394;
    border-bottom:1px solid #1ab394; 
    border-top:0px;
    border-left:0px;
    border-right:0px;
    outline: none;
    background-color:transparent; 
}
h1 {
    display: flex;
    justify-content: center;
}
</style>
