<template>
  <div class="music">
    <main>
      <div class="weui-cells">
          <div class="weui-cell" v-for="i in mainCon">
              <div class="weui-cell__hd">
                <span class="iconfont" :class="i.icon"></span>
              </div>
              <div class="weui-cell__bd">
                  <p>{{i.txt}}</p>
              </div>
              <div class="weui-cell__ft"></div>
          </div>
      </div>
      <!--灰栏-->
      <div class="song-li">
        <div class="lft" @click="showSongLi">
          <span :class="{'ro-deg': isRotate}"></span>
          <p>创建的歌单</p>
        </div>
        <span class="iconfont icon-shezhi" @click="showNew=!showNew"></span>
      </div>

      <div class="like" v-show="isRotate">
        <div class="weui-panel__bd">
          <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
              <div class="weui-media-box__hd">
                  <img class="weui-media-box__thumb" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAeFBMVEUAwAD///+U5ZTc9twOww7G8MYwzDCH4YcfyR9x23Hw+/DY9dhm2WZG0kbT9NP0/PTL8sux7LFe115T1VM+zz7i+OIXxhes6qxr2mvA8MCe6J6M4oz6/frr+us5zjn2/fa67rqB4IF13XWn6ad83nxa1loqyirn+eccHxx4AAAC/klEQVRo3u2W2ZKiQBBF8wpCNSCyLwri7v//4bRIFVXoTBBB+DAReV5sG6lTXDITiGEYhmEYhmEYhmEYhmEY5v9i5fsZGRx9PyGDne8f6K9cfd+mKXe1yNG/0CcqYE86AkBMBh66f20deBc7wA/1WFiTwvSEpBMA2JJOBsSLxe/4QEEaJRrASP8EVF8Q74GbmevKg0saa0B8QbwBdjRyADYxIhqxAZ++IKYtciPXLQVG+imw+oo4Bu56rjEJ4GYsvPmKOAB+xlz7L5aevqUXuePWVhvWJ4eWiwUQ67mK51qPj4dFDMlRLBZTqF3SDvmr4BwtkECu5gHWPkmDfQh02WLxXuvbvC8ku8F57GsI5e0CmUwLz1kq3kD17R1In5816rGvQ5VMk5FEtIiWislTffuDpl/k/PzscdQsv8r9qWq4LRWX6tQYtTxvI3XyrwdyQxChXioOngH3dLgOFjk0all56XRi/wDFQrGQU3Os5t0wJu1GNtNKHdPqYaGYQuRDfbfDf26AGLYSyGS3ZAK4S8XuoAlxGSdYMKwqZKM9XJMtyqXi7HX/CiAZS6d8bSVUz5J36mEMFDTlAFQzxOT1dzLRljjB6+++ejFqka+mXIe6F59mw22OuOw1F4T6lg/9VjL1rLDoI9Xzl1MSYDNHnPQnt3D1EE7PrXjye/3pVpr1Z45hMUdcACc5NVQI0bOdS1WA0wuz73e7/5TNqBPhQXPEFGJNV2zNqWI7QKBd2Gn6AiBko02zuAOXeWIXjV0jNqdKegaE/kJQ6Bfs4aju04lMLkA2T5wBSYPKDGF3RKhFYEa6A1L1LG2yacmsaZ6YPOSAMKNsO+N5dNTfkc5Aqe26uxHpx7ZirvgCwJpWq/lmX1hA7LyabQ34tt5RiJKXSwQ+0KU0V5xg+hZrd4Bn1n4EID+WkQdgLfRNtvil9SPfwy+WQ7PFBWQz6dGWZBLkeJFXZGCfLUjCgGgqXo5TuSu3cugdcTv/HjqnBTEMwzAMwzAMwzAMwzAMw/zf/AFbXiOA6frlMAAAAABJRU5ErkJggg==" alt="">
              </div>
              <div class="weui-media-box__bd">
                  <h4 class="weui-media-box__title">我喜欢的音乐</h4>
                  <span class="iconfont icon-duigou"></span>
                  <p class="weui-media-box__desc">123首，已下载36首</p>
              </div>
              <div class="weui-cell__ft">
                <span class="iconfont icon-shengyin"></span>
              </div>
          </a>
        </div>

      </div>
    </main>
    <!--设置弹窗-->
    <transition name="fade">
      <div class="song-mask" v-show="showNew" @click="showNew=!showNew"></div>
    </transition>
    <transition name="slide">
      <div class="new-song" v-show="showNew">
        <div class="weui-cells__title">创建的歌单</div>
        <div class="weui-cells">
          <div class="weui-cell">
              <div class="weui-cell__hd">
                <span class="iconfont icon-tianjia"></span>
              </div>
              <div class="weui-cell__bd">
                  <p>创建新歌单</p>
              </div>
              <div class="weui-cell__ft"></div>
          </div>
          <div class="weui-cell song">
              <div class="weui-cell__hd">
                <span class="iconfont icon-dibucaidanlantousuchangtai"></span>
              </div>
              <div class="weui-cell__bd">
                  <p>歌单管理</p>
              </div>
              <div class="weui-cell__ft"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainCon: [
        {icon: 'icon-yinyue', txt: '本地音乐'},
        {icon: 'icon-bofang', txt: '最近播放'},
        {icon: 'icon-kehuduanxiazai', txt: '下载管理'},
        {icon: 'icon-diantai', txt: '我的电台'},
        {icon: 'icon-wodeshoucang', txt: '我的收藏'}
      ],
      isRotate: false,
      showNew: false
    }
  },

  methods: {
    showSongLi () {
      const vm = this
      vm.isRotate = !vm.isRotate
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import "./styl/public"
.music
  position absolute
  width 100%
  height 100%
  background-color #fff

main
  position: relative;
  top: 50px;
  z-index: 0;
.weui-cells
  margin-top 0
.iconfont
  font-size: 20px;
  margin-right: 15px;
  color $color
.weui-cell:before
  left: 50px;
.weui-cell__bd p
  font-size 16px

.song-li
  position: absolute;
  width: 100%;
  height: 30px;
  background-color: #eee;
.lft
  position: absolute;
  display: inline-block;
  width: 88%;
  font-size: 12px;
  height: 100%;
  & span
    position: absolute;
    width: 6px;
    height: 6px;
    border-top: 1px solid #777;
    border-right: 1px solid #777;
    left: 15px;
    top: 11px;
    transform: rotate(45deg);
    transition all .3s
  & .ro-deg
    transform: rotate(135deg);
    transition all .3s
  & p
    left: 35px;
    position: absolute;
    line-height: 30px;
    color: #777;
.icon-shezhi
  position: absolute;
  right: 0;
  top: -2px;
  color: #777;
  width: 7%;

.like
  position: relative;
  top: 30px;
.weui-media-box:after
  content: " ";
  position: absolute;
  bottom: 10px;
  right: 0;
  height: 1px;
  border-top: 1px solid #eee;
  color: #E5E5E5;
  left: 90px;
.icon-shengyin
  margin-right: 0;
.weui-media-box__desc
  display: inline-block;
  font-size: 12px;
  position: absolute;
  margin: 7px 0 0 5px;
.icon-duigou
  font-size: 12px;
  margin-right: 0;
  color #3498DB
  margin-left: 5px;

.song-mask
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  top: 0;
  z-index: 2;
.new-song
  position: absolute;
  width: 100%;
  background-color: #fff;
  bottom: 0;
  z-index: 2;
  padding-top: 10px;
  padding-bottom: 10px;

.weui-cells:before
  display none
.weui-cells:after
  left: 40px;
.song:before
  left: 40px;
.fade-enter-active, .fade-leave-active
    transition opacity 0.6s
.fade-enter, .fade-leave-to
    opacity 0
    
.slide-enter-active, .slide-leave-active
    transition all 0.3s 
.slide-enter, .slide-leave-to
    transform translateY(100%)
</style>
