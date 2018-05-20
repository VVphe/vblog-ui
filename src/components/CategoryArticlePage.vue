<template>
  <div id="CategoryArticlePage">
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
                                <button type="button" class="btn btn-outline btn-primary btn-xs tagname" v-for="t in tag.articleTag">{{t.tagname}}</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mediue text-right">
                                <h4>Stats:</h4>
                                <div> <i class="fa fa-comments-o"> </i> {{article.commentsCnt}} comments</div>
                                <i class="fa fa-eye"> </i> 144 views
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
        tags: [],
    }
  },
  methods: {
      initData: function() {
            let $ = this
            let category = this.$route.params.category
            
            this.$http.get('http://localhost:8080/article/category', {params: {'username': 'vv', 'category': category}})
                .then(function(res) {
                console.log(res)
                $.articles = res.body
                $.articles.tags = []
                $.articles.forEach(articles => {
                    let value = articles.date
                    let time = new Date(value)
                    let Y = time.getFullYear()
                    let m = time.getMonth() + 1
                    let d = time.getDate()
                    articles.date = Y + '-' + m + '-' + d
                    $.$http.get('http://localhost:8080/tag/articletag', {params: {'articleid': articles.id}})
                    .then(function(res) {
                        //console.log(res)
                        $.tags.push({
                            articleid: articles.id,
                            articleTag: res.body
                        })
                        //articles.tags = res.body
                        console.log(articles.tags)
                    }, function(err) {
                        console.log(err)
                    })
                })
                }, function(err) {
                    console.log(err)
                })
            
            this.$forceUpdate()
      },
      goThisArticle: function(articleid) {
        //   let article = this.articles.filter(article => article.id === articleid)
          let tags = this.tags.filter(tag => tag.articleid === articleid)
          this.$router.push({name: 'ArticleShowPage', params: {articleid: articleid, tags: tags[0].articleTag}})
      }
  },
  mounted() {
      this.initData()
  },
  watch: {
      '$route.params.category': function() {
          this.initData()
          this.tags = []
          this.$forceUpdate()
      },
  }
}
</script>

<style scoped>
.tagname {
    margin-left:5px;
}
</style>
