<template>
  <!-- 歌手内容 -->
  <div class="singer">
    <div class="weui-cells" v-if="loading">
      <div class="weui-cell" v-for="i in singerData">
        <div class="weui-cell__hd">
          <img :src="i.img1v1Url"style="width:60px;margin-right:5px;display:block">
        </div>
        <div class="weui-cell__bd">
          <p>{{i.name}}</p>
        </div>
        <div class="weui-cell__ft" v-if="i.hasOwnProperty('accountId')">
          <span class="iconfont icon-yonghu" style="color: #ffa33e"></span>
          <span class="account">已入驻</span>
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
      singerData: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      get(`/music/search?keywords=${vm.searchCon}&type=100`).then(res => {
        vm.singerData = res.result.artists
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
.singer
  position absolute
  width 100%
  height 100%
  top: 20px;
.weui-cells 
  position: absolute;
  margin-bottom: 50px;
  width: 100%;
.weui-cell:before
  left: 80px;
</style>
