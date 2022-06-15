<template>
  <v-app dark>
    
    <v-app-bar
      fixed
      app
      >
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      title: 'Nuxt 채팅 웹 사이트'
    }
  }
}
</script>
