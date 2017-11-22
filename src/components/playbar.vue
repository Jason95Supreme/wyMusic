<template>
    <div class="playbar">
      <img :src="imgUrl"style="width:40px;height:40px;margin:5px;display:block">
      <p class="song">{{songName}}</p>
      <p class="singer">{{singerName}}</p>
      
      <audio :src="playUrl" ref="audio" autoplay></audio>

      <canvas id="canvas"></canvas>
      <button @click="play" style="position:absolute;top: 0;">play</button>
      <button @click="pause" style="position:absolute;top: 20px;">pause</button>
    </div>
</template>

<script>
import store from '../store'
export default {
  data () {
    return {}
  },
  computed: {
    imgUrl () {
      return store.state.play.imgUrl
    },
    songName () {
      return store.state.play.songName
    },
    singerName () {
      return store.state.play.singerName
    },
    playUrl () {
      return store.state.play.playUrl
    },
    playState () {
      return store.state.play.playState
    }
  },
  watch: {
    // playState (newVal, oldVal) {
    //   const vm = this
    //   if (newVal) {
    //     console.log(newVal)
    //     vm.$refs.audio.play()
    //   }
    // }
  },
  methods: {
    play () {
      console.log(this.$refs.audio)
      this.$refs.audio.play()
    },
    pause () {
      this.$refs.audio.pause()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.playbar
  position: fixed;
  width: 100%;
  bottom: 0;
  height: 50px;
  background: #fff;
  box-shadow: 0 0 5px #ccc;
  font-size: 14px;  
.song
  position: absolute;
  width: 200px;
  top: 5px;
  left: 55px;
.singer
  position: absolute;
  width: 200px;
  bottom: 5px;
  color: #aaa;
  left: 55px;
</style>
