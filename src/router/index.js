import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'
import PC from '@/components/pc/PC'
import Mobile from '@/components/mobile/Mobile'
import Pagination from '@/components/pc/Pagination/Demo'
import Switch from '@/components/mobile/Switch/Demo'
import Slider from '@/components/mobile/Slider/Demo'
import Scroll from '@/components/mobile/Scroll/Demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/pc',
      component: PC,
      children: [
        {
          path: 'pagination',
          component: Pagination
        }
      ]
    },
    {
      path: '/mobile',
      component: Mobile,
      children: [
        {
          path: 'switch',
          component: Switch
        },
        {
          path: 'slider',
          component: Slider
        },
        {
          path: 'scroll',
          component: Scroll
        }
      ]
    }
  ]
})
