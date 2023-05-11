<template>
 <div class="background"></div>
  <div class="container">
    <div class="form-container">
      <div class="form-login">
        <form @submit.prevent="submitLoginForm">
          <div class="logo">
            <a href="#"><img src="https://greta-cfa-aquitaine.fr/uploads/coucouc.png"
                alt="Logo coucou"></a>
          </div>
          <h1 class="title">Connexion</h1>
          <label>
            Email:
            <input v-model="login.email" type="email" required>
          </label>
          <label>
            Mot de passe:
            <input v-model="login.password" type="password" required>
          </label>
          <button>Se connecter</button>
          <p v-if="loginErrorMessage" class="error-message">{{ loginErrorMessage }}</p>
        </form>
      </div>
      <div class="form-register">
        <form @submit.prevent="submitRegisterForm">
          <h1 class="title">Inscription</h1>
          <label>
            Nom:
            <input v-model="register.name" type="text" required>
          </label>
          <label>
            Email:
            <input v-model="register.email" type="email" required>
          </label>
          <label>
            Mot de passe:
            <input v-model="register.password" type="password" required>
          </label>
          <button>S'inscrire</button>
          <p v-if="registerErrorMessage" class="error-message">{{ registerErrorMessage }}</p>
        </form>
      </div>
      <router-link to="/" class="router-link">Retour à l'accueil</router-link>
    </div>
  </div>
  <footer>
    <p>&copy; 2023 Crazy Meeple. Tous les droits sont réservés.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useStore } from 'vuex'
import axios from "axios"

export default defineComponent({
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
      register: {
        name: '',
        email: '',
        password: '',
      },
      loginErrorMessage: '',
      registerErrorMessage: '', // initialisation de registerErrorMessage avec une chaîne vide
    }
  },
  methods: {
    async submitLoginForm() {
      const store = useStore() // Utilisation de useStore pour accéder à l'instance de store Vuex
      try {
        const response = await axios.post('http://localhost:3001/users/login', this.login)
        const data = response.data
        console.log(response)
        localStorage.setItem('token', data.token)
        store.commit('login', data.user) // Utilisation de store.commit pour mettre à jour l'état dans le store Vuex
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.loginErrorMessage = "L'email et/ou le mot de passe sont incorrects."
      }
    },
    
    async submitRegisterForm() {
      const store = useStore() // Utilisation de useStore pour accéder à l'instance de store Vuex
      try {
        const response = await axios.post('http://localhost:3001/users/signup', this.register)
        const data = response.data
        localStorage.setItem('token', data.token)
        store.commit('login', data.user) // Utilisation de store.commit pour mettre à jour l'état dans le store Vuex
        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.registerErrorMessage = "Une erreur est survenue lors de l'inscription."
      }
    },
  },
})
</script>

<style scoped>
.background {
  background-image: url("https://www.francebleu.fr/s3/cruiser-production/2020/03/aff28855-042d-48c7-8cee-e1d33b1642ef/1200x680_gettyimages-629361705.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.form-container {
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
  padding-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  text-align: center; 
}

.form-login,
.form-register {
  width: 100%;
}

.logo img {
  height: 200px;
}

label {
  margin: 10px;
  font-size: 16px;
  color: #020202;
}

input[type="email"],
input[type="password"],
input[type="text"] {
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

h1.title {
  text-align: center;
  font-size: 30px;
  margin: 20px;
  color: #000000;
}

form {
  border: none;
  width: 100%;
}

.error-message {
  color: red;
  font-size: 16px;
  margin-top: 10px;
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

.home-link {
  text-align: center; 
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