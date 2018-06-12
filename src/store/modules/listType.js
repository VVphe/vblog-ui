import * as types from '../mutation-types'

const state = {
    type: ''
}

const mutations = {
    [types.SET_TYPE] (state, { type }) {
        console.log(type)
        state.type = type
    },
}

export default {
    state,
    mutations
  }