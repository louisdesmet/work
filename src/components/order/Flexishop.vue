<template>
    <div>
        <v-text-field v-model="company" label="Company"></v-text-field>
        <v-text-field v-model="title" label="Website title"></v-text-field>
        <v-text-field v-model="emailContact" label="The email address where contact form information is sent to"></v-text-field>
        <v-text-field v-model="emailOrder" label="The email address where order information is sent to"></v-text-field>
        <v-text-field v-model="url" label="url" prefix="www."></v-text-field>
        <v-radio-group row v-model="compu" label="CompuDeals folderprijzen">
            <v-radio label="Ja" :value="1"></v-radio>
            <v-radio label="Nee" :value="0"></v-radio>
        </v-radio-group>
        <v-radio-group row v-model="ssl" label="Wenst u een SSL certificaat? (meerprijs € 30/jaar)">
            <v-radio label="Ja" :value="1"></v-radio>
            <v-radio label="Nee" :value="0"></v-radio>
        </v-radio-group>
        <v-btn color="primary" @click="$refs.inputUpload.click()">Voeg hier uw logo toe</v-btn>
        <input v-show="false" ref="inputUpload" type="file">
        <v-textarea label="Zijn er merken die we reeds moeten verbergen?"></v-textarea>
        <v-text-field v-model="klantnr" label="D&D klantnummer" prefix="#"></v-text-field>
        <v-textarea label="Voorkeur voor kleuren / huisstijl"></v-textarea>
        <p>Checkout mogelijkheden</p>
        <v-checkbox hide-details v-model="pickup" label="Afhaling"></v-checkbox>
        <v-checkbox @change="changeDelivery" hide-details v-model="delivery" label="Verzending"></v-checkbox>
        <v-text-field v-if="showTransport" v-model="transport" label="Transportkosten"></v-text-field>
        <v-checkbox @change="changeInstallation" hide-details v-model="installation" label="Installatie On-site"></v-checkbox>
        <v-text-field v-if="showPayPerHour" v-model="payPerHour" label="Te vermelden uurloon"></v-text-field>

        <p class="mt-4">Betaalmethodes</p>
        <v-checkbox @change="changeMollie" hide-details v-model="mollie" label="Online via Mollie"></v-checkbox>
        <v-text-field v-if="showApiKey" v-model="apiKey" label="Mollie API key (productie)"></v-text-field>

        <v-checkbox @change="changeBank" hide-details v-model="bank" label="Bankoverschrijving"></v-checkbox>
        <v-text-field v-if="showIban" v-model="iban" label="Uw IBAN nummer"></v-text-field>

        <v-checkbox hide-details v-model="cash" label="Contant bij afhaling"></v-checkbox>
        <v-checkbox hide-details v-model="invoice" label="Factuur"></v-checkbox>

        <v-radio-group row v-model="fb" label="Wilt u een Facebook pagina koppelen?">
            <v-radio label="Ja" :value="1"></v-radio>
            <v-radio label="Nee" :value="0"></v-radio>
        </v-radio-group>
        <v-text-field v-model="margin" label="Met welke procentuele marge wil u starten?" suffix="%"></v-text-field>
        <v-textarea label="Heeft u verder opmerkingen of aandachtspunten?"></v-textarea>
        <v-radio-group row v-model="plan" label="Selecteer uw plan">
            <v-radio label="plan 1" value="1"></v-radio>
            <v-radio label="plan 2" value="2"></v-radio>
        </v-radio-group>
    </div>
</template>
<script>
  export default {
    name: 'Flexishop',
    data () {
      return {
          company: null,
          title: null,
          emailContact: null,
          emailOrder: null,
          url: null,
          compu: null,
          ssl: null,
          image: null,
          klantnr: null,
          pickup: null,
          delivery: null,
          installation: null,
          transport: null,
          showTransport: false,
          payPerHour: null,
          showPayPerHour: false,
          mollie: null,
          apiKey: null,
          showApiKey: false,
          bank: null,
          iban: null,
          showIban: false,
          cash: null,
          invoice: null,
          fb: 0,
          margin: null,
          plan: '1',
      }
    },
    props: ['product_clone'],
    computed: {

    },
    mounted () {

    },
    methods: {
        cart() {
            this.$router.push({ name: 'cart', params: {
                product: this.product_clone
            }});
        },
        changeDelivery() {
            this.showTransport = !this.showTransport;
        },
        changeInstallation() {
            this.showPayPerHour = !this.showPayPerHour;
        },
        changeMollie() {
            this.showApiKey = !this.showApiKey;
        },
        changeBank() {
            this.showIban = !this.showIban;
        }
    }
  }
</script>
<style scoped>

</style>
