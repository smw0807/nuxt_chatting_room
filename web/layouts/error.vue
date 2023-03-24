<template>
  <v-app dark>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm12 md12>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-alert border="right" colored-border type="error" elevation="2">
              <template v-if="error.statusCode === 404">
                <h1>{{ pageNotFound }}</h1>
              </template>
              <template v-else>
                <h1>{{ otherError }}</h1>
                <p>{{ msg }}</p>
              </template>
              <v-btn class="mt-2" color="error" link raised outlined :to="default_url"> <v-icon>mdi-home-variant-outline</v-icon> 메인으로 </v-btn>
              <v-btn class="mt-2" color="error" raised outlined @click="refresh"> <v-icon>mdi-refresh</v-icon> 새로고침 </v-btn>
            </v-alert>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      default_url: '/',
      msg: '',
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    this.msg = this.error.message;
    return {
      title
    }
  },
  methods: {
    refresh() {
      window.location.reload();
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
