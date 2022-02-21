
import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {
      item: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false

  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    addToCart(state,item) {
      const exists =state.cart.items.filter(item => item.product.id === item.product.id)
      if (exists.lenght){
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity)

      } else {
        state.cart.item.push(item)
      }

      localStorage.setItem('cart', JSON.stringify(state.cart))

    },

    setIsLoading(state, status) {
      state.isLoading = status 
    },
    
    setToken(state, token) {
      state.token = token 
      state.isAuthenticated = true

    },

    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    }, 
     clearCart(state) {
       state.cart = {items: []}
       localStorage.setItem('cart', JSON.stringify(state.cart))
     }

  },
  actions: {

  },
  modules: {
  }
})

