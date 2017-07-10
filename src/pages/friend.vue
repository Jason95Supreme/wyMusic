<template>
  <div class="friend">
    <main>
      <div class="hot-topic">

      </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.friend
  position absolute
  width 100%
  height 100%
  background-color #fff
main
  position: relative;
  top: 50px;
  z-index: 0;
.hot-topic
  position: relative;
  width: 100%;
  height: 40px;
  background: green;
</style>
