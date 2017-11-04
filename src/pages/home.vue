<template>
  <div class="home">
    <!--监听子组件触发的事件，执行当前事件-->
    <div class="navbar">
      <span class="iconfont icon-icon" @click="side"></span>
      <div class="icon-box">
        <span class="iconfont icon-yinyue" @click="music"></span>
        <span class="iconfont icon-wangyiyunyinlezizhi-copy" @click="wyyun"></span>
        <span class="iconfont icon-haoyou" @click="friend"></span>
      </div>
      <span class="iconfont icon-chazhao"@click="search" ></span>
    </div>

    <!--渲染子页面-->
    <transition :name="slide">
      <router-view></router-view>       
    </transition>
    
    <sidebar :side="isSide" v-on:hide="changeSide"></sidebar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: '',
      isSide: false
    }
  },
  // 监听路径变化执行动画
  watch: {
    '$route' (to, from) {
      const vm = this
      if (from.path.split('/')[1] === 'home') {
        let toPath = to.path.split('/')[2].length
        let fromPath = from.path.split('/')[2].length
        toPath > fromPath ? vm.slide = 'lftSlide' : vm.slide = 'rgtSlide'
      }
    }
  },
  methods: {
    music () {
      this.$router.replace('/home/music')
    },
    wyyun () {
      this.$router.replace('/home/wyiyun')
    },
    friend () {
      this.$router.replace('/home/myfriend')
    },
    search () {
      this.$router.replace('/search')
    },
    side () {
      this.isSide = true
    },
    changeSide () {
      this.isSide = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "./styl/public"
.navbar
  position fixed
  width 100%
  height 50px
  background-color $color
  z-index: 1;
  max-width: 768px;
.icon-icon
    position: absolute;
    left: 15px;
    font-size: 26px;
    line-height: 50px;
    color: #fff;
.icon-box
    position: absolute;
    width: 50%;
    height: 100%;
    left: 0;
    right: 0;
    margin: 0 auto;
.icon-yinyue,
.icon-wangyiyunyinlezizhi-copy,
.icon-haoyou 
    position: relative;
    line-height: 50px;
    color: #fff;
.icon-yinyue 
    left: 15px;
    font-size: 23px;   
.icon-wangyiyunyinlezizhi-copy
    left: 27%;
    font-size: 26px; 
.icon-haoyou 
    left: 45%;
    font-size: 26px;

.icon-chazhao
  position: absolute;
  right: 15px;
  font-size: 22px;
  line-height: 50px;
  color: #fff;

.mask
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
.side-con
    position: fixed;
    width: 80%;
    height: 100%;
    left: 0;
    background: #fff;
.fade-enter-active, .fade-leave-active
    transition opacity 0.6s
.fade-enter, .fade-leave-to
    opacity 0
    
.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translateX(-100%)
    
.home
  position absolute
  width 100%
  height 100%
  background-color #fff

.lftSlide-enter-active, .lftSlide-leave-active
  transition all 0.3s
.lftSlide-enter
  transform translateX(100%)
.lftSlide-leave-to
  transform translateX(-100%)

.rgtSlide-enter-active, .rgtSlide-leave-active
  transition all 0.3s
.rgtSlide-enter
  transform translateX(-100%)
.rgtSlide-leave-to
  transform translateX(100%)

</style>
