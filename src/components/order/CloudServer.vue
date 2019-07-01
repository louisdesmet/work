<template>
  <v-layout row wrap>
    <v-flex xs6 pr-5>
      <v-layout row wrap>
        <v-flex xs10>
          <v-slider v-model="server.processor.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.processor.label" min="1" max="8" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.processor.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.memory.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.memory.label" min="1" max="32" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.memory.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.disk1.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.disk1.label" min="25" max="150" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.disk1.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.disk2.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.disk2.label" min="0" max="500" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.disk2.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.ipv4.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.ipv4.label" min="1" max="10" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.ipv4.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-select v-model="server.system.data" @change="calculate" :thumb-size="26" :items="['Linux Ubuntu', 'Windows server']" :placeholder="server.system.value" class="mt-4"></v-select>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.system }}</p>
        </v-flex>
        <v-flex xs10>
          <v-switch v-model="server.backup.data" @change="calculate" :thumb-size="26" class="mt-5" :label="server.backup.label"></v-switch>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.backup }}</p>
        </v-flex>
      </v-layout>

    </v-flex>
    <v-flex xs6>
      <v-layout row wrap>
        <v-flex xs10>
          <v-slider v-model="server.services.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.services.label" min="0" max="100" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.services.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.standard.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.standard.label" min="0" max="100" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.standard.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.proplus.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.proplus.label" min="0" max="100" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.proplus.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.word.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.word.label" min="0" max="100" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.word.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.excel.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.excel.label" min="0" max="100" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.excel.toFixed(2) }}</p>
        </v-flex>
        <v-flex xs10>
          <v-slider v-model="server.outlook.data" @change="calculate" :thumb-size="26" color="#1976d2" :label="server.outlook.label" min="0" max="100" thumb-label="always" class="mt-5" hide-details></v-slider>
        </v-flex>
        <v-flex xs2>
          <p class="prices">{{ totals.outlook.toFixed(2) }}</p>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex mt-5>
      <v-card>
        <v-card-title primary-title>
            <v-layout row wrap>
              <v-flex xs5>
                <p>Setup cost</p>
                <p>Monthly</p>
                <p>BTW/TVA @ 21%</p>
              </v-flex>
              <v-flex xs1>
                <p class="font-weight-bold">100 €</p>
                <p class="font-weight-bold">{{ parseFloat(monthly).toFixed(2) }} €</p>
                <p class="font-weight-bold">{{ btw.toFixed(2) }} €</p>
              </v-flex>
              <v-flex xs5>
                <p class="font-weight-bold subheading">Totaal</p>
              </v-flex>
              <v-flex xs1>
                <p class="font-weight-bold subheading text-xs-right">{{ (monthly + btw + 100).toFixed(2) }} €</p>
              </v-flex>
            </v-layout>
        </v-card-title>
      </v-card>
      <v-btn @click="cart" block>Toevoegen</v-btn>
    </v-flex>
  </v-layout>

</template>
<script>
  export default {
    name: 'Cloudserver',
    data () {
      return {
        server: {
          processor: {
            data: 1,
            label: 'Aantal Processoren'
          },
          memory: {
            data: 1,
            label: 'Geheugen (GB)'
          },
          disk1: {
            data: 25,
            label: 'Disk 1 (GB)'
          },
          disk2: {
            data: 0,
            label: 'Disk 2 (GB)'
          },
          ipv4: {
            data: 1,
            label: 'Public IP-adres (IPv4)'
          },
          services: {
            data: 0,
            label: 'Terminal Services'
          },
          standard: {
            data: 0,
            label: 'MS Office Standard'
          },
          proplus: {
            data: 0,
            label: 'MS Office Pro Plus'
          },
          word: {
            data: 0,
            label: 'MS Word'
          },
          excel: {
            data: 0,
            label: 'MS Excel'
          },
          outlook: {
            data: 0,
            label: 'MS Outlook'
          },
          system: {
            data: 'Linux Ubuntu',
            label: 'Operating Systeem'
          },
          backup: {
            data: false,
            label: 'Back-up volledige server, 1 per uur, retentie 12 maanden'
          }
        },
        totals: {
          processor: 0,
          memory: 0,
          disk1: 0,
          disk2: 0,
          ipv4: 0,
          system: 0,
          backup: 0,
          services: 0,
          standard: 0,
          proplus: 0,
          word: 0,
          excel: 0,
          outlook: 0
        },
        monthly: 0,
        btw: 0,
      }
    },
    props: ['product_clone'],
    computed: {

    },
    mounted () {
      this.calculate();
    },
    methods: {
      cart() {
        this.$router.push({ name: 'cart', params: {
            product: this.product_clone,
            cloudServerOptions: this.server,
            price: this.monthly + this.btw + 100
        }});
      },
      calculate() {
        let that = this;
        this.product_clone.options.forEach(function(option) {
          switch (option.name) {
            case 'Processors': that.totals.processor = that.server.processor.data * option.prices[0].price;
              break;
            case 'Memory': that.totals.memory = that.server.memory.data * option.prices[0].price;
              break;
            case 'Disk 1': that.totals.disk1 = that.server.disk1.data * option.prices[0].price;
              break;
            case 'Disk 2': that.totals.disk2 = that.server.disk2.data * option.prices[0].price;
              break;
            case 'Public IP-adres (IPv4)': that.totals.ipv4 = that.server.ipv4.data * option.prices[0].price;
              break;
            case 'Operating system': that.totals.system =  (that.server.system === 'Windows server' ? option.prices[0].price : 0);
              break;
            case 'Back-up': that.totals.backup = (that.server.backup === true ? option.prices[0].price : 0);
              break;
            case 'Terminal Services': that.totals.services = that.server.services.data * option.prices[0].price;
              break;
            case 'MS Office Standard': that.totals.standard = that.server.standard.data * option.prices[0].price;
              break;
            case 'MS Office Pro Plus': that.totals.proplus = that.server.proplus.data * option.prices[0].price;
              break;
            case 'MS Word ': that.totals.word = that.server.word.data * option.prices[0].price;
              break;
            case 'MS Excel': that.totals.excel = that.server.excel.data * option.prices[0].price;
              break;
            case 'MS Outlook': that.totals.outlook = that.server.outlook.data * option.prices[0].price;
              break;
          }
        });
        this.monthly = 0;
        Object.values(this.totals).forEach(function(total) {
          that.monthly += parseFloat(total);
        });
        this.btw = (this.monthly + 100) * 0.21;
      },
    }
  }
</script>
<style scoped>
  .prices {
    margin: 53px 0 0 10px;
  }
</style>
