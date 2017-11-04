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
        <div v-show="!loading" class="loader">
          <div>
            <span class="ani ani-1"></span>
            <span class="ani ani-2"></span>
            <span class="ani ani-3"></span>
            <span class="ani ani-4"></span>
            <span class="txt">努力加载中…</span>
          </div>
        </div>

        <div v-show="loading">
          <!-- 单曲内容 -->
            <div class="weui-panel weui-panel_access" v-show="barCon[seleIndex].text === '单曲'">
              <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text song-box" v-for="i in searchData">
                  <h4 class="weui-media-box__title">{{i.name}}</h4>
                  <p class="weui-media-box__desc">{{i.artists[0].name}} - {{i.album.name}}</p>
                  <span class="iconfont icon-icon1"></span>
                </div>
              </div>
            </div>
          <!-- 歌手内容 -->
            <div class="weui-cells" v-show="barCon[seleIndex].text === '歌手'">
                <div class="weui-cell" v-for="i in singerData">
                    <div class="weui-cell__hd">
                      <img :src="i.img1v1Url"style="width:50px;margin-right:5px;display:block">
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
          <!-- 专辑内容 -->
            <div class="weui-panel weui-panel_access" v-show="barCon[seleIndex].text === '专辑'">
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
          <!-- 歌单内容 -->
          <div class="weui-panel weui-panel_access" v-show="barCon[seleIndex].text === '歌单'">
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
          <!-- 视频内容 -->
          <div class="weui-panel weui-panel_access" v-show="barCon[seleIndex].text === '视频'">
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
export default {
  data () {
    return {
      searchCon: '',
      seleIndex: 0,
      isEnterSearch: true,
      loading: false,
      barCon: [
        {typeId: 1, text: '单曲'},
        {typeId: 100, text: '歌手'},
        {typeId: 10, text: '专辑'},
        {typeId: 1000, text: '歌单'},
        {typeId: 1004, text: '视频'},
        {typeId: 1009, text: '主播电台'},
        {typeId: 1002, text: '用户'}
      ],
      searchData: [],
      singerData: [],
      albumData: [],
      playListData: [],
      mvData: [],
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
      get(`/music/search?keywords=${this.searchCon}&type=100`).then(res => {
        vm.singerData = res.result.artists
        vm.loading = true
      }).catch(error => {
        console.log(error)
      })
    },

    // 专辑列表
    _searchAlbum () {
      const vm = this
      vm.loading = false
      get(`/music/search?keywords=${this.searchCon}&type=10`).then(res => {
        vm.albumData = res.result.albums
        vm.albumData.map(x => {
          x.date = vm._exchangeTime(x.publishTime)
        })
        vm.loading = true
      }).catch(error => {
        console.log(error)
      })
    },
    // 歌单列表
    _searchPlayList () {
      const vm = this
      vm.loading = false
      get(`/music/search?keywords=${this.searchCon}&type=1000`).then(res => {
        vm.playListData = res.result.playlists
        vm.playListData.map(x => {
          x.playCounts = vm._playCount(x.playCount, 'playlist')
        })
        vm.loading = true
      }).catch(error => {
        console.log(error)
      })
    },

    // MV列表
    _searchMV () {
      const vm = this
      vm.loading = false
      get(`/music/search?keywords=${this.searchCon}&type=1004`).then(res => {
        vm.mvData = res.result.mvs
        vm.mvData.map(x => {
          x.mvTime = vm._mvTime(x.duration)
          x.playCounts = vm._playCount(x.playCount, 'mv')
        })
        vm.loading = true
      }).catch(error => {
        console.log(error)
      })
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
    // 将时间戳转换为普通日期（不包含时间）
    _exchangeTime (time) {
      let curDate = new Date(parseInt(time)).toLocaleString().split(' ')[0]
      let tmp = curDate.replace(/\//g, '.')
      return tmp
    },

    // 将mv时长（毫秒）转换为分钟数
    _mvTime (duration) {
      // 取时间整数
      let minute = ((duration / 1000) / 60).toString().split('.')[0]
      let seconds = ((duration / 1000) % 60)
      return minute < 10 ? `0${minute}:${seconds}` : `${minute}:${seconds}`
    },

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
    },
    // 默认请求单曲列表
    confirmSearch () {
      const vm = this
      vm.loading = false
      if (!vm.searchCon) {
        return
      }
      get(`/music/search?keywords=${this.searchCon}`).then(res => {
        vm.searchData = res.result.songs
        vm.seleIndex = 0
        vm.isEnterSearch = false
        vm.loading = true
        // console.log(vm.searchData)
      }).catch(error => {
        console.log(error)
      })
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
.icon-icon1
  position: absolute;
  top: 25px;
  right: 15px;
  color: #999999;
  font-size: 26px;

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
.account
  font-size 14px
  margin-left: 5px;
.weui-media-box_appmsg .weui-media-box__thumb
  max-height none
.weui-media-box_appmsg .mv-bd
  margin-left: 10px
.mv-hd
  width: 110px;
  position: relative;
.mv-thumb
  width: 120px;
  height: 75px;
  margin-right: 5px;
  display: block;
  margin-top: -7px;
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
  font-size: 23px;
  position: relative;
  top: 2px;

.weui-media-box
  padding: 5px 15px;
  &:before
    left: 85px;
.mv-box:before
  left: 150px;
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

.loader
  position: absolute;
  background: #fff;
  width: 100%;
  height: calc(100% - 90px);
  top: 40px;
  div
    margin-top: 100px;
    text-align: center;
    overflow: hidden;
    height: 25px;
    position: relative;

.ani
  position absolute
  width: 2px;
  background-color: #ffa33e;
.ani-1
  margin-left: -20px;
  height: 15px;
  margin-top: 10px;
  animation ani1 1s linear infinite
.ani-2
  margin-left: -15px;
  margin-top: 15px;
  height: 15px;
  animation ani2 1s linear infinite
.ani-3
  margin-left: -10px;
  margin-top: 5px;
  height: 20px;
  animation ani1 1s linear infinite
.ani-4
  margin-left: -5px;
  margin-top: 20px;
  height: 15px;
  animation ani2 1s linear infinite
@keyframes ani1 {
  0%{transform: translateY(0);}
  50%{transform: translateY(10px);}
  100%{transform: translateY(0);}
}
@keyframes ani2 {
  0%{transform: translateY(0);}
  50%{transform: translateY(-5px);}
  100%{transform: translateY(0);}
}
.txt
  margin-left 10px
  top: 5px;
  position: relative;
  color: #555;
</style>
