<template>
  <v-card class="new-domain">
    <v-toolbar color="#E2EAEC" light>
      <v-toolbar-title>Nieuwe domein</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" v-if="input" class="pt-0" hide-details @click:append-outer="untoggle" append-outer-icon="search" clearable></v-text-field>
      <v-btn v-if="icon" icon @click="toggle">
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn v-if="icon" icon @click="close">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-toolbar>
    <v-text-field v-model="domain" class="px-4 pt-4" :counter="25" label="Domeinnaam" required prefix="www."></v-text-field>
    <v-expansion-panel class="mt-3" expand v-model="open">
      <v-expansion-panel-content :key="1">
        <div slot="header">Gekozen domeinnamen</div>
        <v-list dense class="pa-0" v-if="domain != ''">
          <v-layout row wrap>
            <template v-for="(item, index) in selectedExtensions">
              <v-flex xs12>
                <v-list-tile :key="item.id" avatar>
                  <v-list-tile-content>
                    <v-list-tile-title>www.{{ domain + '.' + item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-select :items="durations" class="caption duur" placeholder="Duur"></v-select>
                  <p class="pt-3">14.20€</p>
                  <v-btn icon @click="">
                    <v-icon>shopping_cart</v-icon>
                  </v-btn>
                  <v-btn icon @click="">
                    <v-icon>done_outline</v-icon>
                  </v-btn>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
            </template>
          </v-layout>
        </v-list>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-card v-if="search != null">
      <v-list two-line dense class="pa-0">
        <v-layout row wrap>
          <template v-for="(item, index) in sortedExtensions">
            <v-flex xs3 v-if="item.selected && item.name.toLowerCase().indexOf(search) >= 0">
              <v-list-tile :key="item.id" avatar @click="extension(item)" v-bind:style="{ background: '#E2EAEC'}">
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs3 v-else-if="item.name.toLowerCase().indexOf(search) >= 0">
              <v-list-tile :key="item.id" avatar @click="extension(item)">
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </v-flex>
          </template>
        </v-layout>
      </v-list>
    </v-card>
    <v-card v-else>
      <v-list two-line dense class="pa-0">
        <v-layout row wrap>
          <template v-for="(item, index) in sortedExtensions">
            <v-flex xs3 v-if="item.selected">
              <v-list-tile :key="item.id" avatar @click="extension(item)" v-bind:style="{ background: '#E2EAEC'}">
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs3 v-else>
              <v-list-tile :key="item.id" avatar @click="extension(item)">
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.name"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider></v-divider>
            </v-flex>
          </template>
        </v-layout>
      </v-list>
    </v-card>
  </v-card>
</template>
<script>
  export default {
    name: 'Products',
    data () {
      return {
        open: [ true, true ],
        extensions: [
          { id: 1, name: 'be', selected: false },
          { id: 2, name: 'nl', selected: false },
          { id: 3, name: 'eu', selected: false },
          { id: 4, name: 'brussels', selected: false },
          { id: 5, name: 'gent', selected: false },
          { id: 6, name: 'vlaanderen', selected: false },
          { id: 7, name: 'com', selected: false },
          { id: 8, name: 'net', selected: false },
          { id: 9, name: 'org', selected: false },
          { id: 10, name: 'info', selected: false },
          { id: 11, name: 'biz', selected: false },
          { id: 12, name: 'fr', selected: false },
          { id: 13, name: 'es', selected: false },
          { id: 14, name: 'it', selected: false },
          { id: 15, name: 'de', selected: false },
          { id: 16, name: 'gr', selected: false },
          { id: 17, name: 'ch', selected: false },
          { id: 18, name: 'pt', selected: false },
          { id: 19, name: 'com.tr', selected: false },
          { id: 20, name: 'tr', selected: false },
          { id: 21, name: 'lu', selected: false },
          { id: 22, name: 'at', selected: false },
          { id: 23, name: 'no', selected: false },
          { id: 24, name: 'fi', selected: false },
          { id: 25, name: 'pl', selected: false },
          { id: 26, name: 'com.pl', selected: false },
          { id: 27, name: 'dk', selected: false },
          { id: 28, name: 'nu', selected: false },
          { id: 29, name: 'mobi', selected: false },
          { id: 30, name: 'tel', selected: false },
          { id: 31, name: 'com.al', selected: false },
          { id: 32, name: 'ad', selected: false },
          { id: 33, name: 'by', selected: false },
          { id: 34, name: 'ba', selected: false },
          { id: 35, name: 'bg', selected: false },
          { id: 36, name: 'com.cy', selected: false },
          { id: 37, name: 'ee', selected: false },
          { id: 38, name: 'co.ee', selected: false },
          { id: 39, name: 'fo', selected: false },
          { id: 40, name: 'gi', selected: false },
          { id: 41, name: 'com.gr', selected: false },
          { id: 42, name: 'hu', selected: false },
          { id: 43, name: 'co.hu', selected: false },
          { id: 44, name: 'ie', selected: false },
          { id: 45, name: 'je', selected: false },
          { id: 46, name: 'hr', selected: false },
          { id: 47, name: 'lv', selected: false },
          { id: 48, name: 'li', selected: false },
          { id: 49, name: 'lt', selected: false },
          { id: 50, name: 'cz', selected: false },
          { id: 51, name: 'co', selected: false },
          { id: 52, name: 'xxx', selected: false },
          { id: 53, name: 'asia', selected: false },
          { id: 54, name: 'jobs', selected: false },
          { id: 55, name: 'name', selected: false },
          { id: 56, name: 'pro', selected: false },
          { id: 57, name: 'travel', selected: false },
          { id: 58, name: 'me', selected: false },
          { id: 59, name: 'co.uk', selected: false },
          { id: 60, name: 'uk', selected: false },
          { id: 61, name: 'sx', selected: false },
          { id: 62, name: 'us', selected: false },
          { id: 63, name: 'test', selected: false },
          { id: 64, name: 'pw', selected: false },
          { id: 65, name: 'fm	,', selected: false },
          { id: 66, name: 'si', selected: false },
          { id: 67, name: 'sk', selected: false },
          { id: 68, name: 'se', selected: false },
          { id: 69, name: 'agency', selected: false },
          { id: 70, name: 'immo', selected: false },
          { id: 71, name: 'beer', selected: false },
          { id: 72, name: 'solutions', selected: false },
          { id: 73, name: 'now', selected: false },
          { id: 74, name: 'today', selected: false },
          { id: 75, name: 'energy', selected: false },
          { id: 76, name: 'events', selected: false },
          { id: 77, name: 'club', selected: false },
          { id: 78, name: 'promo', selected: false },
          { id: 79, name: 'gs', selected: false },
          { id: 80, name: 'online', selected: false },
          { id: 81, name: 'shop'	, selected: false },
          { id: 82, name: 'expert', selected: false },
          { id: 83, name: 'coach', selected: false },
          { id: 84, name: 'academy', selected: false },
          { id: 85, name: 'cat', selected: false },
          { id: 86, name: 'amsterdam', selected: false },
          { id: 87, name: 'rs', selected: false },
        ],
        durations: ['1 jaar', '5 jaar'],
        search: null,
        selectedExtensions: [],
        domain: '',
        icon: true,
        input: false,
      }
    },
    created () {
    },
    computed: {
      sortedExtensions: function() {
        return this.extensions.sort(this.compare);
      },
    },
    mounted () {

    },
    methods: {
      close() {
        this.$emit('close');
      },
      toggle() {
        this.input = true;
        this.icon = false;
      },
      untoggle() {
        this.input = false;
        this.icon = true;
      },
      extension(item) {
        let foundIndex = this.extensions.findIndex(x => x.id == item.id);
        if(item.selected) {
          item.selected = false;
          this.selectedExtensions = this.selectedExtensions.filter(function (ext) {
            return ext.id != item.id;
          });
        } else {
          item.selected = true;
          this.selectedExtensions.push(this.extensions[foundIndex]);
        }
        this.extensions[foundIndex] = item;
      },
      compare(a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if (a.name.toLowerCase() > b.name.toLowerCase()){ return 1; }
        return 0;
      },
    }
  }
</script>
<style scoped>
  .duur {
    max-width: 80px;
    margin-right: 20px;
   }
</style>
