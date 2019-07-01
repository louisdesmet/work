<template>
    <div class="client-details">
        <v-card>
            <v-toolbar color="#FAFAFA" light>
                <v-toolbar-title>{{ (enduser) ? enduser.name : user.user.name}}<v-icon class="ml-3" light @click="edit">edit</v-icon></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-speed-dial fixed right bottom v-model="fab" direction="left">
                    <v-btn slot="activator" v-model="fab" color="blue darken-2" dark fab small class="top5">
                        <v-icon>account_circle</v-icon>
                        <v-icon>close</v-icon>
                    </v-btn>
                    <!--<v-btn fab dark small color="#6A9F59" to="/users" class="top5">
                        <v-icon>people</v-icon>
                    </v-btn>
                    <v-btn fab dark small color="#3083A7" to="/admin" class="top5">
                        <v-icon>build</v-icon>
                    </v-btn>-->
                    <v-btn fab dark small color="red" @click.prevent="logout" class="top5">
                        <v-icon>exit_to_app</v-icon>
                    </v-btn>
                </v-speed-dial>
            </v-toolbar>
            <v-list>
                <v-subheader >
                    Services van deze klant
                    <v-btn color="#6A9F59" dark small absolute right fab @click="newService">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-subheader>
                <v-expansion-panel>
                    <v-expansion-panel-content v-for="(service, index) in userProducts" :key="index">
                        <div class="product-header" slot="header">
                            <div><img :src="asset(service.product.image)"></div>
                            <p>{{ service.product.name }}</p>
                            <div v-if="isOffice(service.product.id)"><v-icon @click.stop="details(service)">create</v-icon></div>
                        </div>
                        <v-card>
                            <v-card-text>
                                <v-card class="pl-2">
                                    <v-layout row wrap>
                                        <v-flex xs6 class="mt-3">
                                            <p>Status</p>
                                            <p>Date</p>
                                            <p v-if="service.reference">Reference</p>
                                            <p v-if="service.billing">Billing</p>
                                            <p v-if="service.amount">Amount</p>
                                            <p v-if="service.duration">Duration</p>
                                            <p v-if="service.email">Admin email</p>
                                            <template v-if="service.product_key">
                                                <p>Product Key</p>
                                                <p v-if="service.product_key.language">Language</p>
                                                <p v-if="service.product_key.duration">Duration</p>
                                                <p v-if="service.product_key.users">Amount of users</p>
                                            </template>
                                        </v-flex>
                                        <v-flex xs6  class="mt-3">
                                            <p>{{ service.status }}</p>
                                            <p>{{ service.date }}</p>
                                            <p v-if="service.reference">{{ service.reference }}</p>
                                            <p v-if="service.billing">{{ service.billing }}</p>
                                            <p v-if="service.amount">{{ service.amount }}</p>
                                            <p v-if="service.duration">{{ service.duration }}</p>
                                            <p v-if="service.email">{{ service.email }}</p>
                                            <template v-if="service.product_key">
                                                <p>{{ service.product_key.key }}</p>
                                                <p v-if="service.product_key.language">{{ service.product_key.language }}</p>
                                                <p v-if="service.product_key.duration">{{ service.product_key.duration }}</p>
                                                <p v-if="service.product_key.users">{{ service.product_key.users }}</p>
                                            </template>
                                            <template v-if="">

                                            </template>
                                        </v-flex>

                                    </v-layout>
                                </v-card>
                                <v-data-table hide-actions hide-headers v-if="service.order_details.length > 0" :items="service.order_details" class="elevation-1">
                                    <template slot="items" slot-scope="props">
                                        <td v-if="props.item.amount > 0">{{ props.item.product_option.name }}</td>
                                        <td v-if="props.item.amount > 0">{{ props.item.amount }}</td>
                                    </template>
                                </v-data-table>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-divider></v-divider>
                <v-subheader >
                    Domeinen van deze klant
                    <v-btn color="#6A9F59" dark small absolute right fab @click="newDomain">
                        <v-icon>add</v-icon>
                    </v-btn>
                </v-subheader>
                <template v-for="(domain, index) in userDomains">
                    <v-divider></v-divider>
                    <v-list-tile :key="domain.name" avatar @click="">
                        <v-list-tile-avatar>
                            <v-icon >public</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="domain.name"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </template>
            </v-list>
        </v-card>
    </div>
</template>

<script>
    import { includes } from "lodash";
    export default {
      data: () => ({
          user: null,
          fab: false,
      }),
      computed: {
          userProducts() { return this.$store.getters.userProducts; },
          userDomains() { return this.$store.getters.userDomains; },
          enduser() { return this.$store.getters.enduser; }
      },
      created () {
          this.user = JSON.parse(localStorage.getItem('user'));
      },
      mounted () {
          this.$store.dispatch('user');
          if(!this.userDomains) { this.$store.dispatch('userDomains'); }
          if(!this.userProducts) { this.$store.dispatch('userProducts'); }
      },
      methods: {
          newService() {
              this.$emit('new-service');
          },
          newDomain() {
              this.$emit('new-domain');
          },
          details(service) {
              this.$emit('office-details', service);
          },
          asset(image) {
              return require('@/assets/'+image);
          },
          logout() {
              localStorage.removeItem('user');
              this.$router.push('/login');
          },
          edit() {
              this.$emit('edit');
          },
          isOffice(id) {
              return _.includes([7, 8, 9, 10], id);
          },
      }
    }
</script>

<style scoped>
    .client-details .product-title {
        font-size: 0.8em !important;
    }

    .client-details .avatar-image {
        margin: 0 30px 0 20px !important;
    }

    .client-details .avatar-image img {
        width: 80px !important;
        height: auto !important;
    }

    .client-details {
        background: #FAFAFA;
    }

    .client-details .product-header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        height: 20px;
    }

    .client-details .product-header div {
        -webkit-box-flex: 0;
        -ms-flex: 0 0 100px;
        flex: 0 0 100px;
    }

    .client-details .product-header img {
        width: 90%;
        padding: 0 13% 0 0;
    }

    .client-details .product-header p {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }
    .top5 {
        position:relative;
        top:5px;
    }

</style>
