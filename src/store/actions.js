// import Vue from 'vue'
import * as types from './types'

export function searchParams (state, args) {
  state.commit(types.SEARCH_PARAM, args)
}

export function playContent (state, args) {
  state.commit(types.PLAY_CON, args)
}
