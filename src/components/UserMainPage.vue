<template>
  <!--<div id="app">-->

  <!--</div>-->
  <div id="usermainpage">

    <nav class="navbar navbar-default navbar-static-side" role="navigation">
      <div class="sidebar-collapse">
        <ul class="nav " id="side-menu">
          <li class="nav-header">
            <div class="dropdown profile-element">
              <a data-toggle="dropdown" class="dropdown-toggle">
              <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">{{username}}</strong>
                </span> <span class="text-muted text-xs block">{{role}}<b class="caret"></b></span> </span> </a>
              <ul class="dropdown-menu animated fadeInRight m-t-xs">
                <li><a @click="logout">Logout</a></li>
              </ul>
            </div>
            <div class="logo-element">
              VB+
            </div>
          </li>
          <li :class="{ active:isAboutmePage }" @click="goAboutme">
            <a><i class="fa fa-at"></i> <span class="nav-label">关于我</span></a>
          </li>
          <li :class="{ active:isArticlePage }" @click="goMyArticles">
            <a><i class="fa fa-pencil"></i> <span class="nav-label">我的文章</span></a>
          </li>
          <li :class="{ active:isCategoryPage }" @click="goCategory">
              <a @click="collapseUl"><i class="fa fa-edit"></i> <span class="nav-label">个人分类</span><span class="fa arrow"></span></a>
              <ul class="nav nav-second-level collapse" :class="{in: isCategoryPage}">
                  <!-- <li :class="{ active:isJava }"> <a @click="goArticles('Java')">Java ({{categoryData["Java"]}})</a></li>
                  <li :class="{ active:isPython }"><a @click="goArticles('Python')">Python ({{categoryData["Python"]}})</a></li>
                  <li :class="{ active:isNodejs }"><a @click="goArticles('Nodejs')">Nodejs ({{categoryData["Nodejs"]}})</a></li>
                  <li :class="{ active:isJavascript }"><a @click="goArticles('Javascript')">Javascript ({{categoryData["Javascript"]}})</a></li>
                  <li :class="{ active:isMongodb }"><a @click="goArticles('Mongodb')">Mongodb ({{categoryData["Mongodb"]}})</a></li>
                  <li :class="{ active:isMysql }"><a @click="goArticles('Mysql')">Mysql ({{categoryData["Mysql"]}})</a></li> -->
                  <li ><a @click="goArticles('Java')">Java ({{categoryData["Java"]}})</a></li>
                  <li ><a @click="goArticles('Python')">Python ({{categoryData["Python"]}})</a></li>
                  <li ><a @click="goArticles('Nodejs')">Nodejs ({{categoryData["Nodejs"]}})</a></li>
                  <li ><a @click="goArticles('Javascript')">Javascript ({{categoryData["Javascript"]}})</a></li>
                  <li ><a @click="goArticles('Mongodb')">Mongodb ({{categoryData["Mongodb"]}})</a></li>
                  <li ><a @click="goArticles('Mysql')">Mysql ({{categoryData["Mysql"]}})</a></li>
              </ul>
          </li>
          <li :class="{ active:isTodoPage }" @click="goTodo">
            <a><i class="fa fa-calendar"></i> <span class="nav-label">我的日历</span></a>
          </li>
          <li :class="{ active:isContactPage }">
            <a><i class="fa fa-heart"></i> <span class="nav-label">联系博主</span> </a>
          </li>

        </ul>

      </div>
    </nav>

    <div id="page-wrapper" class="gray-bg">
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " @click="minBar"><i class="fa fa-bars"></i> </a>
            <!-- <form role="search" class="navbar-form-custom" method="post"> -->
              <div class="navbar-form-custom">
                <div class="form-group">
                  <input type="search" placeholder="Search for something..." class="form-control" name="top-search" id="top-search" @keyup.enter="searchEnter" v-model="searchKey">
                </div>
              </div>
            <!-- </form> -->
          </div>
          <ul class="nav navbar-top-links navbar-right">
            <li>
              <a @click="logout">
                <i class="fa fa-sign-out"></i> Log out
              </a>
            </li>
          </ul>

        </nav>
      </div>

      <!--main page-->
      <router-view/>

      <div class="footer">
        <div class="pull-right">
          
        </div>
        <div>
          <strong>Copyright</strong> Jiang pengwei &copy; 2018
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      isAboutmePage: true,
      isArticlePage: false,
      isCategoryPage: false,
      isTodoPage: false,
      isContactPage: false,

      isJava: false,
      isPython: false,
      isNodejs: false,
      isJavascript: false,
      isMongodb: false,
      isMysql: false,

      isCollapse: false,

      categoryData: {},
      username: '',
      role: '',

      searchKey: ''
    }
  },
  methods: {
    goAboutme: function() {
      this.isAboutmePage = true
      this.isArticlePage = false
      this.isCategoryPage = false
      this.isTodoPage = false
      this.isContactPage = false
      this.$router.push({name: 'AboutmePage'})
    },
    goMyArticles: function() {
      this.isAboutmePage = false
      this.isArticlePage = true
      this.isCategoryPage = false
      this.isTodoPage = false
      this.isContactPage = false
      this.$router.push({name: 'OutlinePage'})
    },
    goCategory: function() {
      this.isAboutmePage = false
      this.isArticlePage = false
      this.isCategoryPage = !this.isCategoryPage
      this.isTodoPage = false
      this.isContactPage = false
    },
    goArticles: function(lang) {
      let $ = this
      this.isAboutmePage = false
      this.isArticlePage = false
      this.isCategoryPage = true
      this.isTodoPage = false
      this.isContactPage = false
      this.$router.push({name: 'CategoryArticlePage', params: {category: lang}})
    },
    goTodo: function() {
      this.isAboutmePage = false
      this.isArticlePage = false
      this.isCategoryPage = false
      this.isTodoPage = true
      this.isContactPage = false
      this.$router.push({name: 'TodoPage'})
    },

    // modify css
    minBar: function() {
      $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    },
    collapseUl: function() {
      this.isCollapse = !this.isCollapse

    },

    //
    getCategoryArticleCnt: function() {
        var categorys = ['Java', 'Python', 'Nodejs', 'Javascript', 'Mongodb', 'Mysql']
        categorys.forEach(category => {
            this.$http.get(global.vblogUrl + '/article/categorycnt', {params: {category: category}})
                .then(res => {
                    this.categoryData[category] = res.body
                })
        })
    },

    //
    logout: function() {
      this.$router.push({name: 'LoginPage'})
      window.localStorage.clear()
    },

    // search articles
    searchEnter: function(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if(keyCode == 13 && this.searchKey) {
          // this.$router.push({name: 'SearchPage', params: {key: this.searchKey}})
          this.$router.push({path: '/main/search/' + this.searchKey})
      }
    }
  },
  mounted() {
      //location.reload()
      this.getCategoryArticleCnt()
      this.username = window.localStorage.getItem('user')
      if(this.username == 'vv') this.role = 'Manager'
      else this.role = 'User'
  }
}
</script>

<style>

</style>
