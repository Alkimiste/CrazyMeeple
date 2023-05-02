<template>
    <div class="contact">
        <h1>Contactez-nous</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Nom</label>
                <input type="text" id="name" v-model="name" required>
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="message" required></textarea>
            </div>
            <button type="submit">Envoyer</button>
        </form>
        <br>
        <RouterLink to="/" class="router-link">Retour à l'accueil</RouterLink>
    </div>
    <footer>
        <p>&copy; 2023 Crazy Meeple. Tous les droits sont réservés.</p>
    </footer>
</template>
  
<script lang="ts">
import axios from 'axios';


export default {
    name: 'Contact',
    data() {
        return {
            name: '',
            email: '',
            message: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                console.log('Formulaire soumis avec succès');
                await axios.post('http://localhost:3001/contact', {
                    name: this.name,
                    email: this.email,
                    message: this.message
                });
                this.name = '';
                this.email = '';
                this.message = '';
            } catch (error) {
                console.error(error);
            }
        },
    },
}


</script>
<style>
.contact {
    max-width: 600px;
    margin: 0 auto;
}

h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
textarea {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
}

button[type="submit"] {
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
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