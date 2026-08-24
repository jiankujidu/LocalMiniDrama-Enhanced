import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectView from '../views/ProjectView.vue'
import AssetLibraryView from '../views/AssetLibraryView.vue'
import StoryboardView from '../views/StoryboardView.vue'
import SoundDesignView from '../views/SoundDesignView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectView
  },
  {
    path: '/assets',
    name: 'assets',
    component: AssetLibraryView
  },
  {
    path: '/storyboards/:projectId',
    name: 'storyboards',
    component: StoryboardView
  },
  {
    path: '/sound-design/:projectId',
    name: 'sound-design',
    component: SoundDesignView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
