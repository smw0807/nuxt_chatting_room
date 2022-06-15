<template>
  <v-layout column>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        ㅇㅇ
      </v-col>
    </v-row>
  </v-layout>
  
</template>

<script>
export default {
  name: 'IndexPage',
  created() {
    this.api();
  },
  methods: {
    async api() {
      try {
        const rs = await this.$axios.post('/api/test');
        // console.log(rs);
      } catch (err) {
        console.error(err);
      }
    }
  }
}
</script>
