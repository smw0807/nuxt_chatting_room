<template>
  <v-app dark>
    
    <v-app-bar
      fixed
      app
      >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template v-if="userInfo">
        <profile />
      </template>
      <template v-else>
        <login />
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import login from '@/components/app-bar-right/login';
import profile from '@/components/app-bar-right/profile';
export default {
  name: 'DefaultLayout',
  components: {
    login, profile
  },
  data () {
    return {
      title: 'Nuxt Chat'
    }
  },
  computed: {
    userInfo() {
      return this.$store.getters['user/info'];
    }
  },
  async created() {
    console.log('user info : ', this.userInfo);
    await this.$store.dispatch('initSockeIO');
    // this.setSocket();
  },
  methods: {
    async setSocket() {
      try {
        const rs = await this.$axios.get('/sio/init');
        console.log('setSocket : ', rs);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>
