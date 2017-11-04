<template>
  <!-- 歌单内容 -->
  <div class="playlist">
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="i in playListData">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="i.coverImgUrl" style="width:60px;margin-right:5px;display:block">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{i.name}}</h4>
            <p class="weui-media-box__desc">{{i.trackCount}}首  by{{i.creator.nickname}},  播放{{i.playCounts}}</p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '../../api/api.js'
import store from '../store'

export default {
  data () {
    return {
      playListData: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      get(`/music/search?keywords=${vm.searchCon}&type=1000`).then(res => {
        vm.playListData = res.result.playlists
        vm.playListData.map(x => {
          x.playCounts = vm._playCount(x.playCount, 'playlist')
        })
        let args = {loading: true}
        store.dispatch('searchParams', args)
      }).catch(error => {
        console.log(error)
      })
    })
  },
  computed: {
    searchCon () {
      return store.state.search.searchCon
    }
  },
  methods: {
    // 将播放次数格式化
    _playCount (count, str) {
      let intTmp = (count / 10000).toString().split('.')[0]
      let floatTmp = (count / 10000).toString().split('.')[1].substring(0, 1)
      if (str === 'playlist') {
        if (count >= 10000) {
          return `${intTmp}.${floatTmp}万次`
        } else {
          return `${count}次`
        }
      }
      if (str === 'mv') {
        if (count >= 10000) {
          return `${intTmp}万次`
        } else {
          return `${count}次`
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.playlist
  position absolute
  width 100%
  height 100%
  top: 40px;
.weui-media-box_appmsg:last-child
  margin-bottom: 50px;
</style>
