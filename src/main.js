import Vue from 'vue'
import './plugins/vuetify'
import axios from 'axios';
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n);

Vue.config.productionTip = false;

Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      baseURL: 'http://generalapi.test/api',
      headers: {
        common: {
          Accept: 'application/json'
        }
      }
    })
  }
});

router.beforeEach((to, from, next) => {
  const auth = to.matched.some(record => record.meta.auth);
  const currentUser = localStorage.getItem('user');
  if(auth && !currentUser) {
    next('/login');
  } else if(to.path == '/login' && currentUser) {
    next('/');
  } else {
    next();
  }
});


const messages = {
  en: {
    login: {
      loginbtn: 'Aanmelden',
      intro: 'Cloudhighway Marketplace is an online marketplace for resellers, with a wide assortment of cloud solutions from different vendors (including some exclusive solutions) padded with added values such as training, marketing and more.',
      under_intro: 'No account yet? Contact us on sales@cloudhighway.be'
    },
    menu: {
      home: 'home',
      clients: 'clients',
      services: 'services',
      domains: 'domains',
      reports: 'reports',
      licenses: 'licenses'
    },
    form: {
      firstname: 'First name',
      lastname: 'Last name',
      company_name: 'Company name',
      address: 'Address',
      postal_code: 'Postal code',
      city: 'City',
      country: 'Country',
      phonenumber: 'Phone number',
      email: 'Email',
      password: 'Password',
      forgot_password: 'Forgot password',
      vat_number: 'Vat number',
      radio_user_managed: 'Partner manages everything for the client. Invoicing to the partner.',
      radio_user_unmanaged: 'Endclient manages his own account. Invoices to the endclient.',
      reset_pass: 'Reset password',
      actions: 'Actions',
      save: 'Save',
      rowsperpage: 'Rows per page'



    },
    actions: {
      select: 'select',
      edit: 'edit'
    },
    new_user: 'New client',
    new_user_text: 'Add a new client to your partner account.'
  },
  nl: {
    login: {
      loginbtn: 'Login',
      intro: 'Cloudhighway Marketplace is een online marktplaats voor resellers, met een breed gamma aan cloudoplossingen van diverse vendoren (waaronder enkele exclusieve oplossingen) aangevuld met toegevoegde waarden zoals opleidingen, support, marketing en meer.',
      under_intro: 'Nog geen account? Contacteer ons via sales@cloudhighway.be'
    },
    menu: {
      home: 'home',
      clients: 'klanten',
      services: 'diensten',
      domains: 'domeinen',
      rapports: 'rapporten',
      licenses: 'licensies'
    },
    form: {
      firstname: 'Voornaam',
      lastname: 'Achternaam',
      company_name: 'Bedrijfsnaam',
      adresses: 'Adressen',
      postal_code: 'Postcode',
      city: 'Stad',
      country: 'Land',
      phonenumber: 'Gsm nummer',
      email: 'Email',
      password: 'Wachtwoord',
      forgot_password: 'Wachtwoord vergeten',
      vat_number: 'Vat number',
      radio_user_managed: 'Partner beheert alles van de klant. Factuur naar de partner.',
      radio_user_unmanaged: 'Eindklant beheert eigen account. Factuur naar de eindklant.',
      reset_pass: 'Wachtwoord resetten',
      actions: 'Acties',
      save: 'Opslaan',
      rowsperpage: 'Aantal rijen per pagina'
    },
    actions: {
      select: 'selecteren',
      edit: 'aanpassen'
    },
    new_user: 'Nieuwe klant',
    new_user_text: 'Voeg een nieuwe klant toe aan je partner account.'
  }
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
