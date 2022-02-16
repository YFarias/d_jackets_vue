<script setup>
import axios from 'axios'
import {ref, onMounted, watch, watchEffect} from 'vue'


const latestProducts = ref([])

const getAll =  async ()=>{
  try {
    let response = await axios.get('/api/v1/latest-products')
      latestProducts.value = response.data
    
  } catch (error) {
    console.log(error)
    
  }
          
}

watchEffect(getAll)

</script>

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
            <h3 class="is-size-4"> {{product.name}} </h3>

            view details
          </div>

        </div>
      </div>
  </div>

</template>

<style>

</style>