<template>
  <v-container>
    <v-text-field required label="Email" type="email"
                  prepend-icon="person"
                  v-model="email">
    </v-text-field>
    <v-text-field required label="password" type="password"
                  prepend-icon="lock"
                  v-model="password"
                  autocomplete="new-password">
    </v-text-field>
    <v-btn @click="login" block>Aanmelden</v-btn>
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
