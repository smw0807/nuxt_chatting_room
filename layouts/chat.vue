<template>
  <v-app dark>
    
    <v-app-bar
      fixed
      app
      clipped-left
      >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <profile />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import profile from '@/components/app-bar-right/profile';
export default {
  components: {
    profile,
  },
  computed: {
    title() {
      return this.$store.getters['chat/title'];
    },
    info() {
      return this.$store.getters['room/info'];
    },
  },
}
</script>

<style>

</style>