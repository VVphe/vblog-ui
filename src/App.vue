<template>
  <!--<div id="app">-->

  <!--</div>-->
  <div id="app">

    <nav class="navbar-default navbar-static-side" role="navigation">
      <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
          <li class="nav-header">
            <div class="dropdown profile-element">
              <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                            <span class="clear"> <span class="block m-t-xs"> <strong class="font-bold">Jiang pengwei</strong>
                             </span> <span class="text-muted text-xs block">Student<b class="caret"></b></span> </span> </a>
              <ul class="dropdown-menu animated fadeInRight m-t-xs">
                <li><a href="#">Logout</a></li>
              </ul>
            </div>
            <div class="logo-element">
              Vv+
            </div>
          </li>
          <li :class="{ active:isAboutmePage }" @click="goAboutme">
            <a><i class="fa fa-th-large"></i> <span class="nav-label">关于我</span></a>
          </li>
          <li :class="{ active:isNewestPage }" @click="goMyArticles">
            <a><i class="fa fa-th-large"></i> <span class="nav-label">我的文章</span></a>
          </li>
          <li :class="{ active:isCategoryPage }">
              <a href="#"><i class="fa fa-edit"></i> <span class="nav-label">个人分类</span><span class="fa arrow"></span></a>
              <ul class="nav nav-second-level collapse">
                  <li :class="{ active:isJava }" @click="goArticles('Java')"><a >Java</a></li>
                  <li :class="{ active:isPython }" @click="goArticles('Python')"><a>Python</a></li>
                  <li :class="{ active:isNodejs }"><a @click="goArticles('Nodejs')">Nodejs</a></li>
                  <li :class="{ active:isJavascript }"><a @click="goArticles('Javascript')">Javascript</a></li>
                  <li :class="{ active:isMongodb }"><a @click="goArticles('Mongodb')">Mongodb</a></li>
                  <li :class="{ active:isMysql }"><a @click="goArticles('Mysql')">Mysql</a></li>
              </ul>
          </li>
          <li :class="{ active:isContactPage }">
            <a><i class="fa fa-th-large"></i> <span class="nav-label">联系博主</span> </a>
          </li>
          <!-- <li>
            <a @click="showItemDataPage"><i class="fa fa-th-large"></i> <span class="nav-label">Minor view</span> </a>
          </li> -->

        </ul>

      </div>
    </nav>

    <div id="page-wrapper" class="gray-bg">
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top white-bg" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
            <form role="search" class="navbar-form-custom" method="post" action="#">
              <div class="form-group">
                <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
              </div>
            </form>
          </div>
          <ul class="nav navbar-top-links navbar-right">
            <li>
              <a href="#">
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
          10GB of <strong>250GB</strong> Free.
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
      isAboutmePage: false,
      isNewestPage: true,
      isCategoryPage: false,
      isContactPage: false,

      isJava: false,
      isPython: false,
      isNodejs: false,
      isJavascript: false,
      isMongodb: false,
      isMysql: false
    }
  },
  methods: {
    goAboutme: function() {
      this.$router.push({name: 'AboutmePage'})
    },
    goMyArticles: function() {
      this.$router.push({name: 'OutlinePage'})
    },
    goArticles: function(lang) {
      let $ = this
    
      this.$router.push({name: 'CategoryArticlePage', params: {category: lang}})
    }
  }
}
</script>

<style>

</style>
