<template>
  <transition name="upDown">
    <div class="search">
      <!-- <navbar v-on:back="back" v-on:confirmSearch="confirmSearch"></navbar> -->
      <div class="navbar">
        <span class="iconfont icon-fanhui2" @click="back"></span>
        <div class="inBox">
          <input type="text" class="searchIn" placeholder="音乐、视频、歌词、电台" v-model="searchCon" @keyup.enter="confirmSearch">
        </div>
        <span class="iconfont icon-guanbi" @click="searchCon=''" v-show="searchCon!==''"></span>
      </div>

      <div class="singer-type" v-if="isEnterSearch">
        <span class="iconfont icon-flyme_icon-"></span>
        <span class="icon-singer">歌手分类</span>
        <span class="iconfont icon-iconfontqianjin"></span>
      </div>

      <main v-else>
        <!-- 横向选择栏 -->
        <div class="typeBar">
          <div class="bar" v-for="(i, index) in barCon" :class="{isAc: index === seleIndex}" @click="changeTab(index)">{{i.text}}</div>
          <span class="under-highline" ref="tab"></span>
        </div>
        <!-- loader -->
        <loader v-show="!loading"></loader>

        <div v-show="loading">
          <transition name="searchSlide">
            <router-view></router-view>
          </transition>
        
          <!-- 视频内容 -->
          <!-- <div class="weui-panel weui-panel_access" v-show="barCon[seleIndex].text === '视频'">
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
          </div> -->
          <!-- 电台内容 -->
            <div class="weui-panel weui-panel_access" v-show="barCon[seleIndex].text === '主播电台'">
              <div class="weui-panel__bd">
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="i in radioData">
                  <div class="weui-media-box__hd">
                    <img class="weui-media-box__thumb" :src="i.picUrl" style="width:60px;margin-right:5px;display:block">
                  </div>
                  <div class="weui-media-box__bd">
                    <h4 class="weui-media-box__title">{{i.name}}</h4>
                    <p class="weui-media-box__desc">{{i.dj.nickname}}</p>
                  </div>
                </a>
              </div>
            </div>
          <!-- 用户内容 -->
            <div class="weui-panel weui-panel_access" v-show="barCon[seleIndex].text === '用户'">
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
          </div>
      </main>
    </div>
  </transition>
</template>

