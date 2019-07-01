<template>
  <div class="new-service">
    <v-card>
      <v-toolbar color="#E2EAEC" light>
        <v-toolbar-title>Nieuwe service</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" v-if="input" class="pt-0" hide-details @click:append-outer="untoggle" append-outer-icon="search" clearable></v-text-field>
        <v-btn v-if="icon" icon @click="toggle">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn v-if="icon" icon @click="close">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list three-line class="new-service-color">
        <v-subheader>
          <v-container pa-0 grid-list-md>
            <v-layout row wrap>
              <v-flex xs6>
                <v-select v-model="category" item-text="name" :items="categories" placeholder="Categories" clearable hide-details></v-select>
              </v-flex>
              <v-flex xs6>
                <v-select v-model="vendor" item-text="name" :items="vendors" placeholder="Vendors" clearable hide-details></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-subheader>
        <template v-for="(product, index) in products">
          <template v-if="template">
            <v-divider v-if="divider(index, product)"></v-divider>
            <v-list-tile v-if="tile(product)" :key="product.name" avatar @click="order(product)">
              <v-list-tile-avatar class="avatar-image" tile>
                <img :src="asset(product.image)">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="product.name"></v-list-tile-title>
                <v-list-tile-sub-title class="product-title" v-html="product.category.name"></v-list-tile-sub-title>
                <v-list-tile-sub-title class="product-title" v-html="product.vendor.name"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <template v-else>
            <v-list-tile :key="product.name" avatar @click="order(product)">
              <v-list-tile-avatar class="avatar-image" tile>
                <img :src="asset(product.image)">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title v-html="product.name"></v-list-tile-title>
                <v-list-tile-sub-title class="product-title" v-html="product.category.name"></v-list-tile-sub-title>
                <v-list-tile-sub-title class="product-title" v-html="product.vendor.name"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index != products.length - 1"></v-divider>
          </template>
        </template>
      </v-list>
    </v-card>
  </div>
</template>
<script>
  export default {
    name: 'Products',
    data () {
      return {
        icon: true,
        search: null,
        input: false,
        category: null,
        vendor: null,
      }
    },
    created () {
    },
    computed: {
      vendors() { return this.$store.getters.vendors; },
      categories() { return this.$store.getters.categories; },
      products() { return this.$store.getters.products; },
      template() { return !!(this.category || this.vendor || (this.search != null && this.search != '')); }
    },
    mounted () {
      if(!this.vendors) { this.$store.dispatch('vendors'); }
      if(!this.categories) { this.$store.dispatch('categories'); }
      if(!this.products) { this.$store.dispatch('products'); }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      toggle() {
        this.input = true;
        this.icon = false;
      },
      untoggle() {
        this.input = false;
        this.icon = true;
      },
      asset(image) {
        return require('@/assets/'+image);
      },
      divider(index, product) {
        return !!(index !== 0 && (this.category === product.category.name || this.vendor === product.vendor.name || (product.name.toLowerCase().indexOf(this.search) >= 0 && this.search !== '')))
      },
      tile(product) {
        return !!(this.category == product.category.name || this.vendor == product.vendor.name || (product.name.toLowerCase().indexOf(this.search) >= 0 && this.search != ''));
      },
      order(product) {
        if(product.id === 33 || product.id === 34) {
          this.$emit('new-domain');
        } else {
          this.$router.push({ name: 'order', params: { product: product }})
        }
      },
    }
  }
</script>
<style scoped>
  .new-service {
    background: #E2EAEC;
  }

  .new-service .new-service-color {
    background: #E2EAEC !important;
  }

  .new-service .product-title {
    font-size: 0.8em !important;
  }

  .new-service .avatar-image {
    margin: 0 30px 0 20px !important;
  }

  .new-service .avatar-image img {
    width: 80px !important;
    height: auto !important;
  }

</style>
