import Vue from 'vue'
import Router from 'vue-router'

import CategoryArticlePage from '../components/CategoryArticlePage'
import ArticleShowPage from '../components/ArticleShowPage'
import AboutmePage from '../components/AboutmePage'
import OutlinePage from '../components/OutlinePage'
import ArticleListPage from '../components/ArticleListPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/categoryarticle/:category',
      name: 'CategoryArticlePage',
      component: CategoryArticlePage
    },
    {
      path: '/article/:articleid',
      name: 'ArticleShowPage',
      component: ArticleShowPage
    },
    {
      path: '/about',
      name: 'AboutmePage',
      component: AboutmePage
    },
    {
      path: '/outline',
      name: 'OutlinePage',
      component: OutlinePage
    },
    {
      path: '/articlelist',
      name: 'ArticleListPage',
      component: ArticleListPage
    }
  ]
})
