import { PLAY_CON } from '../types'

const state = {
  imgUrl: '',
  songName: '',
  singerName: '',
  playUrl: '',
  playState: ''
}

const mutations = {
  [PLAY_CON] (state, args) {
    state.imgUrl = args.imgUrl
    state.songName = args.songName
    state.singerName = args.singerName
    state.playUrl = args.playUrl
    state.playState = args.playState
  }
}

export default {
  state,
  mutations
}
