<template>
  <div class="navbar">
    <span class="iconfont icon-icon" @click="showSide"></span>

    <div class="icon-box">
      <span class="iconfont icon-yinyue" @click="toMusic"></span>
      <span class="iconfont icon-wangyiyunyinlezizhi-copy" @click="toWYyun"></span>
      <span class="iconfont icon-haoyou" @click="toFriend"></span>
    </div>

    <span class="iconfont icon-chazhao"></span>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    // 将事件触发到父页面
    toMusic () {
      this.$emit('toMusic')
    },
    toWYyun () {
      this.$emit('toWYyun')
    },
    toFriend () {
      this.$emit('toFriend')
    },
    showSide () {
      this.$emit('showSide')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "../pages/styl/public"
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
</style>
