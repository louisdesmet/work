<template>
    <div>
        <v-select v-model="type" :items="servers" label="Server type"></v-select>
        <v-select v-model="prefix" :items="prefixes" label="Email voorvoegsel"></v-select>
        <v-text-field v-model="email" :counter="25" label="Email" required :prefix="prefix"></v-text-field>
        <v-textarea class="my-3" outline label="CSR" hide-details></v-textarea>
        <v-btn class="mb-5" block>Valideer CSR</v-btn>
        <v-expansion-panel>
            <v-expansion-panel-content>
                <template v-slot:header>
                    <div>Genereer CSR</div>
                </template>
                <v-card>
                    <v-card-text>
                        <v-text-field label="Domeinnaam" required></v-text-field>
                        <v-text-field label="Bedrijfsnaam" required></v-text-field>
                        <v-text-field label="Bedrijfsafdeling" required></v-text-field>
                        <v-text-field label="Stad" required></v-text-field>
                        <v-text-field label="Provincie" required></v-text-field>
                        <v-text-field label="Land" required></v-text-field>
                        <v-text-field label="Email" required></v-text-field>
                        <v-select :items="lengths" label="Root length"></v-select>
                        <v-select :items="algorithms" label="Algoritme"></v-select>
                        <v-btn @click="ssl" block>Genereer CSR</v-btn>
                    </v-card-text>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-select :items="users" label="User" item-text="name" class="mt-4"></v-select>
    </div>
</template>
<script>
    // import axios from 'axios';
    // axios.defaults.baseURL = 'https://sandbox-wbapi.thesslstore.com/rest/ssltools';
    // axios.defaults.headers.common['Accept'] = 'application/json';
    export default {
    name: 'Ssl',
    data () {
      return {
          servers: [
              'Apache2',
              'IIS',
              'IIS5'
          ],
          prefixes: [
              'hostmaster@',
              'webmaster@',
              'postmaster@',
              'admin@',
              'administrator@'
          ],
          prefix: '',
          lengths: ['2048', '4096'],
          algorithms: ['SHA-1', 'SHA-2'],
          email: '',
          type: null,
      }
    },
    props: ['product_clone'],
    computed: {
        users() { return this.$store.getters.users; },
    },
    mounted () {
        this.$store.dispatch('user');
        if(!this.users) { this.$store.dispatch('users'); }
    },
    methods: {
        ssl() {


            // axios.post('/csrgenerator', {
            //     AuthRequest:{
            //         PartnerCode: "83009874",
            //         AuthToken:"CA480DE6C2AB8B5A954E726C0BB0EDEC",
            //         ReplayToken:"",
            //         UserAgent:"SSLTools-SDK-UI",
            //         TokenID:"",
            //         TokenCode:"",
            //         IPAddress:"",
            //         IsUsedForTokenSystem:false,
            //         Token:""
            //     },
            //     CommonName:"jhgfjhgfjhgfjfh",
            //     OrganizationName:"jfhjhgfjhgfjhfjhf",
            //     OrganizationUnit:"jhgfjhgfjhgfjhf",
            //     Locality:"jhgfjhfjhf",
            //     State:"hfghfdhfhd",
            //     Country:"gfjhgfjgfjghf",
            //     Email:"louis@nomeo.be",
            //     KeySize:"2048",
            //     SignatureAlgorithm:"SHA-2"
            // })


        }
    }
    }
</script>
<style scoped>

</style>
