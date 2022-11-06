import Vue from 'vue'
import Router from 'vue-router'

import Auth from '../views/Auth.vue'
import Dashboard from '../views/Dashboard.vue'
import Quiz from '../views/Quiz.vue'
import Viewer from '../views/Viewer.vue'
import QuizTable from '@/components/QuizTable.vue'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      component: Dashboard,
      name: 'dashboard',
      children: [
        {
          path: '/quizes',
          component: QuizTable,
          name: 'quiztable'
        }
      ],
      meta: {
        auth: true
      }
    },
    {
      path: '/auth',
      component: Auth,
      name: 'auth',
      meta: {
        auth: false
      }
    },
    {
      path: '/quiz/builder/:id',
      component: Quiz,
      name: 'quiz.builder',
      meta: {
        auth: true
      }
    },
    {
      path: '/quiz/viewer/:id',
      component: Viewer,
      name: 'quiz.viewer',
      meta: {
        auth: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'auth' })
    }
  } else {
    next()
  }
})