<template>
  <div id="ArticleListPage">
    <div class="col-lg-12">
        <div class="ibox" v-for="article in articles"> 
            <div class="ibox-content">
                <a class="btn-link">
                    <h2 @click="goThisArticle(article.id)">{{article.title}}</h2>
                </a>
                <div class="small m-b-xs">
                    <h3><strong>{{article.auth}}</strong> <span class="text-muted"><i class="fa fa-clock-o"></i> {{article.date}}</span></h3>
                    <h4>Description: {{article.description}}</h4>
                    <div class="row">
                        <div class="col-md-6" >
                            <h5>Tags:</h5>
                            <div v-for="tag in tags" v-if="tag.articleid === article.id">
                                <button type="button" class="btn btn-outline btn-primary btn-xs" style="margin-left:5px"  v-for="t in tag.articleTag">{{t.tagname}}</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mediue text-right">
                                <h4>Stats:</h4>
                                <div> <i class="fa fa-comments-o"> </i> {{article.commentsCnt}} </div>
                                <i class="fa fa-eye"> </i> 144 views
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div style="position: fixed; right: 30px; bottom: 30px">
            <ul class="pagination pull-right">
                <li class="footable-page-arrow"><a data-page="first" href="#first">«</a></li>
                <li class="footable-page-arrow"><a data-page="prev" href="#prev">‹</a></li>
                <li class="footable-page" :class="{active: selectPage === item}" v-for="item in pageCount" @click="goPage(item)"><a >{{item}}</a></li>
                <li class="footable-page-arrow"><a data-page="next" href="#next">›</a></li>
                <li class="footable-page-arrow"><a data-page="last" href="#last">»</a></li>
            </ul>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        articles: [],
        type: '',
        pageCount: 0,
        selectPage: 1,
        tags: []
    }
  },
  methods: {
      getAllHotList: function(offset) {
          //this.$http.get('')
          this.getArticleAndTag(offset)
      },
      getAllNewList: function(offset) {
        //   this.$http.get('http://localhost:8080/article/newestarticle', {params: {offset: offset, limit: 1}})
        //     .then(function(res) {
        //         res.body.forEach(element => {
        //                 let value = element.date
        //                 let time = new Date(value)
        //                 let Y = time.getFullYear()
        //                 let m = time.getMonth() + 1
        //                 let d = time.getDate()
        //                 element.date = Y + '-' + m + '-' + d
        //             }
        //         )  
        //         this.articles = res.body
        //         this.articles.tag = []
        //         this.articles.forEach(article => {
        //             this.$http.get('http://localhost:8080/tag/articletag', {params: {'articleid': article.id}})
        //             .then(function(res) {
        //                 //console.log(res)
        //                 this.tags.push({
        //                     articleid: article.id,
        //                     articleTag: res.body
        //                 })
        //             }, function(err) {
        //                 console.log(err)
        //             })
        //         })
                
        //     }, function(err) {
        //         console.log(err)
        //     })
        this.getArticleAndTag(offset)
      },
      goPage: function(pageid) {
          this.tags = []
          this.selectPage = pageid

          let offset = (pageid - 1) * 1
        //   this.$http.get('http://localhost:8080/article/newestarticle', {params: {offset: offset, limit: 1}})
        //     .then(function(res) {
        //         res.body.forEach(element => {
        //                 let value = element.date
        //                 let time = new Date(value)
        //                 let Y = time.getFullYear()
        //                 let m = time.getMonth() + 1
        //                 let d = time.getDate()
        //                 element.date = Y + '-' + m + '-' + d
        //             }
        //         )  
        //         this.articles = res.body
        //     }, function(err) {
        //         console.log(err)
        //     })
            this.getArticleAndTag(offset)
      },
      initArticle: function() {
        this.$http.get('http://localhost:8080/article/count')
            .then(function(res) {
                this.pageCount = res.body / 1
            }, function(err) {
                console.log(err)
            })
        if(this.type === 'hot') {
            this.getAllHotList(0)
        } else {
            this.getAllNewList(0)
        }
      },
      getArticleAndTag: function(offset) {
        if(this.type === 'new') {
          this.$http.get('http://localhost:8080/article/newestarticle', {params: {offset: offset, limit: 1}})
            .then(function(res) {
                res.body.forEach(element => {
                        let value = element.date
                        let time = new Date(value)
                        let Y = time.getFullYear()
                        let m = time.getMonth() + 1
                        let d = time.getDate()
                        element.date = Y + '-' + m + '-' + d
                    }
                )  
                this.articles = res.body
                this.articles.tag = []
                this.articles.forEach(article => {
                    this.$http.get('http://localhost:8080/tag/articletag', {params: {'articleid': article.id}})
                    .then(function(res) {
                        //console.log(res)
                        if(this.tags.filter(tag => tag.articleid === article.id).length === 0) {
                            this.tags.push({
                                articleid: article.id,
                                articleTag: res.body
                            })
                        }
                    }, function(err) {
                        console.log(err)
                    })
                })
                
            }, function(err) {
                console.log(err)
            })
        } else {
            this.$http.get('http://localhost:8080/article/hotestarticle', {params: {start: offset, end: offset}})
            .then(function(res) {
                console.log(res)
                res.body.forEach(element => {
                        let value = element.date
                        let time = new Date(value)
                        let Y = time.getFullYear()
                        let m = time.getMonth() + 1
                        let d = time.getDate()
                        element.date = Y + '-' + m + '-' + d
                    }
                )  
                this.articles = res.body
                this.articles.tag = []
                this.articles.forEach(article => {
                    this.$http.get('http://localhost:8080/tag/articletag', {params: {'articleid': article.id}})
                    .then(function(res) {
                        //console.log(res)
                        if(this.tags.filter(tag => tag.articleid === article.id).length === 0) {
                            this.tags.push({
                                articleid: article.id,
                                articleTag: res.body
                            })
                        }
                    }, function(err) {
                        console.log(err)
                    })
                })
                
            }, function(err) {
                console.log(err)
            })
        }
      },
      goThisArticle: function(articleid) {
          let tags = this.tags.filter(tag => tag.articleid === articleid)
          this.$router.push({name: 'ArticleShowPage', params: {articleid: articleid, tags: tags[0].articleTag}})
      }
  },
  mounted() {
    this.type = this.$route.params.type
    console.log(this.type)
    this.initArticle()
  }
}
</script>

<style scoped>
    .tagname {
        margin-left:5px;
    }
    .page-select {
        position: fixed; 
        right: 30px; 
        bottom: 30px;
    }

</style>
