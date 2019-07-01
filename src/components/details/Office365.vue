<template>
  <v-card>
    <v-toolbar color="#E2EAEC" light>
      <v-toolbar-title>Office configureren</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat @click="">Opslaan</v-btn>
        <v-btn icon @click="close">
          <v-icon>clear</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card>
      <v-expansion-panel v-model="panel" expand>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div class="subheading">Licenties</div>
          </template>
          <v-card>
            <v-card-text>
              <v-data-table
                      v-if="licenses"
                      :headers="licenseHeaders"
                      :items="licenses"
                      class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.ActiveUnits }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div class="subheading">Gebruikers</div>
          </template>
          <v-card>
            <v-card-text>
              <v-data-table
                      v-if="users"
                      :headers="userHeaders"
                      :items="users"
                      class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.DisplayName }}</td>
                  <td>{{ props.item.UserPrincipalName }}</td>
                  <td>
                    <div v-for="(license, index) in props.item.Licenses">
                      <v-switch
                              v-model="users[props.index].Licenses[index].active"
                              :label="license.name"
                              hide-details
                      ></v-switch>
                    </div>
                  </td>

                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div class="subheading">Domeinnamen</div>
          </template>
          <v-card>
            <v-card-text>
              <v-data-table
                      v-if="domains"
                      :headers="domainHeaders"
                      :items="domains"
                      class="elevation-1"
              >
                <template v-slot:items="props">
                  <td>{{ props.item.Name }}</td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>
  </v-card>
</template>
<script>
  export default {
    name: 'Office365Details',
    data () {
      return {
        user: null,
        users: null,
        domains: null,
        licenses: null,
        licenseHeaders: [
          { text: 'Naam', value: 'name' },
          { text: 'Aantal', value: 'aantal' }
        ],
        userHeaders: [
          { text: 'Naam', value: 'name' },
          { text: 'Account', value: 'account' },
          { text: 'Licentie', value: 'license' },
        ],
        domainHeaders: [ { text: 'Naam', value: 'name' } ],
        panel: [true, true, true]
      }
    },
    props: ['service'],
    created () {
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    computed: {
    },
    mounted () {





      let that = this;
      this.$api.get('/office/' + this.service.tenant, {
          headers: {
              Authorization: 'Bearer ' + this.user.auth.access_token
          }
      }).then(response => {
        this.users = response.data.Result.users;
        this.domains = response.data.Result.domains;
        this.licenses = response.data.Result.licenses;

        this.licenses.forEach(function(license) {
           license.name = that.translate(license.AccountSkuId);
        });

        this.users.forEach(function(user, uindex) {
          if(user.Licenses.length < that.licenses.length) {
            that.licenses.forEach(function(license) {
               that.users[uindex].Licenses.push({name: license.name, active: false });
            });
          } else {
            user.Licenses.forEach(function(license, lindex) {
                license.active = true;
                license.name = that.translate(license.AccountSkuId);

            });
          }
        });
      });


    },
    methods: {
      close() {
        this.$emit('close');
      },
      translate(sku) {
        switch(sku) {
          case 'reseller-account:EXCHANGESTANDARD': return 'Exchange Online Plan 1';
            break;
          case 'reseller-account:EXCHANGEENTERPRISE': return 'Exchange Online Plan 2';
            break;
          case 'reseller-account:OFFICESUBSCRIPTION': return 'Office 365 Pro Plus';
            break;
          case 'reseller-account:INTUNE_A': return 'Intune';
            break;
          case 'reseller-account:SPB': return 'Microsoft 365 Business';
            break;
          case 'reseller-account:SPE_E3': return 'Microsoft 365 E3';
            break;
          case 'reseller-account:SPE_E5': return 'Microsoft 365 E3';
            break;
          case 'reseller-account:O365_BUSINESS': return 'Office 365 Business';
            break;
          case 'reseller-account:O365_BUSINESS_ESSENTIALS': return 'Office 365 Business Essentials';
            break;
          case 'reseller-account:O365_BUSINESS_PREMIUM': return 'Office 365 Business Premium';
            break;
          case 'reseller-account:STANDARDPACK': return 'Office 365 - E1';
            break;
          case 'reseller-account:ENTERPRISEPACK': return 'Office 365 - E3';
            break;
          case 'reseller-account:VISIOONLINE_PLAN1': return 'Visio Online Plan 1';
            break;
          case 'reseller-account:VISIOCLIENT': return 'Visio Online Plan 2';
            break;
          case 'reseller-account:WACONEDRIVESTANDARD': return 'One Drive Business Plan 1';
            break;
          case 'reseller-account:WACONEDRIVEENTERPRISE': return 'One Drive Business Plan 2';
            break;
          case 'reseller-account:MCOIMP': return 'Skype for Business Plan 1';
            break;
          case 'reseller-account:MCOSTANDARD': return 'Skype for Business Plan 2';
            break;
          case 'reseller-account:PROJECTESSENTIALS': return 'Project Online Essentials';
            break;
          case 'reseller-account:PROJECTPROFESSIONAL': return 'Project Online Professional';
            break;
          case 'reseller-account:PROJECTPREMIUM': return 'Project Online Premium';
            break;
        }
      }
    }
  }
</script>
<style scoped>

</style>
