<template>
  <div class="background"></div>
  <div>
    <form @submit.prevent="submitForm">
      <div class="logo">
        <a href="#"><img src="http://ledelacarteetlemeeple.e-monsite.com/medias/site/logos/dcmlogo-web-400px.png"
            alt="Logo de la marque"></a>
      </div>
      <h1 class="title">Ajouter un nouveau Jeu</h1>
      <label>
        Titre:
        <input v-model.trim="article.title" type="text" required>
      </label>
      <label>
        Description:
        <textarea v-model.trim="article.description" required></textarea>
      </label>
      <label>
        Prix:
        <input v-model.number="article.price" type="number" required min="0" step="0.01">
      </label>
      <label>
        Image:
        <input v-model.trim="article.image" type="text" required>
      </label>
      <button type="submit">Ajouter</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <router-link to="/" class="router-link">Retour à l'accueil</router-link>
    </form>
  </div>
  <footer>
    <p>&copy; 2023 Crazy Meeple. Tous les droits sont réservés.</p>
  </footer>
</template>

<script lang="ts">
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { ref } from "vue"

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const article = ref({
      title: "",
      description: "",
      price: 0,
      image: "",
    });

    const successMessage = ref("");
    const errorMessage = ref("");

    function addArticleToShop() {
      store.dispatch("addArticle", article.value);
      successMessage.value = "L'article a été ajouté avec succès.";
    }

    function submitForm() {
      if (
        !article.value.title ||
        !article.value.description ||
        article.value.price <= 0 ||
        !article.value.image
      ) {
        errorMessage.value = "Veuillez remplir tous les champs.";
      } else {
        addArticleToShop();
        article.value = {
          title: "",
          description: "",
          price: 0,
          image: "",
        };
        errorMessage.value = "";
      }
    }

    function goAccueil() {
      router.push("/");
    }

    return {
      article,
      submitForm,
      goAccueil,
      successMessage,
      errorMessage,
    };
  },
};

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

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
}

.logo img {
  height: 200px;
}

label {

  margin: 10px;
  font-size: 16px;
  color: #020202;
}


input[type="text"],
textarea,
input[type="number"] {

  border: 2px solid #000000;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  margin: 10px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover,
button:focus {
  background-color: #3e8e41;
}

h1 {
  text-align: center;
  font-size: 30px;
  margin: 20px;
  color: #000000;
}

form {
  border: none;
  width: 100%;

}

.router-link {
  color: #000000;
  font-size: 20px;
  text-decoration: none;
  margin-top: 10px;
}

.router-link:hover {
  text-decoration: underline;
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
</style>