import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Panier from '../views/Panier.vue';
import Ajouter from '../views/Ajouter.vue';
import Contact from '../views/Contact.vue';
import Connexion from '../views/Connexion.vue';

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
      component: Ajouter,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/connexion',
      name: 'Connexion',
      component: Connexion
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Vérifie si l'utilisateur est connecté
    if (!isLoggedIn()) {
      // Si l'utilisateur n'est pas connecté, redirige vers la page de connexion
      next({
        name: 'Connexion',
        query: { redirect: to.fullPath }
      });
    } else {
      // Si l'utilisateur est connecté, continue
      next();
    }
  } else {
    // Si la route ne nécessite pas d'authentification, continue
    next();
  }
});

function isLoggedIn() {
  // Vérifie si l'utilisateur est connecté
  // Renvoie true si l'utilisateur est connecté, false sinon
  // Remplacez cette fonction par votre propre logique d'authentification
  return true;
}

export default router;