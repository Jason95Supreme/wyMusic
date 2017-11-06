<template>
  <!-- 单曲内容 -->
  <div class="song">
    <div class="weui-panel weui-panel_access" v-if="loading">
      <div class="weui-panel__bd">
        <div class="weui-media-box weui-media-box_text song-box" v-for="i in searchData">
          <h4 class="weui-media-box__title">{{i.name}}</h4>
          <p class="weui-media-box__desc">{{i.artists[0].name}} - {{i.album.name}}</p>
          <span class="iconfont icon-icon1"></span>
        </div>
      </div>
    </div>
    <!-- loader -->
    <loader v-else></loader>
  </div>
</template>

<script>
import { get } from '../../api/api.js'
import store from '../store'

export default {
  data () {
    return {
      searchData: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      get(`/music/search?keywords=${vm.searchCon}`).then(res => {
        vm.searchData = res.result.songs
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
    },
    loading () {
      return store.state.search.loading
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.song
  position absolute
  width 100%
  height 100%
  top: 40px;
.icon-icon1
  position: absolute;
  top: 25px;
  right: 15px;
  color: #999999;
  font-size: 26px;
.song-box:last-child
  margin-bottom: 50px;
.song-box
  h4,p
    width: 90%;
</style>
