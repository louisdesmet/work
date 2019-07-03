<template>
  <v-container mt-5>
    <v-layout row mt-5>
      <v-flex xs7 xl6 offset-xl1>
        <v-card flat class="logincard pa-4">
          <v-text-field required label="Email" type="email"
                        prepend-icon="person"
                        v-model="email">
          </v-text-field>
          <v-text-field required :label="$t('form.password')" type="password"
                        prepend-icon="lock"
                        v-model="password"
                        autocomplete="new-password">
          </v-text-field>
          <v-btn @click="login" block>Aanmelden</v-btn>
          <a @click="" class="vergeten">{{ $t("form.forgot_password") }}</a>
          <p class="greytext mt-3">{{ $t("login.intro") }}</p>
          <p class="greytext">{{ $t("login.under_intro") }}</p>
        </v-card>
      </v-flex>
      <v-flex xs4 offset-xs1>
        <img class="login-image" src="../assets/login.png">
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'Login',
    data: () => ({
      email: null,
      password: null
    }),
    methods: {
      login() {
        this.$api.post('/login', {
          email: this.email,
          password: this.password
        }).then(response => {
          if(response.data.status === 'error') {

          } else if(response.data.status === 'success') {
            localStorage.setItem('user', JSON.stringify(response.data));
            this.$store.commit('user', response.data);
            this.$router.push({path: '/'});
          }
        });
      }
    }
  }
</script>
<style scoped>
  .logincard {
    background: #E2EAEC !important;
    border-radius: 15px !important;
  }
  .greytext {
    color: #808080;
  }
  .vergeten {
    display: block;
    margin-top: 15px;
    text-decoration: none;
    color: #3083A7;

  }
  .login-image {

    width: 100%;
  }
</style>
