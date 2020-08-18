import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Create from '@/components/create'
import Article from '@/components/article'
import List from '@/components/list'
import FootPrint from '@/components/footPrint'
import Count from '@/components/count'
import ThreeJs from '@/components/ThreeJs'
import PointJs from '@/page/point'
import GeometryJs from '@/page/Geometry'
import SnowJs from '@/page/snow'
import ShadowJs from '@/page/shadow'
import OverallView from '@/page/overallView'

import { Geometry } from 'three'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/article',
      name: 'Article',
      component: Article
    },
    {
      path: '/list/:id',
      name: 'List',
      component: List
    },
    {
      path: '/footprint',
      name: 'FootPrint',
      component: FootPrint
    },
    {
      path: '/count',
      name: 'Count',
      component: Count
    },
    {
      path: '/threeJs',
      name: 'ThreeJs',
      component: ThreeJs
    },
    {
      path: '/pointJs',
      name: 'PointJs',
      component: PointJs
    },
    {
      path: '/geometeryJs',
      name: 'GeometryJs',
      component: GeometryJs
    },
    {
      path: '/snowJs',
      name: 'SnowJs',
      component: SnowJs
    },
    {
      path: '/shadowJs',
      name: 'ShadowJs',
      component: ShadowJs
    },
    {
      path: '/overallView',
      name: 'OverallView',
      component: OverallView
    },
  ]
})
