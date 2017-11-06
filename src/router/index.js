import Vue from 'vue'
import Router from 'vue-router'
import 'weui'

import home from '../pages/home'
import music from '../pages/music'
import wyyun from '../pages/wyyun'
import friend from '../pages/friend'
import search from '../pages/search'
import song from '../pages/search-song'
import singer from '../pages/search-singer'
import album from '../pages/search-album'
import playlist from '../pages/search-playlist'
import mv from '../pages/search-mv'
import radio from '../pages/search-radio'
import user from '../pages/search-user'

Vue.component('navbar', require('@/components/navbar'))
Vue.component('sidebar', require('@/components/sidebar'))
Vue.component('loader', require('@/components/loader'))
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/home/music',
          name: 'music',
          component: music
        },
        {
          path: '/home/wyiyun',
          name: 'wyyun',
          component: wyyun
        },
        {
          path: '/home/myfriend',
          name: 'friend',
          component: friend
        }
      ]
    },
    {
      path: '/search',
      component: search,
      children: [
        {
          path: '/search/song',
          name: 'song',
          component: song
        },
        {
          path: '/search/singer',
          name: 'singer',
          component: singer
        },
        {
          path: '/search/album',
          name: 'album',
          component: album
        },
        {
          path: '/search/playlist',
          name: 'playlist',
          component: playlist
        },
        {
          path: '/search/mv',
          name: 'mv',
          component: mv
        },
        {
          path: '/search/radio',
          name: 'radio',
          component: radio
        },
        {
          path: '/search/user',
          name: 'user',
          component: user
        }
      ]
    },
    {
      path: '/',
      redirect: {name: 'music'}
    }
  ]
})
