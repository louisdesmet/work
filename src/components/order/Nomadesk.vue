<template>
    <div>
        <p class="mt-5">Nomadesk is de ideale manier om bestanden te bewaren in de cloud. Uw bestanden zijn veilig bewaard in de Nomadesk Cloud, maar kunnen lokaal gesynchroniseerd worden op al uw apparaten, zodat u probleemloos kan werken in de bekende Windows Verkenner omgeving.</p>
        <v-radio-group row v-model="billing">
            <v-radio label="Maandelijks" value="maandelijks"></v-radio>
            <v-radio label="Jaarlijks" value="jaarlijks"></v-radio>
        </v-radio-group>
        <v-text-field type="number" min="0" v-model="userAmount" label="Aantal"></v-text-field>
        <v-layout row>
            <v-flex xs8>
                <v-text-field v-model="email" label="Email"></v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn outline block class="ma-0 mt-2" color="#3083A7">Controleer beschikbaarheid</v-btn>
            </v-flex>
        </v-layout>
        <v-card>
            <v-card-title class="justify-center">
                <p class="mb-0 font-weight-bold">{{ parseFloat(price).toFixed(2) }} €</p>
            </v-card-title>
        </v-card>
        <v-btn class="my-3" dark large block color="#6A9F59" @click="cart(product_clone)">Toevoegen</v-btn>
    </div>
</template>
<script>
    export default {
        name: 'Nomadesk',
        data () {
          return {
              billing: 'maandelijks',
              userAmount: 1,
              email: null
          }
        },
        props: ['product_clone'],
        computed: {
            price() {
                if(this.billing === 'maandelijks') {
                    return this.product_clone.prices[0].price * this.userAmount;
                } else {
                    return (this.product_clone.prices[0].price * 12) * this.userAmount;
                }

            },

        },
        mounted () {
        },
        methods: {
            cart(product) {
                let options = {};
                options.userAmount = this.userAmount;
                options.billing = this.billing;
                options.email = this.email;
                this.$router.push({ name: 'cart', params: {
                        product: product,
                        options: options,
                        price: this.price
                    }});
            },
        }
    }
</script>
<style scoped>

</style>
