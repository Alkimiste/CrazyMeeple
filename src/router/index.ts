import { createRouter, createWebHistory } from 'vue-router'
import Accueil from '../views/Accueil.vue'
import Panier from '../views/Panier.vue'
import Ajouter from '../views/Ajouter.vue'
import Contact from '../views/Contact.vue'
import Connexion from '../views/Connexion.vue'

// Create the router instance
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
        requiresAuth: true // Meta field to indicate that authentication is required to access this route
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
})

// Add navigation guards to the router
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!isLoggedIn()) {
      // If the user is not authenticated, redirect to the login page
      next({
        name: 'Connexion',
        query: { redirect: to.fullPath } // Pass the current path as a query parameter to use it after login
      });
    } else {
      // If the user is authenticated, continue
      next();
    }
  } else {
    // If the route does not require authentication, continue
    next();
  }
});

// Replace this function with your own authentication logic
function isLoggedIn() {
  // Check if the user is authenticated
  // Returns true if the user is authenticated, false otherwise
  return true
}

export default router