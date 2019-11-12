import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  //商品
    {
      path :'/',
      component :()=>import("../views/child/Goods.vue")

    },
    //评价
    {
      path :'/evaluation',
      component :()=>import("../views/child/Evaluation.vue")

    },
    //商家
     {
      path :'/merchants',
      component :()=>import("../views/child/Merchants.vue")

    },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
