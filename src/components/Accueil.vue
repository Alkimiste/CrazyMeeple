<template>
  <div class="background"></div>
  <nav>
    <div class="logo">
      <a href="#"><img src="http://ledelacarteetlemeeple.e-monsite.com/medias/site/logos/dcmlogo-web-400px.png"
          alt="Logo de la marque"></a>
    </div>
    <div class="search-bar">
      <form action="#" method="get">
        <input type="search" name="search" placeholder="Rechercher">
        <button type="submit">Rechercher</button>
      </form>
    </div>
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/ajouter">Ajouter un jeu</router-link></li>
      <li><router-link to="/connexion">Connexion/Inscription</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li><router-link to="/panier">Panier {{ cartCount.value }}</router-link></li>
    </ul>
  </nav>
  <div class="title">
    <h1>Bienvenue chez Crazy Meeple !</h1>
  </div>
  <div class="card-container">
    <div v-for="article in articles" :key="article.id" class="card">
      <div class="card-body">
        <img :src="article.image" :alt="article.title">
        <h2>{{ article.title }}</h2>
        <p>{{ article.description }}</p>
        <button @click="addToCart(article)"><img src="https://img.icons8.com/pastel-glyph/512/shopping-cart--v2.png">
        </button>
        <span class="card-price">{{ article.price }} €</span>
      </div>
    </div>
  </div>
  <footer>
    <p>&copy; 2023 Crazy Meeple. Tous les droits sont réservés.</p>
  </footer>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'


interface Article {
  id: number;
  quantity: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface Props {
  isAdmin: boolean;
}

const store = useStore()

onMounted(async () => {
  await store.dispatch('fetchArticles')
});

const articles = computed<Article[]>(() => store.state.articles);

const cartCount = computed(() => store.state.cart.length);

function addToCart(article: Article) {
  store.commit('addToCart', article)
}


</script>


<style scoped>
.title {
  color: #fff;
}

.background {
  background-image: url("https://images6.alphacoders.com/451/451028.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

nav {
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  align-items: center;
  background: rgb(0, 0, 0);
  background: linear-gradient(77deg, rgba(0, 0, 0, 1) 6%, rgba(15, 165, 232, 1) 53%, rgb(2, 92, 226) 69%);
  padding: 10px;
  font-family: Arial, sans-serif;
}

.logo img {
  height: 50px;
}

.logo:hover {
  transform: scale(1.5);
  transition: all 0.3s ease-in-out;
}

.search-bar form {
  display: flex;
}

.search-bar input[type="search"] {
  padding: 5px;
  border: none;
  border-bottom: 5px solid #333;
  font-size: 16px;
}

.search-bar button[type="submit"] {
  padding: 5px 10px;
  background-color: #333;
  color: #f6f4f4;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

ul li a {
  display: block;
  padding: 10px;
  color: #ffffff;
  text-decoration: none;
}

ul li a:hover {
  background-color: #333;
  color: #fff;
}

.title h1 {
  display: flex;
  justify-content: center;
  font-size: xx-large;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  justify-content: center;
  margin: 300px;
  margin-top: 100px;
}

.card-container button {
  border-radius: 20px;
  height: 40px;
}

.card-container button img {
  width: 20px;
  height: 20px;
}

.card:hover {
  transform: scale(1.1);
  transition: all 0.1s ease-in-out;
}



.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  width: 250px;
  margin-bottom: 50px;
}

.card img {
  width: 100%;
  height: 210px;
  margin-bottom: 10px;
}

.card h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.card p {
  font-size: 1rem;
  margin-bottom: 10px;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 100%;
}

.card-body img {
  width: 100%;
  height: 250px;
  margin-bottom: 10px;
}

.card-body h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.card-body p {
  font-size: 1rem;
  margin-bottom: 10px;
}

.card-body button {
  background-color: #1ac21a;
  color: #f6f4f4;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  margin-top: auto;
}

.card button:hover {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  cursor: pointer;
  transition: 0.2s ease;
}

.card-price {
  position: absolute;
  bottom: -2%;
  right: -5%;
  background-color: #184bf3;
  color: #fff;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 0 0 5px 0;
}

footer {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30px;

}

footer p {
  margin: 0;
  font-size: 0.8rem;
}

/* pour les écrans de moins de 600px de largeur */
@media (max-width: 600px) {
  .card-container {
    grid-template-columns: repeat(1, 1fr);
    margin: 100px;
  }
}

/* pour les écrans de 600px à 900px de largeur */
@media (min-width: 600px) and (max-width: 900px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
    margin: 200px;
  }
}

/* pour les écrans de plus de 900px de largeur */
@media (min-width: 900px) {
  .card-container {
    grid-template-columns: repeat(4, 1fr);
    margin: 300px;
    margin-top: 100px;
  }
}
</style>