<script>
import { get } from '../../api/api.js'
import store from '../store'
export default {
  data () {
    return {
      searchCon: '',
      seleIndex: 0,
      isEnterSearch: true,
      // loading: false,
      barCon: [
        {typeId: 1, text: '单曲'},
        {typeId: 100, text: '歌手'},
        {typeId: 10, text: '专辑'},
        {typeId: 1000, text: '歌单'},
        {typeId: 1004, text: '视频'},
        {typeId: 1009, text: '主播电台'},
        {typeId: 1002, text: '用户'}
      ],
      // searchData: [],
      // singerData: [],
      // albumData: [],
      // playListData: [],
      // mvData: [],
      radioData: [],
      userData: []
    }
  },
  methods: {
    back () {
      this.$router.replace('/home/music')
    },
    changeTab (index) {
      let tmp = index * 100
      this.$refs.tab.style.transform = `translateX(${tmp}%)`
      this.seleIndex = index
      switch (this.barCon[index].text) {
        case '单曲': this.confirmSearch()
          break
        case '歌手': this._searchSinger()
          break
        case '专辑': this._searchAlbum()
          break
        case '歌单': this._searchPlayList()
          break
        case '视频': this._searchMV()
          break
        case '主播电台': this._searchRadio()
          break
        case '用户': this._searchUser()
          break
      }
    },
    // 歌手列表
    _searchSinger () {
      const vm = this
      vm.loading = false
      vm.$router.replace('/search/singer')
      let args = {
        searchCon: vm.searchCon
      }
      store.dispatch('searchParams', args)
    },

    // 专辑列表
    _searchAlbum () {
      const vm = this
      vm.loading = false
      vm.$router.replace('/search/album')
      let args = {
        searchCon: vm.searchCon
      }
      store.dispatch('searchParams', args)
    },
    // 歌单列表
    _searchPlayList () {
      const vm = this
      vm.loading = false
      vm.$router.replace('/search/playlist')
      let args = {
        searchCon: vm.searchCon
      }
      store.dispatch('searchParams', args)
    },

    // MV列表
    _searchMV () {
      const vm = this
      vm.loading = false
      vm.$router.replace('/search/mv')
      let args = {
        searchCon: vm.searchCon
      }
      store.dispatch('searchParams', args)
      // get(`/music/search?keywords=${this.searchCon}&type=1004`).then(res => {
      //   vm.mvData = res.result.mvs
      //   vm.mvData.map(x => {
      //     x.mvTime = vm._mvTime(x.duration)
      //     x.playCounts = vm._playCount(x.playCount, 'mv')
      //   })
      //   vm.loading = true
      // }).catch(error => {
      //   console.log(error)
      // })
    },

    // 电台列表
    _searchRadio () {
      const vm = this
      vm.loading = false
      get(`/music/search?keywords=${this.searchCon}&type=1009`).then(res => {
        vm.radioData = res.result.djRadios
        vm.loading = true
        // console.log('vm.albumData:', vm.albumData)
      }).catch(error => {
        console.log(error)
      })
    },
    // 用户列表
    _searchUser () {
      const vm = this
      vm.loading = false
      get(`/music/search?keywords=${this.searchCon}&type=1002`).then(res => {
        vm.userData = res.result.userprofiles
        vm.loading = true
        // console.log('vm.albumData:', vm.albumData)
      }).catch(error => {
        console.log(error)
      })
    },
    // 默认请求单曲列表
    confirmSearch () {
      const vm = this
      vm.loading = false
      if (!vm.searchCon) {
        return
      }
      vm.isEnterSearch = false
      // vm.seleIndex = 0
      vm.$router.replace('/search/song')
      let args = {
        searchCon: vm.searchCon
      }
      store.dispatch('searchParams', args)
    }
  },
  computed: {
    loading () {
      return store.state.search.loading
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import './styl/public'
.navbar
  position fixed
  width 100%
  height 50px
  background-color $color
  z-index: 1;
  max-width: 768px;
.icon-fanhui2
  font-size: 26px;
  color: #fff;
  margin-left: 15px;
  line-height: 50px;
.icon-guanbi
  font-size: 16px;
  color: #fff;
  position: absolute;
  line-height: 50px;
  right: 25px;
.inBox
  position: absolute;
  left: 50px;
  right: 20px;
  height: 100%;
  top: 0;
.searchIn
  outline: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  height: 36px;
  position: absolute;
  top: 5px;
  width: 100%;
  caret-color: #fff;
  padding-left 5px
  color rgba(255,255,255,0.8)
  font-size: 20px;
input::-webkit-input-placeholder
  color rgba(255,255,255,0.3)
  font-size 16px
.search
  position absolute
  width 100%
  height 100%
  background-color #fff
main
  position: relative;
  top: 50px;
  overflow: auto;
  z-index: 0;
  height: 100%;
.nav
  width 100%
  height 50px
  background-color $color

.upDown-enter-active, .upDown-leave-active
  transition all .3s
.upDown-enter, .upDown-leave-to
  transform translateY(100%)
  opacity 0

.typeBar
  width:100%
  height 40px
  display: inline;
  white-space: nowrap;
  overflow-x:scroll;
  overflow-y hidden
  float:left;
  position: fixed;
  z-index: 10;
  background-color: #fff;
  box-shadow: 0 0px 5px #ccc;
  max-width: 768px;
  ::after
    clear both
  div
    width: 80px;
    height: 92%;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    margin-left: -5px;
  .isAc
    color #ffa33e
  .under-highline
    position: absolute;
    width: 75px;
    height: 2px;
    background-color: #ffa33e;
    left: 0px;
    bottom: 0;
    transition all .2s

.weui-panel
  width 100%
  margin-bottom: 50px;
  margin-top: 40px;
.weui-media-box
  padding-right: 50px;
// .icon-icon1
//   position: absolute;
//   top: 25px;
//   right: 15px;
//   color: #999999;
//   font-size: 26px;

.weui-cells
  width 100%
  margin-bottom: 50px;
  margin-top: 40px;
.weui-cell__bd p
  white-space: nowrap;
  width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
.weui-media-box__title
  margin-bottom: 10px;
// .account
//   font-size 14px
//   margin-left: 5px;
// .weui-media-box_appmsg .weui-media-box__thumb
//   max-height none
// .weui-media-box_appmsg .mv-bd
//   margin-left: 10px
// .mv-hd
//   width: 110px;
//   position: relative;
// .mv-thumb
//   width: 120px;
//   height: 75px;
//   margin-right: 5px;
//   display: block;
//   margin-top: -7px;
// .icon-shipin
//   position: absolute;
//   top: -25px;
//   color: #fff;
//   font-size: 18px;
//   right: 0;
//   .mv-count
//     font-size: 12px;
//     margin-left: 2px;
//     position: relative;
//     top: -1px;
// .icon-MV
//   color: #ffa33e;
//   font-size: 23px;
//   position: relative;
//   top: 2px;

.weui-media-box
  padding: 5px 15px;
  &:before
    left: 85px;
// .mv-box:before
//   left: 150px;
.song-box,
.mv-box
  padding: 15px;
.song-box:before
  left: 15px;
.weui-cell:before
  left: 70px;
.user-box
  padding: 15px;

.icon-music
  color: #FF2434
  position: absolute;
  top: 40px;
  font-size: 20px;
  margin-left: 5px;
  transform rotate(30deg)

.singer-type
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #eee;
  margin-top: 50px;
  text-align: center;
  &:active
    background: rgba(0,0,0,0.1);
  span
    font-size 20px
  .icon-flyme_icon-
    font-size: 30px;
    line-height: 50px;
    color: #999;
  .icon-singer
    font-size: 16px;
    position: relative;
    top: -4px;
    color: #333;
    margin-left: 5px;
  .icon-iconfontqianjin
    color: #999;
    margin-left: 5px;
    position: relative;
    top: -2px;

.searchSlide-enter-active, .searchSlide-leave-active
  transition all .2s
.searchSlide-enter
  transform translateX(-100%)
.searchSlide-leave-to
  transform translateX(100%)
</style>
