<template>
   <v-container>
      <v-toolbar flat color="white">
         <v-toolbar-title>Winkelmandje</v-toolbar-title>
         <v-spacer></v-spacer>
         <v-btn @click="empty">Leegmaken</v-btn>
      </v-toolbar>
      <v-data-table hide-headers hide-actions :items="items" expand :headers-length="6">
         <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
               <td>{{ props.item.name }}</td>
               <template v-if="props.item.options && Object.keys(props.item.options).length === 1">
                  <td v-for="(option, index) in props.item.options">{{ option + text(index) }}</td>
                  <td></td>
                  <td></td>
               </template>
               <template v-if="props.item.options && Object.keys(props.item.options).length === 2">
                  <td v-for="(option, index) in props.item.options">{{ option + text(index) }}</td>
                  <td></td>
               </template>
               <template v-if="props.item.options && Object.keys(props.item.options).length === 3">
                  <td v-for="(option, index) in props.item.options">{{ option + text(index) }}</td>
               </template>
               <template v-if="!props.item.options">
                  <td></td>
                  <td></td>
                  <td></td>
               </template>
               <td>{{ parseFloat(props.item.price).toFixed(2) }} €</td>
               <td class="justify-center layout px-0">
                  <v-icon small @click="deleteItem(props.item)">delete</v-icon>
               </td>
            </tr>
         </template>
         <template v-slot:expand="props">
            <v-card flat v-if="props.item.office365options">
               <v-card-text>
                  <v-data-table hide-headers hide-actions :items="Object.entries(props.item.office365options)">
                     <template slot="items" slot-scope="props">
                        <td>{{ props.item[0] }}</td>
                        <td>{{ props.item[1].amount }}</td>
                     </template>
                  </v-data-table>
               </v-card-text>
            </v-card>
            <v-card flat v-if="props.item.cloudServerOptions">
               <v-card-text>
                  <v-data-table hide-headers hide-actions :items="Object.entries(props.item.cloudServerOptions)">
                     <template slot="items" slot-scope="props">
                        <td>{{ props.item[1].label }}</td>
                        <td v-if="props.item[0] === 'backup'">{{ (props.item[1].data === true) ?  'yes' : 'no' }}</td>
                        <td v-else>{{ props.item[1].data }}</td>
                     </template>
                  </v-data-table>
               </v-card-text>
            </v-card>
         </template>
      </v-data-table>
      <v-btn block @click="order">Bestelling afronden</v-btn>
   </v-container>
</template>
<script>
   import { includes } from "lodash";
   export default {
      data: () => ({
         user: null,
         items: [],
      }),
      props: [
         'product',
         'options',
         'office365options',
         'cloudServerOptions',
         'reference',
         'price',
         'microsoftDomain',
         'tenant'
      ],
      mounted() {
         if(this.product) {
            this.add();
         }
         this.cart();
      },
      created () {
         this.user = JSON.parse(localStorage.getItem('user'));
      },
      methods: {
         add() {
            console.log(this.price);
            let cart = JSON.parse(localStorage.getItem('cart'));
            if(cart == null) {
               localStorage.setItem("cart", JSON.stringify([{
                  id: 1,
                  user_id: this.user.user.id,
                  product_id: this.product.id,
                  name: this.product.name,
                  options: this.options,
                  office365options: this.office365options,
                  cloudServerOptions: this.cloudServerOptions,
                  reference: this.reference,
                  price: this.price,
                  microsoftDomain: this.microsoftDomain,
                  tenant: this.tenant
               }]));
            } else {
               cart.push({
                  id: cart.length + 1,
                  user_id: this.user.user.id,
                  product_id: this.product.id,
                  name: this.product.name,
                  options: this.options,
                  office365options: this.office365options,
                  cloudServerOptions: this.cloudServerOptions,
                  reference: this.reference,
                  price: this.price,
                  microsoftDomain: this.microsoftDomain,
                  tenant: this.tenant
               });
               localStorage.setItem("cart", JSON.stringify(cart));
            }
         },
         cart() {
            let string = localStorage.getItem('cart');
            if(string !== null) {
               this.items = JSON.parse(string);
            }
         },
         order() {
            this.$api.post('/orders', {
               items: JSON.parse(localStorage.getItem('cart'))
            }, {
               headers: {
                  Authorization: 'Bearer ' + this.user.auth.access_token
               }
            }).then(response => {
               console.log(response);
               //this.empty();
               //this.$router.push({path: '/'});
            });
         },
         empty() {
            localStorage.removeItem('cart');
            this.$router.push({ name: 'home' });
         },
         text(index) {
            if(index === 'duration') {
               return ' jaar';
            } else if(index === 'userAmount') {
               return ' gebruikers';
            } else {
               return '';
            }
         },
         debug() {
            //debugger;
         }
      }
   }
</script>
