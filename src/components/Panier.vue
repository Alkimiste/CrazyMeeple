<template>
  <div>
    <div class="background"></div>
    <nav>
      <div class="logo">
        <a href="#"><img src="http://ledelacarteetlemeeple.e-monsite.com/medias/site/logos/dcmlogo-web-400px.png"
            alt="Logo de la marque"></a>
      </div>
      <div class="search-bar">
        <form action="#" method="get">
          <input type="search" name="search" placeholder="Rechercher">
          <button type="submit"><i class="fa fa-search"></i></button>
        </form>
      </div>
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/ajouter">Ajouter un jeux</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>
    <div class="title">
      <h1>Votre Panier</h1>
    </div>
    <div class="card-container">
      <div v-if="cart.length === 0">
        <h2>Votre panier est vide!</h2>
      </div>
      <div v-else>
        <div v-for="(article, index) in cart" class="card" :key="index">
          <img :src="article.image" alt="Card image">
          <div class="card-content">
            <h2 class="card-title">{{ article.title }}</h2>
            <p class="card-description">{{ article.description }}</p>
            <div class="card-quantity">
              <label for="quantity">Quantité : </label>
              <input type="number" name="quantity" v-model="article.quantity" min="1" max="10">
            </div>
            <div class="card-actions">
              <button @click="deleteFromCart(article)"><img src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/512/external-recycle-bin-graph-design-kiranshastry-solid-kiranshastry.png"></button>
              <span class="card-price">{{ article.price }} €</span>
            </div>
          </div>
        </div>
        <div class="payment-card">
          <div class="total-price">
            <p>Total : {{ totalPrice.toFixed(2) }} €</p>
          </div>
          <button @click="pay">Payer</button>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <p>&copy; 2023 Crazy Meeple. Tous les droits sont réservés.</p>
  </footer>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const cart = computed(() => store.state.cart);

function deleteFromCart(article: any) {
  const index = store.state.cart.findIndex((a: any) => a === article);
  if (index > -1) {
    store.commit("deleteFromCart", article);
  }
}

const totalPrice = computed(() =>
  store.state.cart.reduce(
    (accumulator: number, article: { price: number; quantity: number }) =>
      accumulator + article.price * article.quantity,
    0
  )
);

function pay() {
  alert("Payment successful!");
}
</script>
  
<style scoped>
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
  align-items: center;
  background: rgb(0, 0, 0);
  background: linear-gradient(77deg,
      rgba(0, 0, 0, 1) 6%,
      rgba(15, 165, 232, 1) 53%,
      rgb(2, 92, 226) 69%);
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

.title h1,
h2 {
  display: flex;
  justify-content: center;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: #fff;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  gap: 20px;
}

.card-actions button {
  border-radius: 10px;
  height: 40px;
}

.card-actions button img {
  width: 20px;
  height: 20px;
}

.card {
  margin: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.card img {
  display: flex;
  justify-content: center;
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.card-content {
  display: flex;
  justify-content: space-around;
  padding: 10px;
  gap: 10px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  padding: 0;
}

.card-price {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
}

.card-description {
  margin-top: 10px;
  font-size: 20px;
  line-height: 1.4;
}

.card-actions button {
  background-color: rgb(192, 20, 20);
}

.card-actions button:hover {
  background-color: rgb(255, 0, 0);
}

.payment-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;
}

.payment-card button {
  background-color: #333;
  color: #f6f4f4;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  margin-top: 10px;
}

.payment-card p {
  font-size: 18px;
  margin: 0;
  padding: 0;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(30px);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

.pay-button:hover {
  background-color: #0069d9;
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

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 500px) {
  .search-bar {
    display: none;
  }
}
</style>