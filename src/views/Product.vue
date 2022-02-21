<template>
    <div class="page-product">
        <div class="columns is-multiline">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_thumbnail">
                </figure>

                <h1 class="title"> {{product.name}} </h1>
                <hr>
            
                <u>Product Composition </u> 
                <details>
                    {{product.description }}
                </details>
                
            </div>

            <div class="column is-3"> 
                <h2 class="subtitle"> <strong> <u> Product Information </u> </strong></h2>
                
                <p><strong>Price:</strong> € {{product.price}}</p>
                <div class="field has-addons mt-6">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model="quantity">
                    </div>
                    <div class="control">
                        <a class="button is-link" @click="addToCart()">Add to Cart</a>
                    </div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import axios from 'axios'
    import { toast } from 'bulma-toast'


    export default {
        name: 'Product',
        data() {
            return {
                product: {},
                quantity: 1
            }
        },
        mounted() {
            this.getProducts()
        },
        methods: {
            async getProducts(){
                this.$store.commit('setIsLoading', true)

                const category_slug = this.$route.params.category_slug
                const product_slug = this.$route.params.product_slug

                try {
                    
                    let response = await axios.get((`/api/v1/products/${category_slug}/${product_slug}`))
                     this.product = response.data

                } catch (error) {
                    console.log(error)
                }

                 this.$store.commit('setIsLoading', false)
            },
        
            addToCart() {
                if (isNaN(this.quantity)|| this.quantity < 1){
                    this.quatity = 1
                }

                const item = {
                    product: this.product,
                    quantity: this.quantity

                }
                
                this.$store.commit('addToCart', item)

                toast({
                    massage: 'Product was add',
                    type: 'is-success',
                    dismissible: true,
                    pauseOnHover: true,
                    duration: 2000,
                    position: 'bottom-right'
                })

            } 

        }

    }
</script>
