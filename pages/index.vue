<template>
  <v-layout column>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <v-card 
          class="mx-auto px-3" 
          outlined 
          max-width="1500"
          >
          <v-card-title>
            채팅방 목록
            <v-spacer/>
            <create-room />
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
  
</template>

<script>
import createRoom from '@/components/createRoom';
export default {
  components: {
    createRoom
  },
  name: 'IndexPage',
  created() {
    // this.api();
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
