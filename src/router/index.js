import Vue from 'vue'
import Router from 'vue-router'

import CategoryArticlePage from '../components/CategoryArticlePage'
import ArticleShowPage from '../components/ArticleShowPage'
import AboutmePage from '../components/AboutmePage'
import OutlinePage from '../components/OutlinePage'
import ArticleListPage from '../components/ArticleListPage'
import EditPage from '../components/EditPage'
import TodoPage from '../components/TodoPage'
import LoginPage from '../components/LoginPage'
import RegisterPage from '../components/RegisterPage'
import UserMainPage from '../components/UserMainPage'

import VueRouter from 'vue-router';

Vue.use(Router)

const routes = [
  {
    path: '/', 
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/main',
    name: 'UserMainPage',
    component: UserMainPage,
    children: [
      {
        path: 'categoryarticle/:category',
        name: 'CategoryArticlePage',
        component: CategoryArticlePage
      },
      {
        path: 'article/:articleid',
        name: 'ArticleShowPage',
        component: ArticleShowPage
      },
      {
        path: 'about',
        name: 'AboutmePage',
        component: AboutmePage
      },
      {
        path: 'outline',
        name: 'OutlinePage',
        component: OutlinePage
      },
      {
        path: 'articlelist',
        name: 'ArticleListPage',
        component: ArticleListPage
      },
      {
        path: 'edit',
        name: 'EditPage',
        component: EditPage
      },
      {
        path: 'todo',
        name: 'TodoPage',
        component: TodoPage
      }
    ]
  },
  
]

const router = new VueRouter({
  routes: routes
})

router.beforeEach(((to, from, next) => {
  let token = window.localStorage.getItem('token')
  console.log(token)
  if (to.fullPath != '/login' && token === null) {
    next({
      name: 'LoginPage',
      //query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}))

export default router



