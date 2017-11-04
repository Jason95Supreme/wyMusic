import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'

import search from './mutations/search'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    search
  }
})
