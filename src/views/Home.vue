<template>
  <v-layout row wrap fill-height>
    <Nav @create="newCreate"/>
    <v-flex sm8 md9 lg10>
      <Services v-if="services" @edit="newEdit" @new-service="newService" @new-domain="newDomain" @office-details="officeDetails"/>
      <Products v-show="products" @close="close" @new-domain="newDomain"/>
      <Domains v-if="domains" @close="close"/>
      <Create v-if="create" @close="close"/>
      <Edit v-if="edit" @close="close"/>
      <Office365 v-if="office && service !== null" @close="close" :service="service"/>
    </v-flex>
  </v-layout>
</template>
<script>
  import Nav from '@/components/user/Nav';
  import Services from '@/components/user/Services';
  import Create from '@/components/user/Create';
  import Edit from '@/components/user/Edit';
  import Products from '@/components/Products';
  import Domains from '@/components/Domains';
  import Office365 from "../components/details/Office365";
  export default {
    name: 'Home',
    data () {
      return {
        services: true,
        products: false,
        domains: false,
        create: false,
        edit: false,
        office: false,
        service: null,
      }
    },
    components: {
      Office365,
      Nav,
      Services,
      Create,
      Edit,
      Products,
      Domains
    },
    created () {
    },
    computed: {

    },
    mounted () {

    },
    methods: {
      newService() {
        this.falseIt();
        this.products = true;
      },
      newDomain() {
        this.falseIt();
        this.domains = true;
      },
      newCreate() {
        this.falseIt();
        this.create = true;
      },
      newEdit() {
        this.falseIt();
        this.edit = true;
      },
      officeDetails(service) {
        this.service = service;
        this.falseIt();
        this.office = true;
      },
      close() {
        this.falseIt();
        this.services = true;
      },
      falseIt() {
        this.products = false;
        this.services = false;
        this.domains = false;
        this.create = false;
        this.edit = false;
        this.office = false;
      }
    }
  }
</script>
<style scoped>

</style>
