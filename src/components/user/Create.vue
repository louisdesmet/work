<template>
    <v-card>
        <v-toolbar color="#E2EAEC" light>
            <v-toolbar-title>Nieuwe klant</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat @click="create">Opslaan</v-btn>
                <v-btn icon @click="close">
                    <v-icon>clear</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-container>
            <v-text-field v-model="form.first_name" :counter="25" label="First name" required></v-text-field>
            <v-text-field v-model="form.last_name" :counter="25" label="Last name" required></v-text-field>
            <v-text-field v-model="form.company" :counter="25" label="Company name" required></v-text-field>
            <v-text-field v-model="form.address" :counter="25" label="Address" required></v-text-field>
            <v-text-field v-model="form.postal_code" :counter="25" label="Postal code" required></v-text-field>
            <v-text-field v-model="form.city" :counter="25" label="City" required></v-text-field>
            <v-text-field v-model="form.country" :counter="25" label="Country" required></v-text-field>
            <v-text-field v-model="form.phonenumber" :counter="25" label="Phonenumber" required></v-text-field>
            <v-text-field v-model="form.email" label="email" required></v-text-field>
            <v-text-field v-model="form.password" label="password" required></v-text-field>
            <!--<v-text-field v-model="form.vat" label="VAT number" required></v-text-field>-->
            <v-radio-group v-model="form.enduser" :mandatory="false">
                <v-radio label="Partner beheert alles van de klant. Factuur naar de partner." value="0"></v-radio>
                <v-radio label="Eindklant beheert eigen account. Factuur naar de eindklant." value="1"></v-radio>
            </v-radio-group>
        </v-container>
    </v-card>
</template>
<script>
  export default {
    data () {
        return {
            form: {
                first_name: '',
                last_name: '',
                company: '',
                address: '',
                postal_code: '',
                city: '',
                country: '',
                phonenumber: '',
                email: '',
                password: '',
                vat: '',
                enduser: '0',
                user: null,
            }
        }
    },
      created () {
          this.form.user = JSON.parse(localStorage.getItem('user'));
      },
    computed: {

    },
    mounted () {

    },
    methods: {
        close() {
            this.$emit('close');
        },
        create() {
            this.$api.post('/users', {
                items: this.form
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.form.user.auth.access_token
                }
            }).then(response => {
            });
        }
    }
  }
</script>
<style scoped>

</style>
