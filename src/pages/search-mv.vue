<template>
  <!-- 视频内容 -->
  <div class="mv">
    <div class="weui-panel weui-panel_access" v-if="loading">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg mv-box" v-for="i in mvData">
          <div class="weui-media-box__hd mv-hd">
            <img class="weui-media-box__thumb mv-thumb" :src="i.cover">
            <span class="iconfont icon-shipin">
              <span class="mv-count">{{i.playCounts}}</span>
            </span>
          </div>
          <div class="weui-media-box__bd mv-bd">
            <h4 class="weui-media-box__title">
              <span class="iconfont icon-MV"></span>
              {{i.name}}
            </h4>
            <p class="weui-media-box__desc">{{i.mvTime}}  {{i.artistName}}</p>
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
      mvData: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      get(`/music/search?keywords=${vm.searchCon}&type=1004`).then(res => {
        vm.mvData = res.result.mvs
        vm.mvData.map(x => {
          x.mvTime = vm._mvTime(x.duration)
          x.playCounts = vm._playCount(x.playCount, 'mv')
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
    },
    loading () {
      return store.state.search.loading
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
          return `${intTmp}万`
        } else {
          return `${count}`
        }
      }
    },
    // 将mv时长（毫秒）转换为分钟数
    _mvTime (duration) {
      // 取时间整数
      let minute = ((duration / 1000) / 60).toString().split('.')[0]
      let seconds = ((duration / 1000) % 60)
      if (minute < 10) {
        if (seconds < 10) {
          return `0${minute}:0${seconds}`
        } else {
          return `0${minute}:${seconds}`
        }
      } else {
        if (seconds < 10) {
          return `${minute}:0${seconds}`
        } else {
          return `${minute}:${seconds}`
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.mv
  position absolute
  width 100%
  height 100%
  top: 40px;
.weui-panel
  position: absolute;
  width: 100%;
  margin-bottom: 50px;
.weui-media-box_appmsg .weui-media-box__thumb
  max-height none
.weui-media-box_appmsg .mv-bd
  margin-left: 10px
.mv-box:before
  left: 150px;
.mv-box
  padding: 15px;
.mv-hd
  width: 110px;
  position: relative;
.mv-thumb
  width: 120px;
  height: 75px;
  margin-right: 5px;
  margin-top: -7px;
  box-shadow: 0 0 1px #ccc;
.icon-shipin
  position: absolute;
  top: -25px;
  color: #fff;
  font-size: 18px;
  right: 0;
  .mv-count
    font-size: 12px;
    margin-left: 2px;
    position: relative;
    top: -1px;
.icon-MV
  color: #ffa33e;
  font-size: 30px;
  position: relative;
  top: 5px;
</style>
