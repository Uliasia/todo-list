import Vue from 'vue'
import Router from 'vue-router'
import NoteList from '@/pages/NoteList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: NoteList
    },
    {
      path: '/note/:id',
      component: () => import('./pages/NoteItem.vue')
    }
  ]
})
