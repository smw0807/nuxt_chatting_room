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
  methods: {
  }
}
</script>

<style>
  /* ====== 스크롤바 CSS ====== */
/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

</style>
