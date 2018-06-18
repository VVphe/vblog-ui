<template>
  <div id="SearchPage">
      <div class="row">
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
                                    <i class="fa fa-eye"> </i> {{article.readcount}} views
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        articles: [],
        tags: []
    }
  },
  methods: {
    goThisArticle: function(articleid) {
        let tags = this.tags.filter(tag => tag.articleid === articleid)
        this.$router.push({name: 'ArticleShowPage', params: {articleid: articleid, tags: tags[0].articleTag, type: this.type}})
    },
    getSearchArticles: function(key) {
        this.$http.get(global.vblogUrl + '/article/search', {params: {key: key}})
            .then(res => {
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
                this.articles = res.body
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
            })
    }
  },
  mounted() {
      this.getSearchArticles(this.$route.params.key)
  },
  beforeRouteUpdate(to, from, next) {
      this.getSearchArticles(to.params.key)
      next()
  }
}
</script>

<style scoped>
</style>
