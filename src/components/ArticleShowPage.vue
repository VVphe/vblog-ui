<template>
  <div id="ArticleShowPage">
      <div class="wrapper wrapper-content  animated fadeInRight article">
            <div class="row">
                <div class="col-lg-10 col-lg-offset-1">
                    <div class="ibox">
                        <div class="ibox-content">
                            <div class="text-center article-title">
                                <span class="text-muted"><i class="fa fa-clock-o"></i> {{article.date}}</span>
                                <h1>
                                    {{article.title}}
                                </h1>
                            </div>
                            <div v-html="article.content"></div>
                            <hr>
                            <div class="row">
                                <div class="col-md-6">
                                        <h5>Tags:</h5>
                                        <button type="button" class="btn btn-outline btn-primary btn-xs" style="margin-left:5px"  v-for="t in tags">{{t.tagname}}</button>
                                </div>
                                <div class="col-md-6">
                                    <div class="small text-right">
                                        <h5>Stats:</h5>
                                        <div> <i class="fa fa-comments-o"> </i> {{article.commentsCnt}} </div>
                                        <i class="fa fa-eye"> </i> 144 views
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-lg-12">

                                    <h2>Comments:</h2>
                                    <div class="social-feed-box" v-if="comments.length === 0">
                                        <div class="social-body">
                                            <p>
                                                还没有评论,快来评论吧！
                                            </p>
                                        </div>
                                    </div>
                                    <div class="social-feed-box" v-for="comment in comments">
                                        <div class="social-avatar">
                                            <div class="media-body">
                                                <a href="#">
                                                    {{comment.username}}
                                                </a>
                                                <small class="text-muted">{{comment.cmdate}}</small>
                                            </div>
                                        </div>
                                        <div class="social-body">
                                            <p>
                                                {{comment.cmcontent}}
                                            </p>
                                        </div>
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
        article: "",
        tags: [],
        comments: []
    }
  },
  methods: {

  },
  mounted() {
    //   this.article = this.$route.params.article[0]
      var articleid = this.$route.params.articleid
      this.tags = this.$route.params.tags

      let $ = this

      this.$http.get('http://localhost:8080/article/readarticle', {params: {articleid: articleid}})
        .then(function(res) {

            let value = res.body.date
            let time = new Date(value)
            let Y = time.getFullYear()
            let m = time.getMonth() + 1
            let d = time.getDate()
            res.body.date =  Y + '-' + m + '-' + d
       
            $.article = res.body
        }, function(err) {
            console.log(err)
        })

      this.$http.get('http://localhost:8080/comment/comments', {params: {articleid: articleid}})
        .then(function(res) {
            // console.log(res.body)
            res.body.forEach(element => {
                    let value = element.cmdate
                    let time = new Date(value)
                    let Y = time.getFullYear()
                    let m = time.getMonth() + 1
                    let d = time.getDate()
                    element.cmdate = Y + '-' + m + '-' + d
                }
            )   

            $.comments = res.body
            // console.log($.comments)
        }, function(err) {
            console.log(err)
        })

      if(this.tags === undefined) {
          this.$http.get('http://localhost:8080/tag/articletag', {params: {'articleid': articleid}})
                    .then(function(res) {
                        this.tags = res.body
                    }, function(err) {
                        console.log(err)
                    })
      }
  }
}
</script>

<style scoped>
</style>
