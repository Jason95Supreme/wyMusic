<template>
    <!-- loader -->
    <div class="loader">
      <div>
        <span class="ani ani-1"></span>
        <span class="ani ani-2"></span>
        <span class="ani ani-3"></span>
        <span class="ani ani-4"></span>
        <span class="txt">努力加载中…</span>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
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
