import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: _import('index')
    }, {
      path: '/login',
      name: 'login',
      component: _import('login')
    }, {
      path: '/adminIndex',
      name: 'adminIndex',
      component: _import('adminIndex')
    }
  ]
})
