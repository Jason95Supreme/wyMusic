// import Vue from 'vue'
import { SEARCH_PARAM } from '../types'

const state = {
  searchCon: '',
  loading: false
}

const mutations = {
  [SEARCH_PARAM] (state, args) {
    state.searchCon = args.searchCon
    state.loading = args.loading
  }
}

export default {
  state,
  mutations
}
