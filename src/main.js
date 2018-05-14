// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'

import util from './util'

Vue.use(VueResource) 
Vue.use(util)

Vue.component('eChart', ECharts)

Vue.config.productionTip = false

// Vue.prototype.getArticleAndTag = function(offset, limit) {
//   this.$http.get('http://localhost:8080/article/newestarticle', {params: {offset: offset, limit: limit}})
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
// },

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
