<template>
  <div class="home">
    <!--监听子组件触发的事件，执行当前事件-->
    <navbar v-on:toMusic="music" v-on:toWYyun="wyyun" v-on:toFriend="friend" v-on:showSide="side"></navbar>
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
      let toPath = to.path.split('/')[2].length
      let fromPath = from.path.split('/')[2].length
      toPath > fromPath ? vm.slide = 'lftSlide' : vm.slide = 'rgtSlide'
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
