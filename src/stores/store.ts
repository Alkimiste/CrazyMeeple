import { createStore, type ActionContext } from 'vuex'
import axios from 'axios'

interface Article {
  id: number
  quantity: number
  title: string
  description: string
  price: number
  image: string
}

interface User {
  email: string
  password: string
  role: string // Add a new property for user role
}

interface State {
  articles: Article[]
  cart: Article[]
  isLoggedIn: boolean
  user: User | null
}

const store = createStore<State>({
  state: {
    articles: [],
    cart: [],
    isLoggedIn: false, // Add a new property for login status
    user: null,
  },
  mutations: {
    addArticle: (state, article: Article) => {
      article.quantity = 1
      article.id = state.articles.length + 1;
      const articles = [...state.articles, article]
      state.articles = articles;
    },

    setArticles: (state, articles: Article[]) => {
      state.articles = articles
    },

    addToCart: (state, article: Article) => {
      const index = state.cart.findIndex((item) => item.id === article.id)
      if (index === -1) {
        const newArticle = Object.assign({}, article, { quantity: 1 })
        newArticle.id = state.cart.length + 1;
        state.cart.push(newArticle)
      } else {
        const newArticle = Object.assign({}, state.cart[index])
        newArticle.quantity += 1
        state.cart.splice(index, 1, newArticle)
      }
    },

    deleteFromCart(state, article) {
      const index = state.cart.findIndex((a) => a.id === article.id)
      if (index !== -1) {
        state.cart.splice(index, 1)
      }
    },

    login(state, user) {
      state.isLoggedIn = true
      state.user = {...user, role: 'user'} // Add the 'role' property and set its value to 'user'
    },

    logout(state) {
      state.isLoggedIn = false
      state.user = null
    },
  },

  actions: {
    async addArticle({ commit, state }: ActionContext<State, State>, article: Article) {
      await axios.post("http://localhost:3001/articles", article)
    },

    addToCart: ({ commit }, article: Article) => {
      commit('addToCart', article)
    },

    deleteFromCart: ({ commit }, article: Article) => {
      commit('deleteFromCart', article)
    },

    async fetchArticles({ commit }) {
      try {
        const response = await axios.get('http://localhost:3001/articles')
        const articles = response.data
        commit('setArticles', articles)
      } catch (error) {
        console.error(error)
      }
    },

    async login({ commit }, user: User) {
      try {
        const response = await axios.post('http://localhost:3001/login', user)
        const data = response.data
        commit('login', data.user)
        localStorage.setItem('token', data.token)
      } catch (error) {
        console.error(error)
      }
    },

    logout({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
    },
  }
});

export default store   