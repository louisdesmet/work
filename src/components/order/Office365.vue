<template>
  <div>
    <v-layout row class="mt-5" v-if="domain">
      <v-flex xs6>
        <div class="tenant-new">
          <h2>Wil u een nieuwe tenant aanmaken?</h2>
          <p>Op deze manier start u een volledig nieuw abonnement. U dient een nieuwe, unieke naam voor de tenant op te geven, zoalsbijvoorbeeld mijnbedrijf.onmicrosoft.com. Hou de tenant naam bij voorkeur zo kort mogelijk.</p>
          <p>Zodra de tenant is aangemaakt, kan u in het Microsoft portaal uw eigen domeinnaam koppelen.</p>
          <v-text-field v-model="new_tenant" :counter="25" label="Persoonlijk voorvoegsel" required suffix=".onmicrosoft.com"></v-text-field>
          <v-btn @click="checkAvailability" dark class="mx-0" color="#3083A7">Controleer beschikbaarheid</v-btn>
        </div>
      </v-flex>
      <v-flex xs6>
        <div class="tenant-old">
          <h2>Wil u een bestaande tenant koppelen?</h2>
          <p>Een bestaande tenant is een abonnement dat reeds bestaat en is aangemaakt bij Microsoft zelf of bij een andere provider. Via Cloudhighway kan u deze tenant koppelen en nieuwe licenties erin injecteren. Hiervoor dient u eerst een éénmalige procedure uit te voeren om Cloudhighway toegang te geven tot de tenant. Klik hiervoor op "Voeg toe aan bestaande tenant"</p>
          <p>voor we kunnen aanvangen met het toevoegen van licenties aan uw tenant, moeten we die eerst vinden.Gelieve hieronder het primaire domein van uw tenant in te geven. Dit kan het oorspronkelijke .onmicrosoft.com domein zijn, of een domein dat u zelf heeft ingesteld.</p>
          <v-text-field v-model="old_tenant" :counter="25" label="Persoonlijk voorvoegsel" required suffix=".onmicrosoft.com"></v-text-field>
          <v-btn @click="findTenant" dark class="mx-0" color="#3083A7">Voeg toe aan bestaande tenant</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <div class="py-5" v-if="product_clone.id === 9">
      <p>Microsoft 365 is een allesomvattend abonnement waarin het gebruik van Office 365, Windows 10 en Enterprise Mobility and Security is opgenomen. Een volledig intelligente oplossing, waarmee iedereen op een veilige manier creatief kan zijn en kan samenwerken.</p>
      <p>U vindt meer info op de website van <a href="https://www.microsoft.com/nl-BE/microsoft-365">Microsoft</a></p>
      <p>Cloudhighway verdeelt 3 versies van Microsoft 365: Business, Enterprise E3 en Enterprise E5. In onderstaande tabel vindt u de verschillen terug:</p>
    </div>
    <template v-if="options">
      <v-card>
        <v-card-title primary-title class="domain">
          <p>Desired microsoft domain: <strong>{{ this.microsoftDomain }}.onmicrosoft.com</strong><v-icon small light @click="change">edit</v-icon></p>
        </v-card-title>
      </v-card>
      <v-layout row wrap class="mt-4">
        <div style="margin: 0 auto;">
          <v-radio-group row v-model="billing" @change="switchBilling()">
            <v-radio
                    label="Maandelijks"
                    :value="1"
            ></v-radio>
            <v-radio
                    label="Jaarlijks"
                    :value="0"
            ></v-radio>
          </v-radio-group>
        </div>
        <v-expansion-panel class="exchange" v-show="product_clone.id !== 9">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>
                <img height="55px" src="../../assets/exchange.png">
              </div>
            </template>
            <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
            <v-card>
              <v-card-text>
                <v-data-table :items="product_clone.options" :headers="headers" class="elevation-1" hide-actions>
                  <template slot="items" slot-scope="props" v-if="props.item.group === 'exchange'">
                    <td width="100px;">
                      <v-text-field v-model="amounts[props.item.id]" type="number" min="0" @change="add(props.item)"></v-text-field>
                    </td>
                    <td>
                      <h3>{{ props.item.name }}</h3>
                      <p>{{ props.item.text }}</p>
                    </td>
                    <td v-if="billing === 1">{{ props.item.prices[1].price }}</td>
                    <td v-else>{{ props.item.prices[5].price }}</td>

                    <td v-if="billing === 1">
                      <span>{{ (props.item.prices[0].price - props.item.prices[1].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[0].price - props.item.prices[1].price) / props.item.prices[1].price) * 100).toFixed(0)}}%</span>
                    </td>
                    <td v-else>
                      <span>{{ (props.item.prices[4].price - props.item.prices[5].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[4].price - props.item.prices[5].price) / props.item.prices[5].price) * 100).toFixed(0)}}%</span>
                    </td>

                    <td v-if="billing === 1">{{ props.item.prices[0].price }}</td>
                    <td v-else>{{ props.item.prices[4].price }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="business" v-show="product_clone.id !== 9">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>
                <img height="55px"  src="../../assets/business.png">
              </div>
            </template>
            <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
            <v-card>
              <v-card-text>
                <v-data-table :items="product_clone.options" :headers="headers" class="elevation-1" hide-actions>
                  <template slot="items" slot-scope="props" v-if="props.item.group === 'business'">
                    <td width="100px;">
                      <v-text-field v-model="amounts[props.item.id]" type="number" min="0" value="0" @change="add(props.item)"></v-text-field>
                    </td>
                    <td>
                      <h3>{{ props.item.name }}</h3>
                      <p>{{ props.item.text }}</p>
                    </td>
                    <td v-if="billing === 1">{{ props.item.prices[1].price }}</td>
                    <td v-else>{{ props.item.prices[5].price }}</td>

                    <td v-if="billing === 1">
                      <span>{{ (props.item.prices[0].price - props.item.prices[1].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[0].price - props.item.prices[1].price) / props.item.prices[1].price) * 100).toFixed(0)}}%</span>
                    </td>
                    <td v-else>
                      <span>{{ (props.item.prices[4].price - props.item.prices[5].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[4].price - props.item.prices[5].price) / props.item.prices[5].price) * 100).toFixed(0)}}%</span>
                    </td>

                    <td v-if="billing === 1">{{ props.item.prices[0].price }}</td>
                    <td v-else>{{ props.item.prices[4].price }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="enterprise" v-show="product_clone.id !== 9">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>
                <img  height="55px" src="../../assets/enterprise.png">
              </div>
            </template>
            <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
            <v-card>
              <v-card-text>
                <v-data-table :items="product_clone.options" :headers="headers" class="elevation-1" hide-actions>
                  <template slot="items" slot-scope="props" v-if="props.item.group === 'enterprise'">
                    <td width="100px;">
                      <v-text-field v-model="amounts[props.item.id]" type="number" min="0" value="0" @change="add(props.item)"></v-text-field>
                    </td>
                    <td>
                      <h3>{{ props.item.name }}</h3>
                      <p>{{ props.item.text }}</p>
                    </td>
                    <td v-if="billing === 1">{{ props.item.prices[1].price }}</td>
                    <td v-else>{{ props.item.prices[5].price }}</td>

                    <td v-if="billing === 1">
                      <span>{{ (props.item.prices[0].price - props.item.prices[1].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[0].price - props.item.prices[1].price) / props.item.prices[1].price) * 100).toFixed(0)}}%</span>
                    </td>
                    <td v-else>
                      <span>{{ (props.item.prices[4].price - props.item.prices[5].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[4].price - props.item.prices[5].price) / props.item.prices[5].price) * 100).toFixed(0)}}%</span>
                    </td>

                    <td v-if="billing === 1">{{ props.item.prices[0].price }}</td>
                    <td v-else>{{ props.item.prices[4].price }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="microsoft">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>
                <img height="55px"  src="../../assets/microsoft.png">
              </div>
            </template>
            <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
            <v-card>
              <v-card-text>
                <v-data-table :items="product_clone.options" :headers="headers" class="elevation-1" hide-actions>
                  <template slot="items" slot-scope="props" v-if="props.item.group === 'microsoft'">
                    <td width="100px;">
                      <v-text-field v-model="amounts[props.item.id]" type="number" min="0" value="0" @change="add(props.item)"></v-text-field>
                    </td>
                    <td>
                      <h3>{{ props.item.name }}</h3>
                      <p>{{ props.item.text }}</p>
                    </td>
                    <td v-if="billing === 1">{{ props.item.prices[1].price }}</td>
                    <td v-else>{{ props.item.prices[5].price }}</td>

                    <td v-if="billing === 1">
                      <span>{{ (props.item.prices[0].price - props.item.prices[1].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[0].price - props.item.prices[1].price) / props.item.prices[1].price) * 100).toFixed(0)}}%</span>
                    </td>
                    <td v-else>
                      <span>{{ (props.item.prices[4].price - props.item.prices[5].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[4].price - props.item.prices[5].price) / props.item.prices[5].price) * 100).toFixed(0)}}%</span>
                    </td>

                    <td v-if="billing === 1">{{ props.item.prices[0].price }}</td>
                    <td v-else>{{ props.item.prices[4].price }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel class="overige" v-show="product_clone.id !== 9">
          <v-expansion-panel-content>
            <template v-slot:header>
              <div>
                <h2>Overige</h2>
              </div>
            </template>
            <v-icon slot="actions" color="white">$vuetify.icons.expand</v-icon>
            <v-card>
              <v-card-text>
                <v-data-table :items="product_clone.options" :headers="headers" class="elevation-1" hide-actions>
                  <template slot="items" slot-scope="props" v-if="props.item.group === 'overige'">
                    <td width="100px;">
                      <v-text-field v-model="amounts[props.item.id]" type="number" min="0" value="0" @change="add(props.item)"></v-text-field>
                    </td>
                    <td>
                      <h3>{{ props.item.name }}</h3>
                      <p>{{ props.item.text }}</p>
                    </td>

                    <td v-if="billing === 1">{{ props.item.prices[1].price }}</td>
                    <td v-else>{{ props.item.prices[5].price }}</td>

                    <td v-if="billing === 1">
                      <span>{{ (props.item.prices[0].price - props.item.prices[1].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[0].price - props.item.prices[1].price) / props.item.prices[1].price) * 100).toFixed(0)}}%</span>
                    </td>
                    <td v-else>
                      <span>{{ (props.item.prices[4].price - props.item.prices[5].price).toFixed(2) }} €</span>
                      <span>{{(((props.item.prices[4].price - props.item.prices[5].price) / props.item.prices[5].price) * 100).toFixed(0)}}%</span>
                    </td>

                    <td v-if="billing === 1">{{ props.item.prices[0].price }}</td>
                    <td v-else>{{ props.item.prices[4].price }}</td>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
      <v-data-table :items="total" :headers="headers" class="elevation-1 overzicht" hide-actions>
        <template slot="items" slot-scope="props">
          <td>Totaal per maand excl. BTW</td>
          <td></td>
          <td>{{ props.item.partner.toFixed(2) }}</td>
          <td>
            <span>{{ (props.item.enduser - props.item.partner).toFixed(2) }} €</span>
            <span v-if="props.item.partner !== 0">{{ (((props.item.enduser - props.item.partner) / props.item.partner) * 100).toFixed(0) }}%</span>
            <span v-else>0%</span>

          </td>
          <td>{{ props.item.enduser.toFixed(2) }}</td>
        </template>
      </v-data-table>
      <v-btn @click="cart" block>Toevoegen</v-btn>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'Office365',
    data () {
      return {
        user: null,
        new_tenant: null,
        old_tenant: null,
        headers: [
          { text: '', sortable: false  },
          { text: '', sortable: false  },
          { text: 'Partnerprijs', sortable: false  },
          { text: 'Uw marge', sortable: false  },
          { text: 'Adviesprijs', sortable: false }
        ],
        total: [
          { enduser: 0, partner: 0 }
        ],
        list: {},
        amounts: [],
        billing: 1,
        microsoftDomain: null,
        options: false,
        domain: true,
        tenant: ''
      }
    },
    props: ['product_clone'],
    created () {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    computed: {

    },
    mounted () {

    },
    methods: {
      cart() {
        this.$router.push({ name: 'cart', params: {
          product: this.product_clone,
          office365options: this.list,
          microsoftDomain: this.microsoftDomain,
          tenant: this.tenant,
          price: this.total[0].enduser
        }});
      },
      add(item) {
        this.list[item['name']] = {
          amount: this.amounts[item.id],
          msname: item['msname'],
          code: item['code'],
          enduserMonthly: this.amounts[item.id] * item.prices[0].price,
          partnerMonthly: this.amounts[item.id] * item.prices[1].price,
          enduserYearly: this.amounts[item.id] * item.prices[4].price,
          partnerYearly: this.amounts[item.id] * item.prices[5].price
        };
        this.switchBilling();
      },
      switchBilling() {
        this.total[0].enduser = 0;
        this.total[0].partner = 0;
        if(this.billing === 1) {
          for (const data in this.list) {
            this.total[0].enduser += this.list[data].enduserMonthly;
            this.total[0].partner += this.list[data].partnerMonthly;
          }
        } else {
          for (const data in this.list) {
            this.total[0].enduser += this.list[data].enduserYearly;
            this.total[0].partner += this.list[data].partnerYearly;
          }
        }
      },
      checkAvailability() {
        // this.$api.get('/office/availability/' + this.new_tenant, {
        //     headers: {
        //         Authorization: 'Bearer ' + this.user.auth.access_token
        //     }
        // }).then(response => {
        //     if(response.data.Result === true) {
        //         this.microsoftDomain = this.new_tenant;
        //         this.options = true;
        //         this.domain = false;
        //     }
        // });
        this.microsoftDomain = this.new_tenant;
        this.options = true;
        this.domain = false;
      },
      findTenant() {
        this.$api.get('/office/find/' + this.old_tenant, {
            headers: {
                Authorization: 'Bearer ' + this.user.auth.access_token
            }
        }).then(response => {
            if(response.data.Result !== null) {
                this.microsoftDomain = this.old_tenant;
                this.tenant = response.data.Result;
                this.options = true;
                this.domain = false;
            }

        });
      },
      change() {
        this.domain = true;
        this.options = false;
      }
    }
  }
