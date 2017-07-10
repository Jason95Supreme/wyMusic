<template>
  <div class="sidebar">
    <transition name="fade">
      <div class="mask" v-show="side" @click="hide"></div>
    </transition>

    <transition name="slide">
      <div class="side-con" v-show="side">
        <div class="person-msg">

        </div>

        <div class="operate">

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    side: Boolean
  },
  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
    hide () {
      console.log(this.side)
      this.$emit('hide')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

.mask
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index 1
.side-con
  position: absolute;
  width: 80%;
  height: 100%;
  left: 0;
  background: #fff;
  z-index 1

.fade-enter-active, .fade-leave-active
  transition opacity 0.6s
.fade-enter, .fade-leave-to
  opacity 0
  
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translateX(-100%)
</style>
