<template>
    <v-flex sm4 md3 lg2 class="client-nav">
        <div class="client-nav-container">
            <div class="selected-client">
                <p>Geselecteerde klant</p>
                <p>{{ (enduser) ? enduser.name : user.user.name}}</p>
            </div>
            <div class="new-client" @click="create">
                <v-btn color="#6A9F59" dark small fab>
                    <v-icon>add</v-icon>
                </v-btn>
                <span>Nieuwe klant</span>
            </div>
            <v-text-field v-model="search" class="search" light solo append-icon="search" placeholder="Zoeken..." hide-details clearable></v-text-field>
            <v-card class="mt-3">
                <v-list two-line dark dense class="pa-0">
                    <template v-for="(item, index) in users">
                        <div v-if="search === null"  class="mb-1">
                            <v-list-tile :key="item.id" avatar @click="showUser(item)" class="client">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <p>{{ item.name }}<span style="text-align: right">{{ item.id }}</span></p>
                                    </v-list-tile-title>
                                    <p v-if="item.company !== ''">{{ item.company }}</p>
                                </v-list-tile-content>
                            </v-list-tile>
                        </div>
                        <div v-if="search !== null">
                            <v-list-tile :key="item.id" avatar v-if="isIn(item.name)" @click="showUser(item)" class="client">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        <p>{{ item.name }}</p>
                                    </v-list-tile-title>
                                    <p v-if="item.company !== ''">{{ item.company }}</p>
                                </v-list-tile-content>
                            </v-list-tile>
                        </div>
                    </template>
                </v-list>
            </v-card>
        </div>
    </v-flex >
</template>
<script>
  export default {
    data () {
        return {
            user: null,
            search: null
        }
    },
    created () {
        this.user = JSON.parse(localStorage.getItem('user'));
    },
    computed: {
        users() { return this.$store.getters.users; },
        enduser() { return this.$store.getters.enduser; },
    },
    mounted () {
        this.$store.dispatch('user');
        if(!this.users) { this.$store.dispatch('users'); }
    },
    methods: {
        create() {
            this.$emit('create');
        },
        showUser(item) {
            this.$store.dispatch('showUser', { user: item });
            this.$store.dispatch('userDomains');
            this.$store.dispatch('userProducts');
        },
        isIn(item) {
            return item.toLowerCase().indexOf(this.search) >= 0;
        }
    }
  }
</script>
<style scoped>
    .client-nav {
        background: #313131;
        padding: 10px 0 0 0;

    }
    .client-nav-container {
        padding: 0 10px;
    }
    .client-nav .selected-client {
        background: #4B4B4B;
        margin: 0 0 10px 0;
    }
    .client-nav .selected-client p {
        color: white;
        text-align: center;
        font-size: 0.8em;
        padding: 10px 0;
        margin: 0;
    }
    .client-nav .new-client {
        border-top: 1px solid grey;
        border-bottom: 1px solid grey;
        text-decoration: none;
        display: block;
        color: white;
        padding: 0;
        font-size: 0.9em;
        margin: 0 0 5px 0;
    }
    .client-nav .search {
        margin: 9px 0 0 0 !important;
    }

    .client {
        border-bottom: 1px solid #808080;
    }
</style>
