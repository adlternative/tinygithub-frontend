import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import LoginView from '../views/LoginView.vue'
import UserHome from '../views/UserHome.vue'
import RepoView from '../views/RepoView.vue'
import TreeView from '../views/TreeView.vue'
import BlobView from '../views/BlobView.vue'
import RegisterView from '@/views/RegisterView.vue'
import LogoutView from '@/views/LogoutView.vue'
import CreateRepositoryView from '@/views/CreateRepositoryView.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/repos',
    name: 'repos',
    children: [{
      path: 'new',
      name: 'createrepo',
      component: CreateRepositoryView,
    }],
  },
  {
    path: '/:username',
    name: 'user-parent',
    children: [{
        path: '',
        name: 'user',
        component: UserHome
      },
      {
        path: ':reponame',
        children: [{
            path: '',
            name: 'repo',
            component: RepoView,
          },
          {
            path: 'tree/:treepath*',
            name: 'tree',
            component: TreeView,
          },
          {
            path: 'blob/:blobpath*',
            name: 'blob',
            component: BlobView,
          },
        ],
      }
    ],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router