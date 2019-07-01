<template>
  <div>
    <v-layout row>
      <v-flex xs4 pa-4>
        <v-card class="pa-4">
          <h4>Nieuwe domeinnaam</h4>
          <v-text-field v-model="domain" prefix="www." suffix="." class="domain" placeholder="domain"></v-text-field>
          <v-autocomplete
                  v-model="ext"
                  :items="exts"
                  clearable
                  item-text="name"
                  label="extension"
                  class="ext"
          >
          </v-autocomplete>
          <v-btn block>Controleer Beschikbaarheid</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs4 pa-4>
        <v-card class="pa-4">
          <h4>Domeinnaam verhuizen</h4>
          <v-text-field v-model="domain" prefix="www." suffix="." class="domain" placeholder="domain"></v-text-field>
          <v-autocomplete
                  v-model="ext"
                  :items="exts"
                  clearable
                  item-text="name"
                  label="extension"
                  class="ext"
          >
          </v-autocomplete>
          <v-btn block>Controleer Beschikbaarheid</v-btn>
        </v-card>
      </v-flex>
      <v-flex xs4 pa-4>
        <v-card class="pa-4">
          <h4>Bestaand domein</h4>
          <v-text-field v-model="domain" prefix="www." suffix="." class="domain" placeholder="domain"></v-text-field>
          <v-text-field v-model="ext" class="ext" placeholder="extension"></v-text-field>
          <v-btn block>Verder gaan</v-btn>
        </v-card>
      </v-flex>
    </v-layout>
    <v-radio-group row v-model="billing" class="justify-center">
      <v-radio label="Maandelijks" :value="1"></v-radio>
      <v-radio label="Jaarlijks" :value="0"></v-radio>
    </v-radio-group>
    <v-flex mt-5>
      <v-card>
        <v-card-title primary-title>
          <v-layout row wrap>
            <v-flex xs5>
              <p>{{ (billing === 1) ? 'Monthly' : 'Yearly' }}</p>
              <p>BTW/TVA @ 21%</p>
            </v-flex>
            <v-flex xs1>
              <p class="font-weight-bold">{{ price }} €</p>
              <p class="font-weight-bold">{{ btw }} €</p>
            </v-flex>
            <v-flex xs5>
              <p class="font-weight-bold subheading">Totaal</p>
            </v-flex>
            <v-flex xs1>
              <p class="font-weight-bold subheading text-xs-right">{{ price + btw }} €</p>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
      <v-btn @click="cart" block>Toevoegen</v-btn>
    </v-flex>
  </div>
</template>
<script>
  export default {
    name: 'WebHosting',
    data () {
      return {
        exts: [
          { id: 1, name: 'be' },
          { id: 2, name: 'nl' },
          { id: 3, name: 'eu' },
          { id: 4, name: 'brussels' },
          { id: 5, name: 'gent' },
          { id: 6, name: 'vlaanderen' },
          { id: 7, name: 'com' },
          { id: 8, name: 'net' },
          { id: 9, name: 'org' },
          { id: 10, name: 'info' },
          { id: 11, name: 'biz' },
          { id: 12, name: 'fr' },
          { id: 13, name: 'es' },
          { id: 14, name: 'it' },
          { id: 15, name: 'de' },
          { id: 16, name: 'gr' },
          { id: 17, name: 'ch' },
          { id: 18, name: 'pt' },
          { id: 19, name: 'com.tr' },
          { id: 20, name: 'tr' },
          { id: 21, name: 'lu' },
          { id: 22, name: 'at' },
          { id: 23, name: 'no' },
          { id: 24, name: 'fi' },
          { id: 25, name: 'pl' },
          { id: 26, name: 'com.pl' },
          { id: 27, name: 'dk' },
          { id: 28, name: 'nu' },
          { id: 29, name: 'mobi' },
          { id: 30, name: 'tel' },
          { id: 31, name: 'com.al' },
          { id: 32, name: 'ad' },
          { id: 33, name: 'by' },
          { id: 34, name: 'ba' },
          { id: 35, name: 'bg' },
          { id: 36, name: 'com.cy' },
          { id: 37, name: 'ee' },
          { id: 38, name: 'co.ee' },
          { id: 39, name: 'fo' },
          { id: 40, name: 'gi' },
          { id: 41, name: 'com.gr' },
          { id: 42, name: 'hu' },
          { id: 43, name: 'co.hu' },
          { id: 44, name: 'ie' },
          { id: 45, name: 'je' },
          { id: 46, name: 'hr' },
          { id: 47, name: 'lv' },
          { id: 48, name: 'li' },
          { id: 49, name: 'lt' },
          { id: 50, name: 'cz' },
          { id: 51, name: 'co' },
          { id: 52, name: 'xxx' },
          { id: 53, name: 'asia' },
          { id: 54, name: 'jobs' },
          { id: 55, name: 'name' },
          { id: 56, name: 'pro' },
          { id: 57, name: 'travel' },
          { id: 58, name: 'me' },
          { id: 59, name: 'co.uk' },
          { id: 60, name: 'uk' },
          { id: 61, name: 'sx' },
          { id: 62, name: 'us' },
          { id: 63, name: 'test' },
          { id: 64, name: 'pw' },
          { id: 65, name: 'fm	,' },
          { id: 66, name: 'si' },
          { id: 67, name: 'sk' },
          { id: 68, name: 'se' },
          { id: 69, name: 'agency' },
          { id: 70, name: 'immo' },
          { id: 71, name: 'beer' },
          { id: 72, name: 'solutions' },
          { id: 73, name: 'now' },
          { id: 74, name: 'today' },
          { id: 75, name: 'energy' },
          { id: 76, name: 'events' },
          { id: 77, name: 'club' },
          { id: 78, name: 'promo' },
          { id: 79, name: 'gs' },
          { id: 80, name: 'online' },
          { id: 81, name: 'shop'	 },
          { id: 82, name: 'expert' },
          { id: 83, name: 'coach' },
          { id: 84, name: 'academy' },
          { id: 85, name: 'cat' },
          { id: 86, name: 'amsterdam' },
          { id: 87, name: 'rs' },
        ],
        ext: null,
        domain: null,
        billing: 1
      }
    },
    props: ['product_clone'],
    computed: {
      price() {
        return parseFloat((this.billing === 1) ? this.product_clone.prices[0].price : this.product_clone.prices[4].price);
      },
      btw() {
        return parseFloat((this.billing === 1) ? this.product_clone.prices[0].price * 0.21 : this.product_clone.prices[4].price * 0.21);
      }
    },
    mounted () {

    },
    methods: {
      cart() {
        this.$router.push({ name: 'cart', params: {
            product: this.product_clone
        }});
      },
    }
  }
</script>
<style scoped>
  .domain, .ext {
    display: inline-block;
    width:50%;
  }
</style>
