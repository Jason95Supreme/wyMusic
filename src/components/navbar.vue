<template>
  <div class="navbar">
    <span class="iconfont icon-fanhui2" @click="back"></span>
    <div class="inBox">
      <input type="text" class="searchIn" placeholder="音乐、视频、歌词、电台" v-model="searchCon" @keyup.enter="confirmSearch">
    </div>
    <span class="iconfont icon-guanbi" @click="back" v-show="searchCon!==''"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // searchCon: ''
    }
  },
  computed: {
    searchCon () {
      this.$emit('confirmSearch')
    }
  },
  methods: {
    // 将事件触发到父页面
    back () {
      this.$emit('back')
    },
    confirmSearch () {
      this.$emit('confirmSearch', this.searchCon)
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
  height: 26px;
  position: absolute;
  top: 12px;
  width: 100%;
  caret-color: #fff;
  padding-left 5px

input::-webkit-input-placeholder
  color rgba(255,255,255,0.3)
  font-size 16px

</style>
