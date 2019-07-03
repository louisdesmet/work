<template>
  <v-app>
    <v-toolbar color="#3083A7" dark height="80px">
      <v-toolbar-title><router-link to="/home"><img class="logo" src="@/assets/logo.png"></router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon  @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/home"><v-icon left dark small>home</v-icon>Dashboard</v-btn>
       <!-- <v-btn flat to="/clients"><v-icon left dark small>{{ menu.clients.icon }}</v-icon>Clients</v-btn>
        <v-btn flat to="/services"><v-icon left dark small>{{ menu.services.icon }}</v-icon>Services</v-btn>
        <v-btn flat to="/domains"><v-icon left dark small>{{ menu.domeinen.icon }}</v-icon>Domains</v-btn>
        <v-btn flat to="/licenses"><v-icon left dark small>{{ menu.licenties.icon }}</v-icon>Licenses</v-btn>
        <v-btn flat to="/reports"><v-icon left dark small>{{ menu.rapporten.icon }}</v-icon>Reports</v-btn>-->
        <v-btn flat to="/cart">
          <v-badge overlap top left color="red">
            <span slot="badge">{{ cartCount }}</span>
            <v-avatar size="40" color="#6A9F59">
              <v-icon small>shopping_cart</v-icon>
            </v-avatar>
          </v-badge>
        </v-btn>
      </v-toolbar-items>
      <v-select
              class="lang"
              :items="langs"
              v-model="$i18n.locale"
              dense
              hide-details
      ></v-select>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      cartCount: 0,
      langs: ['nl', 'en']
    }
  },
  watch: {
    cartCount: function() {
      if(JSON.parse(localStorage.getItem('cart')) != null) {
        return JSON.parse(localStorage.getItem('cart')).length;
      } else {
        return 0;
      }
    }
  },
}
</script>
<style scoped>
  .logo {
    width: 110px;
    margin: 5px 0 0 38px;
  }
  .lang {
    max-width: 50px;
    padding: 0;
    position: relative;
    top: -5px;
  }
</style>
