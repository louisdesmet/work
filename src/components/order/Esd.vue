<template>
    <div>
        <v-text-field v-model="reference" hint="Deze referentie wordt vermeld op je factuur." label="Referentie"></v-text-field>
        <v-select v-if="product_clone.vendor.id == 1" v-model="language" :items="languages" placeholder="Taal"></v-select>
        <v-select v-if="product_clone.vendor.id == 2" v-model="userAmount" :items="acronis_users" placeholder="Gebruikers" suffix="gebruikers"></v-select>
        <v-select v-if="product_clone.vendor.id == 5 || product_clone.vendor.id == 6" v-model="duration" :items="durations" placeholder="Duur" suffix="jaar"></v-select>
        <v-select v-if="product_clone.vendor.id == 5" v-model="userAmount" :items="bullguard_users" placeholder="Gebruikers" suffix="gebruikers"></v-select>
        <v-slider v-if="product_clone.vendor.id == 6" v-model="userAmount" color="#1976d2" label="Gebruikers" :min="min" :max="max" thumb-label="always" class="mt-4" hide-details></v-slider>
        <v-radio-group v-if="product_clone.id == 16 || product_clone.id == 17" row v-model="system">
            <v-radio label="windows" value="windows"></v-radio>
            <v-radio label="mac" value="mac"></v-radio>
        </v-radio-group>
        <v-card>
            <v-card-title class="justify-center">
                <p class="mb-0 font-weight-bold">{{ parseFloat(price).toFixed(2) }} €</p>
            </v-card-title>
        </v-card>
        <v-btn class="my-3" dark large block color="#6A9F59" @click="cart(product_clone)">Toevoegen</v-btn>
    </div>
</template>
<script>
    import { includes } from "lodash";
    export default {
        name: 'Esd',
        data () {
          return {
              reference: null,
              languages1: ['NL'],
              languages2: ['NL', 'FR'],
              bullguard_users: [1, 5, 10, 15, 20, 25, 30],
              acronis_users: [1, 3, 5],
              durations: [1, 2, 3],
              language: 'NL',
              userAmount: 1,
              duration: 1,
              system: 'windows',
              min: 1,
              max: '',
          }
        },
        props: ['product_clone'],
        computed: {
            price() {
                if(this.product_clone.vendor.id == 1) {
                    return (this.language === 'NL') ? this.product_clone.prices[0].price : this.product_clone.prices[4].price;
                } else if(this.product_clone.vendor.id == 6) {
                    if(this.system == 'windows') {
                        if(_.includes([16, 18, 19], this.product_clone.id)) {
                            this.max = 100;
                            this.min = 5;
                            let amount;
                            if (this.userAmount < 10) { amount = 5 } else
                            if (this.userAmount < 25) { amount = 10 } else
                            if (this.userAmount < 50) { amount = 25 } else
                            if (this.userAmount < 100) { amount = 50 } else
                            if (this.userAmount < 250) { amount = 100 }
                            if(this.product_clone.id === 16) {
                                return this.product_clone.prices.find(obj => obj.system == this.system && obj.duration == this.duration && obj.users == amount).price * this.userAmount;
                            } else {
                                return this.product_clone.prices.find(obj => obj.duration == this.duration && obj.users == amount).price * this.userAmount;
                            }
                        } else {
                            this.max = 10;
                            if(this.product_clone.id === 17) {
                                return this.product_clone.prices.find(obj => obj.system == this.system && obj.duration == this.duration && obj.users == this.userAmount).price;
                            } else {
                                return this.product_clone.prices.find(obj => obj.duration == this.duration && obj.users == this.userAmount).price;
                            }
                        }
                    } else if(this.system == 'mac') {
                        if(this.product_clone.id === 16) {
                            this.min = 11;
                            return this.product_clone.prices.find(obj => obj.system == this.system && obj.duration == this.duration).price * this.userAmount;
                        } else {
                            return this.product_clone.prices.find(obj => obj.system == this.system && obj.duration == this.duration && obj.users == this.userAmount).price;
                        }
                        if(this.userAmount < this.min) {
                            this.userAmount = this.min;
                        }

                    }
                } else if(this.product_clone.vendor.id == 2) {
                    return this.product_clone.prices.find(obj => obj.users == this.userAmount).price;
                } else if(this.product_clone.vendor.id == 5) {
                    return this.product_clone.prices.find(obj => obj.users == this.userAmount && obj.duration == this.duration ).price;
                }
            },
            languages() {
                return (this.product_clone.id === 5 || this.product_clone.id === 6) ? this.languages2 : this.languages1;
            },
        },
        mounted () {
        },
        methods: {
            cart(product) {
                let options = {};
                let id = this.product_clone.id;
                if(_.includes([1, 2, 3, 4, 5, 6], id)) {
                    options.language = this.language;
                } else if(_.includes([13, 14, 15, 4, 5, 6], id)) {
                    options.userAmount = this.userAmount;
                } else if(_.includes([16, 17], id)) {
                    options.userAmount = this.userAmount;
                    options.duration = this.duration;
                    options.system = this.system;
                } else if(_.includes([18, 19, 20, 21, 22, 23], id)) {
                    options.userAmount = this.userAmount;
                    options.duration = this.duration;
                }
                this.$router.push({ name: 'cart', params: {
                    product: product,
                    options: options,
                    reference: this.reference,
                    price: this.price
                }});
            },
        }
    }
</script>
<style scoped>

</style>
