<template>
    <!-- 专辑内容 -->
  <div class="album">
    <div class="weui-panel weui-panel_access">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="i in albumData">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="i.picUrl" style="width:60px;margin-right:5px;display:block">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{i.name}}</h4>
            <p class="weui-media-box__desc" v-if="i.containedSong===''">{{i.artist.name}} {{i.date}}</p>
            <p class="weui-media-box__desc" v-else>{{i.artist.name}} 包含单曲: {{i.containedSong}}</p>
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
      albumData: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      get(`/music/search?keywords=${vm.searchCon}&type=10`).then(res => {
        vm.albumData = res.result.albums
        vm.albumData.map(x => {
          x.date = vm._exchangeTime(x.publishTime)
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
    // 将时间戳转换为普通日期（不包含时间）
    _exchangeTime (time) {
      let curDate = new Date(parseInt(time)).toLocaleString().split(' ')[0]
      let tmp = curDate.replace(/\//g, '.')
      return tmp
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.album
  position absolute
  width 100%
  height 100%
  top: 40px;
.weui-media-box_appmsg:last-child
  margin-bottom: 50px;
.weui-media-box:before
  left: 85px;
</style>
