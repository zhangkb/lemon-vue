import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Create from '@/components/create'
import Article from '@/components/article'
import List from '@/components/list'
import FootPrint from '@/components/footPrint'
import Count from '@/components/count'

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
  ]
})
