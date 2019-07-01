<template>
    <v-card>
        <v-toolbar color="#E2EAEC" light>
            <v-toolbar-title>Klant aanpassen</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-btn flat @click="update">Opslaan</v-btn>
                <v-btn icon @click="close">
                    <v-icon>clear</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-container>
            <v-text-field v-model="user.first_name" :counter="25" label="First name" required></v-text-field>
            <v-text-field v-model="user.last_name" :counter="25" label="Last name" required></v-text-field>
            <v-text-field v-model="user.company" :counter="25" label="Company name" required></v-text-field>
            <v-text-field v-model="user.address" :counter="25" label="Address" required></v-text-field>
            <v-text-field v-model="user.postal_code" :counter="25" label="Postal code" required></v-text-field>
            <v-text-field v-model="user.city" :counter="25" label="City" required></v-text-field>
            <v-text-field v-model="user.country" :counter="25" label="Country" required></v-text-field>
            <v-text-field v-model="user.phonenumber" :counter="25" label="Phonenumber" required></v-text-field>
            <v-text-field v-model="user.email" label="email" required></v-text-field>
            <v-text-field v-model="user.password" label="password" required></v-text-field>
            <!--<v-text-field v-model="user.vat" label="VAT number" required></v-text-field>-->
            <v-radio-group v-if="!user.enduser" v-model="user.enduser" :mandatory="false">
                <v-radio label="Partner beheert alles van de klant. Factuur naar de partner." :value="0"></v-radio>
                <v-radio label="Eindklant beheert eigen account. Factuur naar de eindklant." :value="1"></v-radio>
            </v-radio-group>
        </v-container>
    </v-card>
</template>
<script>
  export default {
    data () {
        return {
            headuser: null
        }
    },
    created () {
      this.headuser = JSON.parse(localStorage.getItem('user'));
    },
    mounted () {

    },
    computed: {
        user() { return (this.$store.getters.enduser) ? this.$store.getters.enduser : this.headuser.user; },
    },
    methods: {
        close() {
            this.$emit('close');
        },
        update() {
            this.$api.put('/users/' + this.user.id, {
                items: this.user,
                user: this.headuser.user.id
            }, {
                headers: {
                    Authorization: 'Bearer ' + this.headuser.auth.access_token
                }
            }).then(response => {

            });
        }

    }
  }
</script>
<style scoped>

</style>
