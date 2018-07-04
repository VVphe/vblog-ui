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
                            <div class="delete-btn">
                                <button type="button" class="btn btn-w-m btn-danger" @click="deleteArticle">Delete</button>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-md-6">
                                        <h5>Tags:</h5>
                                        <button type="button" class="btn btn-outline btn-primary btn-xs" style="margin-left:5px"  v-for="t in tags">{{t.tagname}}</button>
                                </div>
                                <div class="col-md-6">
                                    <div class="small text-right">
                                        <h5>Stats:</h5>
                                        <div> <i class="fa fa-comments-o"> </i> {{article.commentsCnt}} comments</div>
                                        <i class="fa fa-eye"> </i> {{article.readcount}} views
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-lg-12">

                                    <h2>Comments:</h2>
                                    <!-- <div class="social-feed-box" v-if="comments.length !== 0" v-model="myComment"> -->
                                    <div v-if="comments.length !== 0">
                                        <textarea class="form-control" placeholder="请发表你的评论！" v-model="myComment">
                                                    
                                        </textarea>
                                        <br>
                                        <div class="text-right">
                                            <button type="submit" class="btn btn-sm btn-primary m-t-n-xs" @click="publishComment"><strong>发表评论</strong></button>
                                        </div>
                                        <br>
                                    </div>
                                    <!-- </div> -->
                                    <div v-if="comments.length === 0">
                                       
                                            <textarea class="form-control" placeholder="还没有评论,快来评论吧！" v-model="myComment">
                                                
                                            </textarea>
                                            <br>
                                            <div class="text-right">
                                                <button type="submit" class="btn btn-sm btn-primary m-t-n-xs" @click="publishComment"><strong>发表评论</strong></button>
                                            </div>
                                            <br>
                                       
                                    </div>
                                    <div class="social-footer" v-for="comment in comments">
                                        <div class="social-comment">
                                            <div class="media-body">
                                                <a @click="goCommentReply(comment)">
                                                    {{comment.username}}
                                                </a>
                                                <small class="text-muted">{{comment.cmdate}}</small>
                                                <p>
                                                    {{comment.cmcontent}}
                                                </p>
                                            </div>
                                            <div>
                                            <div class="social-comment" v-for="reply in replies[comment.cmid]" @click="goReplyReply(comment, reply)">
                                                
                                                <div class="media-body">
                                                    <a>
                                                        {{reply.fromuser}} 回复 {{reply.touser}}
                                                    </a>

                                                    <p>
                                                        {{reply.replycontent}}
                                                    </p>
                                                </div>
                                        
                                                <div v-if="replyid === reply.id" >
                                                    <textarea class="form-control" placeholder="请输入你的回复" v-model="myReply">
                                                                            
                                                    </textarea>
                                                    <div class="text-right btn-gp">
                                                        <button type="submit" class="btn btn-sm btn-default m-t-n-xs" @click.stop="cancelReply"><strong>取消</strong></button>
                                                        <button type="submit" class="btn btn-sm btn-primary m-t-n-xs" @click.stop="replyReply"><strong>发表回复</strong></button>
                                                    </div>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        <br>

                                        <div v-if="replyid === comment.cmid">
                                            <textarea  class="form-control" placeholder="请输入你的回复" v-model="myReply">
                                                                    
                                            </textarea>
                                            <div class="text-right btn-gp">
                                                <button type="submit" class="btn btn-sm btn-default m-t-n-xs" @click="cancelReply"><strong>取消</strong></button>
                                                <button type="submit" class="btn btn-sm btn-primary m-t-n-xs" @click="reply(comment)"><strong>发表回复</strong></button>
                                            </div>
                                        </div>
                                    </div>
           
                                   

                                </div>
                                <div class="col-lg-12 ">
                                    <button class="btn btn-primary btn-block" :class="{'disabled': disabled}" @click="showMore">
                                        <i class="fa fa-arrow-down"></i> Show More
                                    </button>
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
        comments: [],
        commentsCnt: 0,

        myComment: "",

        pageCnt: 1,
        disabled: false,

        myReply: "",
        cmid: -1,
        replyid: -1,
        replyType: "",
        touser: "",

        replies: {}
    }
  },
  methods: {
      publishComment: function() {

          var formData = new FormData()
          formData.append('cmcontent', this.myComment)
        //   formData.append('username', 'vv')
          formData.append('username', window.localStorage.getItem('user'))
          formData.append('articleid', this.article.id)
          this.$http.post('http://localhost:8080/comment/publish', formData).then(res => {
              this.myComment = ''
              this.getComments()
              this.getCommentsCnt()
              this.$http.get('http://localhost:8080/comment/count', {params: {articleid: this.article.id}})
                .then((res) => {
                    this.commentsCnt = res.body
                    var fd = new FormData()
                    fd.append('articleid', this.article.id)
                    fd.append('commentsCnt', this.commentsCnt)
                    this.$http.post('http://localhost:8080/article/updatecomment', fd).then(res => {
               
                        this.article.commentsCnt = this.commentsCnt
                       
                    })
                }, (err) => {
                    console.log(err)
                })
              
          }, err => {
              console.log(err)
          }) 

      },
      getComments: function() {
          this.$http.get('http://localhost:8080/comment/page', {params: {
                articleid: this.$route.params.articleid,
                limit: this.pageCnt * 4
              }
            })
            .then(function(res) {
                res.body.forEach(element => {
                        let value = element.cmdate
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
                        element.cmdate = Y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s

                        this.getReplies(element.cmid)
                    }
                )   

                this.comments = res.body

            }, function(err) {
                console.log(err)
            })
      },
      showMore: function() {

         // this.getCommentsCnt()
          this.$http.get('http://localhost:8080/comment/count', {params: {articleid: this.article.id}})
            .then((res) => {
                this.commentsCnt = res.body

                if(this.pageCnt * 2 < this.commentsCnt) {
                    this.pageCnt ++
                    this.getComments()
                } else {
                    console.log('none')
                }
            }, (err) => {
                console.log(err)
            })
          
      },
      getCommentsCnt: function() {
          this.$http.get('http://localhost:8080/comment/count', {params: {articleid: this.article.id}})
            .then((res) => {
                this.commentsCnt = res.body
            }, (err) => {
                console.log(err)
            })
      },
      goCommentReply: function(comment) {
          this.cmid = comment.cmid
          this.replyid = this.cmid
          this.replyType = 'comment'
          this.touser = comment.username
          
      },
      goReplyReply: function(comment, reply) {
          this.cmid = comment.cmid
          this.replyid = reply.id
          this.replyType = 'reply'
          this.touser = reply.fromuser
      },
      cancelReply: function() {
          this.replyid = -1
          this.myReply = ''

      },
      reply: function(comment) {
          //this.goCommentReply(comment)
          var formData = new FormData()
          formData.append('cmid', this.cmid)
          formData.append('replyid', this.replyid)
          formData.append('replytype', this.replyType)
          formData.append('replycontent', this.myReply)
          formData.append('fromuser', window.localStorage.getItem('user'))
          formData.append('touser', this.touser)
          let cmid = this.cmid
          this.$http.post('http://localhost:8080/reply/publish', formData)
            .then(res => {
                this.getReplies(cmid)
                
                console.log(this.replies)
            }, err => {
                console.log(err)
            })
          this.cmid = -1
          this.replyid = -1
          this.replyType = ''
          this.touser = ''
          this.myReply = ''
      },
      replyReply: function() {
          var formData = new FormData()
          formData.append('cmid', this.cmid)
          formData.append('replyid', this.replyid)
          formData.append('replytype', this.replyType)
          formData.append('replycontent', this.myReply)
          formData.append('fromuser', window.localStorage.getItem('user'))
          formData.append('touser', this.touser)
          let cmid = this.cmid
          this.$http.post('http://localhost:8080/reply/publish', formData)
            .then(res => {
                this.getReplies(cmid)
                
                console.log(this.replies)
            }, err => {
                console.log(err)
            })
          this.cmid = -1
          this.replyid = -1
          this.replyType = ''
          this.touser = ''
          this.myReply = ''
      },
      getReplies: function(cmid) {
          this.$http.get('http://localhost:8080/reply/replies', {params: {cmid: cmid}})
            .then(res => {

                this.replies[cmid] = res.body
                this.$forceUpdate()
            }, err => {
                console.log(err)
            })
      },

      deleteArticle: function() {
          this.$confirm('此操作将永久删除文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.get(global.vblogUrl + '/article/delete', {params: {id: this.article.id}})
                .then(res => {
                    this.$router.push({name: 'OutlinePage'})
                    toastr.success("删除成功")  
                }, err => {
                    toastr.error("无此权限")
                })
            }).catch(() => {
                toastr.success("已取消")      
            });
        }
  },
  mounted() {
    //   this.article = this.$route.params.article[0]
      var articleid = this.$route.params.articleid
      this.tags = this.$route.params.tags

      let $ = this

      this.$http.get('http://localhost:8080/article/readarticle', {params: {articleid: articleid}})
        .then(function(resp) {

            let value = resp.body.date
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
            resp.body.date =  Y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s

            resp.body.readcount = 0

            this.$http.get('http://localhost:8080/article/readcount', {params: {articleid: resp.body.id}})
                            .then(res => {
                                resp.body.readcount = res.body
                            }, (err => {
                                console.log(err)
                            }))

            // this.$http.get('http://localhost:8080/comment/count', {params: {articleid: resp.body.id}})
            //     .then((res) => {
            //         resp.body.commentsCnt = res.body
            //     }, (err) => {
            //         console.log(err)
            //     })
       
            $.article = resp.body
        }, function(err) {
            console.log(err)
        })

        this.getComments()

        //避免重复渲染tags
      if(this.tags === undefined) {
          this.$http.get('http://localhost:8080/tag/articletag', {params: {'articleid': articleid}})
                    .then(function(res) {
                        this.tags = res.body
                    }, function(err) {
                        console.log(err)
                    })
      }
  },
  watch: {
      'comments': function() {
          this.$forceUpdate()
      },
      'replies': function() {
          this.$forceUpdate()
      },
  }
}
</script>

<style scoped>
.tagname {
    margin-left:5px;
}
/* .reply-area {
    background-color: #e7eaec;
} */
.social-footer {
    border-top: 1px solid #e7eaec;
    padding: 10px 15px;
    background: #f9f9f9;
}
.social-comment .social-comment {
    margin-left: 45px;
}
.reply-area {
    background-color: #FFFFFF;
    background-image: none;
    border: 1px solid #e5e6e7;
    border-radius: 1px;
    color: inherit;
    display: block;
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
    width: 100%;
    font-size: 14px;
}
.textarea:focus {
    border-color: #1ab394 !important;
}
.btn-gp {
    margin-top: 5px
}
.delete-btn {
    display: flex;
    justify-content: flex-end;
    
}
</style>
