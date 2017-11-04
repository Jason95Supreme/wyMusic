<template>
  <div id="app">
    <transition name="upDown">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app'
  // watch: {
  //   '$route' (to, from) {
  //     // const vm = this
  //     let toPath = to.path.split('/')
  //     let fromPath = from.path.split('/')
  //     console.log('path:', toPath, '|', fromPath)
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 768px;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.upDown-enter-active, .upDown-leave-active
  transition all .5s
.upDown-enter, .upDown-leave-to
  opacity 0
</style>
