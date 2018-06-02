<template>
  <div id="Editor">
    <!-- <div class="wrapper wrapper-content"> -->
        <div class="row">
            <div class="col-lg-12">
            <div class="ibox float-e-margins">
                
                <div class="ibox-content">
                    <h1><span>Title&nbsp</span><input type="text" class="title-in" v-model="title"></h1>
                    <div class="tag-in">
                        <h3><span>Category&nbsp</span></h3>
                        <el-select v-model="category" placeholder="请选择" style="margin-right:20px;margin-left: 5px">
                            <el-option
                            v-for="item in options"
                            :key="item"
                            :label="item"
                            :value="item"
                            @change="handleOptionChange">
                            </el-option>
                        </el-select>
                        <h3><span>Tags&nbsp</span></h3>
                        <button v-for="tag in tags" type="button" class="btn btn-outline btn-primary btn-xs" style="margin-left: 5px;">{{tag}}&nbsp</button>

                        <button class="btn btn-primary btn-circle btn-outline" style="margin-left: 5px" type="button" @click="addTags">+</button>
                    </div>
                    
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
        category: '',
        options: ['Java', 'Python', 'Nodejs', 'Javascript', 'Mongodb', 'Mysql']
    }
  },
  props: ["tags"],
  methods: {
      publishArticle: function() {
        this.$emit('submitArticle', {title: this.title, article: this.article, category: this.category})
      },
      addTags: function() {
          this.$emit('toAddTag', "toAddTag")
      },
      handleOptionChange: function(value) {
          this.category = value
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
.tag-in {
    display: flex;
    justify-content: center;
    padding-top: 10px;
}
</style>
