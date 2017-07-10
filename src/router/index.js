import Vue from 'vue'
import Router from 'vue-router'
import 'weui'

import home from '../pages/home'
import music from '../pages/music'
import wyyun from '../pages/wyyun'
import friend from '../pages/friend'

Vue.component('navbar', require('@/components/navbar'))
Vue.component('sidebar', require('@/components/sidebar'))
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
      path: '/',
      redirect: {name: 'music'}
    }
  ]
})
