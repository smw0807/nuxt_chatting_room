<template>
  <v-app dark>
    
    <v-app-bar
      fixed
      app
      clipped-left
      >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-divider vertical/>
      <exit />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import exit from '@/components/chat/exit';
export default {
  components: {
    exit,
  },
  data() {
    return {

    }
  },
  computed: {
    title() {
      return this.$store.getters['chat/title'];
    }
  }
}
</script>

<style>

</style>