<template>
  <!-- 电台内容 -->
  <div class="radio">
    <div class="weui-panel weui-panel_access" v-if="loading">
      <div class="weui-panel__bd">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="i in radioData">
          <div class="weui-media-box__hd">
            <img class="weui-media-box__thumb" :src="i.picUrl" style="width:70px;margin-right:5px;display:block">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">{{i.name}}</h4>
            <p class="weui-media-box__desc">{{i.dj.nickname}}</p>
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
      radioData: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      get(`/music/search?keywords=${vm.searchCon}&type=1009`).then(res => {
        vm.radioData = res.result.djRadios
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
.radio
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
.weui-media-box__bd
  margin-left: 15px;
.weui-media-box:before
  left 100px
.weui-media-box_appmsg .weui-media-box__hd
  margin-top: -10px;
</style>
