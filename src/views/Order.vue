<template>
    <div>
        <v-container>
            <v-card class="pa-5">
                <v-layout row>
                    <v-flex xs8 >
                        <h2 v-if="product_clone.id !== 27 && product_clone.id !== 12" class="title mb-4">{{ product_clone.name }}</h2>
                        <div v-html="product_clone.description"> </div>
                    </v-flex>
                    <v-flex xs4>
                        <img  v-if="product_clone.id !== 27 && product_clone.id !== 12" class="product-image" :src="asset(product_clone.image)">
                    </v-flex>
                </v-layout>
                <Esd :product_clone="product_clone" v-if="esd(product_clone.id)"/>
                <CloudServer :product_clone="product_clone" v-if="product_clone.id === 28"/>
                <WebHosting :product_clone="product_clone" v-if="product_clone.id === 29"/>
                <Flexishop :product_clone="product_clone" v-if="product_clone.id === 32"/>
                <Ssl :product_clone="product_clone" v-if="isSsl"/>
                <Office365 :product_clone="product_clone" v-if="isOffice"/>
                <Nomadesk :product_clone="product_clone" v-if="product_clone.id === 11"/>
                <div v-if="product_clone.id === 12">
                    <img class="mb-3" :src="asset('backup.jpg')">
                    <a href="https://www.solarwindsmsp.com/products/backup-recovery/cloud-management-console" target="_blank">Download Cloud Management Console software</a>
                    <p class="mt-3">Voor de Cloud Management Console heeft u aparte logingegevens nodig. U kan deze aanvragen via e-mail.</p>
                    <p>Alle prijsinformatie vindt u in de <a href="http://www.cloudhighway.be/prijslijst/cloudhighwaypartnerprijslijst.pdf" target="_blank">Cloudhighway Partner Prijslijst</a>.</p>
                    <p class="mt-5">Cloudhighway Backup is gebaseerd op onderliggende technologie van IASO en biedt u een centrale Cloud Management Console waar u uw klanten kan aanmaken, beheren en opvolgen.</p>
                    <ul>
                        <li>Er is geen opstartkost.</li>
                        <li>Er is geen licentiekost. U betaalt geen vaste kost per server of workstation. Alle plugins zijn gratis.</li>
                        <li>Er is ongelimiteerde opslagruimte voorzien, u betaalt enkel uw verbruik: we rekenen het totaal aantal gigabytes van de geselecteerde mappen en bestanden aan.</li>
                        <li>Er is ongelimiteerde retentie voorzien. U kan steeds teruggaan naar alle vorige versies.</li>
                        <li>De data wordt steeds geencrypteerd bewaard. U kiest zelf uw encryptiepaswoord. Noch Cloudhighway, noch IASO hebben toegang tot uw gegevens. Vergeet uw paswoord niet, dit is nodig om de data terug te halen.</li>
                        <li>We werken met true delta block-level backup. Bij een backup wordt gekeken welke bestanden nieuw zijn tegenover de vorige backup, en enkel deze bestanden worden doorgestuurd. Bij bestanden die gewijzigd zijn, is het systeem intelligent genoeg om enkel de gewijzigde stukken door te sturen, en dus niet het volledige bestand. Zeer handig bij grote bestanden.</li>
                        <li>De backupsoftware, die zowel op servers als op clients werkt, is zeer licht en is puur een op de achtergrond draaiende service die u kan configureren in een webbrowser (http://localhost:5000).</li>
                        <li>U kan een local speed vault voorzien die een copy van de back-up wegschrijft naar een lokaal apparaat zoals een NAS. Deze optie (zonder meerkost) is zeer handig wanneer de klant zijn data ook intern wil backuppen.</li>
                    </ul>
                </div>

                <div class="py-5" v-if="product_clone.id === 10">
                    <h2 class="mb-3">Uw tenantdomein invoeren</h2>
                    <p>Voor we kunnen beginnen met het toevoegen van licenties, moeten we verifiëren dat uw tenant toegang heeft tot Education licenties. Gelieve in het invoer veld hieronder uw primaire domeinnaam in te geven. Deze is meestal gelijk aan het laatste deel van de email adresen van de gebruikers: gebruiker@school.be.</p>
                    <v-text-field :counter="25" label="Persoonlijk voorvoegsel" required suffix=".onmicrosoft.com"></v-text-field>
                    <v-btn dark class="mx-0" color="#3083A7">Controleer domein</v-btn>
                </div>

                <template v-if="product_clone.id === 27">
                    <img class="logo" src="@/assets/skyhiheader.jpg">
                    <p>Voor het SkyHi portaal heeft u aparte logingegevens nodig.</p>
                    <p>U kan deze aanvragen via e-mail.</p>
                    <p>Alle prijsinformatie vindt u in de Cloudhighway Partner Prijslijst.</p>
                    <p>Download hier de SkyHi Quotation Tool.</p>
                    <p>SkyHi, dat is VOIP in de cloud uitgewerkt in een voordelig resellermodel met 3 commissiemodellen en genereuze marges.</p>
                    <h2>Resellerportaal met super-gebruiksvriendelijke webinterface</h2>
                    <p>Als SkyHi verdeler krijgt u toegang tot uw persoonlijke reseller portal, waar u al uw klanten kan beheren. Dat beheren zelf is zeer makkelijk dankzij de eenvoudige drag&drop interface - nog nooit was het zo simpel om een telefooncentrale in te stellen.</p>
                    <h2>Commercieel op punt</h2>
                    <p>SkyHi biedt u diverse tools om u te helpen bij het verkopen, zoals onze Quotation Tool waarmee u moeiteloos een offerte kunt maken. U kan kiezen uit 3 verschillende commissiemodellen met verschillende marges, zodat u per klant kunt bekijken hoe u zich positioneert. Ook vergelijken met de factuur van de huidige operator wordt heel makkelijk gemaakt. Onze prijsstructuur is bewust eenvoudig, duidelijk en transparant gehouden. Onze SkyHi-mensen ondersteunen u en gaan desgewenst graag mee op klantenbezoek!</p>
                    <h2>Technisch op punt</h2>
                    <p>SkyHi is een volwassen platform dat zich reeds bewezen heeft in de huidige VOIP markt. Het enige dat u nodig heeft, is een degelijke internetverbinding (dwz 100kbps per gelijktijdig telefoongesprek, geen vast publiek IP adres nodig) en natuurlijk SIP telefoons. Zowat alle SIP telefoons zijn compatibel (oudere hebben vaak een firmware update nodig) maar zelf werken we meestal met Yealink en Gigaset Pro.</p>
                    <h2>En natuurlijk alle voordelen van VOIP in de cloud!</h2>
                    <p>- Geen geknoei meer met VPN verbindingen tussen locaties - u belt gewoon vanaf elke locatie ter wereld via een binnenlijn gratis naar elkaar, via het internet.</p>
                    <p>- Verhuizen? Neem uw telefoons mee, steek de netwerkkabel erin, en klaar.</p>
                    <p>- Panne aan uw internetverbinding? Met een klassieke VOIP centrale heeft u een probleem. Met SkyHi logt u via uw smartphone of tablet (via 3G) in op de web interface en forward u de lijnen naar een GSM. Klaar!</p>
                    <p>- Geen grote initiele investering voor een centrale - de opstartkost beperkt zich tot eventuele aanschaf van telefoontoestellen (indien er nog geen SIP toestellen voorhanden zijn).</p>
                </template>

                <template v-if="product_clone.id === 30 || product_clone.id === 31">
                    <img class="nanosite" src="../assets/nanosite.png">
                    <h3 class="mt-5">Controleer domeinnaam</h3>
                    <p>Vul uw domeinnaam in en kies één of meer extensies (tld). Druk daarna op "Opzoeken". Na enkele seconden ziet u welke domeinnamen beschikbaar zijn voor registratie.</p>
                    <v-text-field v-model="domain" prefix="www." suffix="." class="domain" placeholder="domain"></v-text-field>
                    <v-autocomplete
                            v-model="ext"
                            :items="exts"
                            clearable
                            item-text="name"
                            label="extension"
                            class="ext"
                    >
                    </v-autocomplete>
                    <v-btn block>Controleer Beschikbaarheid</v-btn>
                </template>
            </v-card>
        </v-container>
    </div>
</template>
<script>
    import { includes } from "lodash";
    import Office365 from '@/components/order/Office365';
    import CloudServer from '@/components/order/CloudServer';
    import WebHosting from '@/components/order/WebHosting';
    import Flexishop from '@/components/order/Flexishop';
    import Esd from '@/components/order/Esd';
    import Nomadesk from '@/components/order/Nomadesk';
    import Ssl from '@/components/order/Ssl';
    import Domains from '@/components/Domains';
    export default {
        data: () => ({
            exts: [
                { id: 1, name: 'be' },
                { id: 2, name: 'nl' },
                { id: 3, name: 'eu' },
                { id: 4, name: 'brussels' },
                { id: 5, name: 'gent' },
                { id: 6, name: 'vlaanderen' },
                { id: 7, name: 'com' },
                { id: 8, name: 'net' },
                { id: 9, name: 'org' },
                { id: 10, name: 'info' },
                { id: 11, name: 'biz' },
                { id: 12, name: 'fr' },
                { id: 13, name: 'es' },
                { id: 14, name: 'it' },
                { id: 15, name: 'de' },
                { id: 16, name: 'gr' },
                { id: 17, name: 'ch' },
                { id: 18, name: 'pt' },
                { id: 19, name: 'com.tr' },
                { id: 20, name: 'tr' },
                { id: 21, name: 'lu' },
                { id: 22, name: 'at' },
                { id: 23, name: 'no' },
                { id: 24, name: 'fi' },
                { id: 25, name: 'pl' },
                { id: 26, name: 'com.pl' },
                { id: 27, name: 'dk' },
                { id: 28, name: 'nu' },
                { id: 29, name: 'mobi' },
                { id: 30, name: 'tel' },
                { id: 31, name: 'com.al' },
                { id: 32, name: 'ad' },
                { id: 33, name: 'by' },
                { id: 34, name: 'ba' },
                { id: 35, name: 'bg' },
                { id: 36, name: 'com.cy' },
                { id: 37, name: 'ee' },
                { id: 38, name: 'co.ee' },
                { id: 39, name: 'fo' },
                { id: 40, name: 'gi' },
                { id: 41, name: 'com.gr' },
                { id: 42, name: 'hu' },
                { id: 43, name: 'co.hu' },
                { id: 44, name: 'ie' },
                { id: 45, name: 'je' },
                { id: 46, name: 'hr' },
                { id: 47, name: 'lv' },
                { id: 48, name: 'li' },
                { id: 49, name: 'lt' },
                { id: 50, name: 'cz' },
                { id: 51, name: 'co' },
                { id: 52, name: 'xxx' },
                { id: 53, name: 'asia' },
                { id: 54, name: 'jobs' },
                { id: 55, name: 'name' },
                { id: 56, name: 'pro' },
                { id: 57, name: 'travel' },
                { id: 58, name: 'me' },
                { id: 59, name: 'co.uk' },
                { id: 60, name: 'uk' },
                { id: 61, name: 'sx' },
                { id: 62, name: 'us' },
                { id: 63, name: 'test' },
                { id: 64, name: 'pw' },
                { id: 65, name: 'fm	,' },
                { id: 66, name: 'si' },
                { id: 67, name: 'sk' },
                { id: 68, name: 'se' },
                { id: 69, name: 'agency' },
                { id: 70, name: 'immo' },
                { id: 71, name: 'beer' },
                { id: 72, name: 'solutions' },
                { id: 73, name: 'now' },
                { id: 74, name: 'today' },
                { id: 75, name: 'energy' },
                { id: 76, name: 'events' },
                { id: 77, name: 'club' },
                { id: 78, name: 'promo' },
                { id: 79, name: 'gs' },
                { id: 80, name: 'online' },
                { id: 81, name: 'shop'	 },
                { id: 82, name: 'expert' },
                { id: 83, name: 'coach' },
                { id: 84, name: 'academy' },
                { id: 85, name: 'cat' },
                { id: 86, name: 'amsterdam' },
                { id: 87, name: 'rs' },
            ],
            ext: null,
            domain: null,
        }),
        components: {
            Office365,
            CloudServer,
            WebHosting,
            Flexishop,
            Esd,
            Ssl,
            Domains,
            Nomadesk
        },
        props: ['product'],
        computed: {
            product_clone() {
                if (typeof this.product !== 'undefined') {
                    localStorage.setItem('product_clone', JSON.stringify(this.product));
                    return this.product;
                } else {
                    return JSON.parse(localStorage.getItem('product_clone'));
                }
            },
            isSsl() { return _.includes([24, 25, 26], this.product_clone.id) },
            isOffice() { return _.includes([7, 8, 9], this.product_clone.id) },
        },
        created() {
            if(_.includes([35, 36, 37, 38, 39, 40, 41, 42], this.product_clone.id)) {
                this.$router.push({ name: 'cart', params: { product: this.product }})
            }
        },
        methods: {
            esd(id) {
                if(_.includes([1, 2, 3, 4, 5, 6, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], id)) {
                    return true;
                }
                return false;
            },
            asset(image) {
                return require('@/assets/'+image);
            }
        }
    }
</script>
<style scoped>
    .title {
        font-size: 2em!important;
    }
    .product-image {
        width: 70%;
        margin: 0 auto;
        display: block;
    }
    .nanosite {
        width: 85%;
        margin: 0 auto;
        display: block;
    }
    .domain, .ext {
        display: inline-block;
        width:50%;
    }
</style>
