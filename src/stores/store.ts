import { createStore, type ActionContext } from 'vuex';
import axios from 'axios';

interface Article {
  id: number;
  quantity: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface State {
  articles: Article[];
  cart: Article[];
}

const store = createStore<State>({
  state: {
    articles: [],
    cart: [],
  },
  mutations: {
    addArticle: (state, article: Article) => {
      article.quantity = 1;
      article.id = state.articles.length + 1;
      const articles = [...state.articles, article];
      state.articles = articles;
    },

    setArticles: (state, articles: Article[]) => {
      state.articles = articles
    },
    addToCart: (state, article: Article) => {
      const index = state.cart.findIndex((item) => item.id === article.id);
      if (index === -1) {
        const newArticle = Object.assign({}, article, { quantity: 1 });
        newArticle.id = state.cart.length + 1;
        state.cart.push(newArticle);
      } else {
        const newArticle = Object.assign({}, state.cart[index]);
        newArticle.quantity += 1;
        state.cart.splice(index, 1, newArticle);
      }
    },


    deleteFromCart(state, article) {
      const index = state.cart.findIndex((a) => a.id === article.id);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    }
  },

  actions: {
    async addArticle({ commit, state }: ActionContext<State, State>, article: Article) {
      
      await axios.post("http://localhost:3001/v1/articles", article)

    },
    addToCart: ({ commit }, article: Article) => {
      commit('addToCart', article);
    },

    deleteFromCart: ({ commit }, article: Article) => {
      commit('deleteFromCart', article);
    },

    async fetchArticles({ commit }) {
      try {
        const response = await axios.get('http://localhost:3001/v1/articles');
        const articles = response.data;
        commit('setArticles', articles);
      } catch (error) {
        console.error(error);
      }
    },
  }
});

export default store;