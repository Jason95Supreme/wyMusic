<template>
  <!-- 用户内容 -->
  <div class="user">
    <div class="weui-panel weui-panel_access" v-if="loading">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg user-box" v-for="i in userData">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="i.avatarUrl" style="width:60px;margin-right:5px;display:block;border-radius:50%">
            <span class="iconfont icon-music" v-show="i.authStatus!==0"></span>
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">
              {{i.nickname}}
              <span class="iconfont icon-nan" style="color:#33b1eb" v-if="i.gender===1"></span>
              <span class="iconfont icon-nv" style="color:#FC6E8C" v-else></span>
            </h4>
            <p class="weui-media-box__desc">{{i.signature}}</p>
          </div>
        </a>
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
      userData: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      get(`/music/search?keywords=${vm.searchCon}&type=1002`).then(res => {
        vm.userData = res.result.userprofiles
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
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.user
  position absolute
  width 100%
  height 100%
  top: 40px;
.weui-panel
  position: absolute;
  width: 100%;
  margin-bottom: 50px;
.user-box
  padding: 15px;
.icon-music
  color: #FF2434
  position: absolute;
  top: 40px;
  font-size: 20px;
  margin-left: 5px;
  transform rotate(30deg)
.weui-media-box:before
  left: 85px;
</style>
