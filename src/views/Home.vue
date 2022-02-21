
<template>
  <div class="home">
      <section class="hero is-medium is-primary mb-6 "> 
          <div class="hero-body has-text-centered">
              <p class="title mb-6">
                Welcome
              </p>

              <p>
                Jacket Store Online
              </p>
          </div>  
      </section> 

      <div class="columns is-multiline">
        <div class="column is-12">
          <h2 class="is-size-2 has-text-centered"> 
            Latest products
          </h2>
        </div>

        <div class="column is-3"
        v-for=" product in latestProducts"
        v-bind:key="product.id"
        >

          <div class="box">

            <figure class="image mb-4">
              <img v-bind:src="product.get_thumbnail">
            </figure>
            <p class="is-size-4"> {{product.name}} </p>

              <router-link v-bind:to= "product.get_absolute_url" class="button  is-dark mt-4" >
                View more details
              </router-link>

          </div>

        </div>
      </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data(){
    return {
      latestProducts:[],
    }
  },
  mounted(){
    this.getLatestProducts()
    document.title = 'Home | Djackets'
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)
    
      try {
        let response = await axios.get('/api/v1/latest-products')
         this.latestProducts = response.data
         console.log("RESPONSE DATA",response.data)
        
      } catch (error) {
        console.log(error)
        
      }

      this.$store.commit('setIsLoading', false)        
    }
  }

};

</script>