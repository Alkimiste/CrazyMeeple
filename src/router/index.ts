import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Panier from '../views/Panier.vue'
import Ajouter from '../views/Ajouter.vue'
import Contact from '../views/Contact.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Accueil',
      component: Accueil
    },
    {
      path: '/panier',
      name: 'Panier',
      component: Panier
    },
    {
      path: '/ajouter',
      name: 'Ajouter',
      component: Ajouter
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
  ]
})

export default router