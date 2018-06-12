import Vue from 'vue'
import Vuex from 'vuex'
import listType from './modules/listType'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    listType
  },
  strict: true
})