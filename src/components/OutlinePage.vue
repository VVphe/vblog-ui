<template>
    <div id="OutlinePage" class="row">

        <div class="col-lg-6">
            <div class="ibox">
                <div class="ibox-title">
                    <h3 style="display: inline-block">最热文章 </h3> 
                    <button type="button" class="btn btn-outline btn-primary btn-xs" style="float: right;margin-top:10px" @click="goArticleList('hot')">read more&nbsp<i class="fa fa-arrow-right" style="float: right; padding-top: 2px"></i></button>
                    <!-- <p style="display: inline-block;float: right;padding-top:10px" @click="goArticleList(hotest)">read more&nbsp<i class="fa fa-arrow-right" style="float: right; padding-top: 2px"></i></p> -->
                </div>

                <div class="ibox-content">
                    <div class="wrapper wrapper-content animated fadeInRight">
                        <div class="vote-item" v-for="hotArticle in hotestArticle" @click="goThisArticle(hotArticle.id)">
                            <div class="row" >
                                <div class="col-md-12">
                                    <a class="vote-title">
                                        {{hotArticle.title}}
                                    </a>
                                    <div class="vote-info">
                                        <i class="fa fa-comments-o"></i> <a href="#">Comments {{hotArticle.commentsCnt}}</a>
                                        <i class="fa fa-clock-o"></i> <a href="#">{{hotArticle.date}}</a>
                                        <i class="fa fa-user"></i> <a href="#">{{hotArticle.auth}}</a>
                                        <i class="fa fa-eye"></i> {{hotArticle.readcount}} views
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <div class="col-lg-6">
            <div class="ibox">
                <div class="ibox-title">
                    <h3 style="display: inline-block">最新文章 </h3> 
                    <button type="button" class="btn btn-outline btn-primary btn-xs" style="float: right;margin-top:10px" @click="goArticleList('new')">read more&nbsp<i class="fa fa-arrow-right" style="float: right; padding-top: 2px"></i></button>
                </div>

                <div class="ibox-content">
                    <div class="wrapper wrapper-content animated fadeInRight">
                        <div class="vote-item" v-for="newArticle in newestArticle" @click="goThisArticle(newArticle.id)">
                            <div class="row" >
                                <div class="col-md-12">
                                    <a class="vote-title">
                                        {{newArticle.title}}
                                    </a>
                                    
                                    <div class="vote-info">
                                        <i class="fa fa-comments-o"></i> <a href="#">Comments {{newArticle.commentsCnt}}</a>
                                        <i class="fa fa-clock-o"></i> <a href="#">{{newArticle.date}}</a>
                                        <i class="fa fa-user"></i> <a href="#">{{newArticle.auth}}</a>
                                        <i class="fa fa-eye"></i> {{newArticle.readcount}} views
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="addArticle" @click="goEditArticle">
            <button type="button" class="btn btn-primary btn-lg dim btn-circle btn-outline"  ><i class="fa fa-edit"></i></button>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        hotestArticle: [],
        newestArticle: [],
        articles: [],
        tags: []
    }
  },
  methods: {
      goArticleList: function(type) {
          this.$router.push({name: 'ArticleListPage', params: {type: type}})
      },
      getHotestArticle: function() {
        this.$http.get('http://localhost:8080/article/hotestarticle', {params: {start: 0, end: 10}})
            .then(function(res) {
                console.log(res)
                res.body.forEach(element => {
                        let value = element.date
                        let time = new Date(value)
                        let Y = time.getFullYear()
                        let m = time.getMonth() + 1
                        let d = time.getDate()
                        let h = time.getHours()
                        let M = time.getMinutes()
                        let s = time.getSeconds()
                        if(h < 10) h = '0' + h
                        if(M < 10) M = '0' + M
                        if(s < 10) s = '0' + s
                        element.date = Y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s

                        element.readcount = 0
                        this.$http.get('http://localhost:8080/article/readcount', {params: {articleid: element.id}})
                            .then(res => {
                                element.readcount = res.body
                            }, (err => {
                                console.log(err)
                            }))
                    }
                )   
                this.hotestArticle = res.body
                
            }, function(err) {
                console.log(err)
            })
      },
      getNewestArticle: function() {
          this.$http.get('http://localhost:8080/article/newestarticle', {params: {offset: 0, limit: 10}})
            .then(function(res) {
                res.body.forEach(element => {
                        let value = element.date
                        let time = new Date(value)
                        let Y = time.getFullYear()
                        let m = time.getMonth() + 1
                        let d = time.getDate()
                        let h = time.getHours()
                        let M = time.getMinutes()
                        let s = time.getSeconds()
                        if(h < 10) h = '0' + h
                        if(M < 10) M = '0' + M
                        if(s < 10) s = '0' + s
                        element.date = Y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s

                        element.readcount = 0
                        this.$http.get('http://localhost:8080/article/readcount', {params: {articleid: element.id}})
                            .then(res => {
                                element.readcount = res.body
                            }, (err => {
                                console.log(err)
                            }))
                    }
                )   
                this.newestArticle = res.body
                // console.log(this.newestArticle)
            }, function(err) {
                console.log(err)
            })
      },
      goThisArticle: function(articleid) {
         this.$router.push({name: 'ArticleShowPage', params: {articleid: articleid}})
      },
      goEditArticle: function() {
          this.$router.push({name: 'EditPage'})
      }
      
  },
  mounted() {
      this.getHotestArticle()
      this.getNewestArticle()
  }
}
</script>

<style scoped>
.addArticle {
    position: fixed;
    bottom: 40px;
    right: 10px;
}
.readmore {
    float: right;
    margin-top:10px;
}
.readmore-i {
    float: right; 
    padding-top: 2px;
}
.article-type {
    display: inline-block;
}
</style>
