<template>
  <transition name="upDown">
    <div class="search">
      <div class="navbar">
        <span class="iconfont icon-fanhui2" @click="back"></span>
        <div class="inBox">
          <input type="text" class="searchIn" placeholder="音乐、视频、歌词、电台" v-model="searchCon" @keyup.enter="confirmSearch">
        </div>
        <span class="iconfont icon-guanbi" @click="delCon" v-show="searchCon!==''"></span>
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

        <transition :name="searchSlide">
          <router-view></router-view>
        </transition>
      </main>
    </div>
  </transition>
</template>

<script>
// import { get } from '../../api/api.js'
import store from '../store'

export default {
  data () {
    return {
      searchCon: '',
      seleIndex: 0,
      isEnterSearch: true,
      barCon: [
        {typeId: 1, text: '单曲'},
        {typeId: 100, text: '歌手'},
        {typeId: 10, text: '专辑'},
        {typeId: 1000, text: '歌单'},
        {typeId: 1004, text: '视频'},
        {typeId: 1009, text: '主播电台'},
        {typeId: 1002, text: '用户'}
      ],
      searchSlide: '',
      currPath: ''
    }
  },
  watch: {
    $route (to, from) {
      let toPath = to.path.split('/')[2]
      let fromPath = from.path.split('/')[2]
      let objArr = [
        {path: 'song'},
        {path: 'singer'},
        {path: 'album'},
        {path: 'playlist'},
        {path: 'mv'},
        {path: 'radio'},
        {path: 'user'}
      ]
      let toIndex
      let fromIndex
      objArr.map((x, index) => {
        if (toPath === x.path) {
          toIndex = index
          return toIndex
        } else if (fromPath === x.path) {
          fromIndex = index
          return fromIndex
        }
      })
      toIndex > fromIndex ? this.searchSlide = 'lftSlide' : this.searchSlide = 'rgtSlide'
    }
  },
  methods: {
    back () {
      this.$router.replace('/home/music')
    },
    delCon () {
      this.searchCon = ''
      this.$router.replace('/search')
      this.isEnterSearch = true
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
      if (vm.$route.name === 'singer') {
        return
      }
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
      if (vm.$route.name === 'album') {
        return
      }
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
      if (vm.$route.name === 'playlist') {
        return
      }
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
      if (vm.$route.name === 'mv') {
        return
      }
      vm.loading = false
      vm.$router.replace('/search/mv')
      let args = {
        searchCon: vm.searchCon
      }
      store.dispatch('searchParams', args)
    },

    // 电台列表
    _searchRadio () {
      const vm = this
      if (vm.$route.name === 'radio') {
        return
      }
      vm.loading = false
      vm.$router.replace('/search/radio')
      let args = {
        searchCon: vm.searchCon
      }
      store.dispatch('searchParams', args)
    },
    // 用户列表
    _searchUser () {
      const vm = this
      if (vm.$route.name === 'user') {
        return
      }
      vm.loading = false
      vm.$router.replace('/search/user')
      let args = {
        searchCon: vm.searchCon
      }
      store.dispatch('searchParams', args)
    },
    // 默认请求单曲列表
    confirmSearch () {
      const vm = this
      // 如果是在当前页面再点击请求，则不请求
      if (vm.$route.name === 'song') {
        return
      }
      vm.loading = false
      if (!vm.searchCon) {
        return
      }
      vm.isEnterSearch = false
      // 将下划线重置到单曲
      if (vm.seleIndex !== 0) {
        this.$refs.tab.style.transform = `translateX(0)`
        vm.seleIndex = 0
      }
      vm.$router.replace('/search/song')
      vm.currPath = 'song'
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

.lftSlide-enter-active, .lftSlide-leave-active
  transition all 0.3s
.lftSlide-enter
  opacity 0
  transform translateX(50%)
.lftSlide-leave-to
  opacity 0
  transform translateX(-50%)

.rgtSlide-enter-active, .rgtSlide-leave-active
  transition all 0.3s
.rgtSlide-enter
  opacity 0
  transform translateX(-50%)
.rgtSlide-leave-to
  opacity 0
  transform translateX(50%)
</style>