</script>
<style scoped>
  .domain {
    margin: 40px 0 0 0;
  }
  .domain p {
    font-size: 1.1em;
    margin-bottom: 6px;
  }
  .domain p strong {
    margin-left: 5px;
  }
  .domain p i {
    margin-left: 10px;
  }
  .tenant-new {
    background: #FAFAFA;
    margin-right: 15px;
    padding: 20px 30px;
  }
  .tenant-old {
    background: #FAFAFA;
    margin-left: 15px;
    padding: 20px 30px;
  }
  .tenant-new h2, .tenant-old h2 {
    margin-bottom: 15px;
    font-size: 1em;
  }
  .exchange h3, .business h3, .enterprise h3, .microsoft h3 {
    margin: 13px 0 5px 0;
  }
  .exchange span, .business span, .enterprise span, .microsoft span, .overige span {
    display: block;
  }
  .exchange >>>.v-expansion-panel__header  {
    background: #0072C6;
    border-bottom: 1px solid white;
  }
  .business >>>.v-expansion-panel__header, .enterprise >>>.v-expansion-panel__header {
    background: #D73A02;
    border-bottom: 1px solid white;
  }
  .microsoft >>>.v-expansion-panel__header  {
    background: #0078D7;
    border-bottom: 1px solid white;
  }
  .overige >>>.v-expansion-panel__header {
    background: #575757;
    color: white;
  }
  .overige h2 {
    padding: 16px 0;
  }
  .overzicht span {
    display: block;
  }
</style>
