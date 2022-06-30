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
            <createRoom v-show="userInfo" />
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-btn @click="api">API테스트</v-btn>
            <!-- <v-btn @click="go">웹소켓테스트</v-btn> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
  
</template>

<script>
import createRoom from '@/components/create-room';
export default {
  components: {
    createRoom
  },
  name: 'IndexPage',
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
    this.connectRoom();
  },
  computed: {
    userInfo() {
      return this.$store.getters['user/info'];
    }
  },
  methods: {
    async api() {
      try {
        await this.$axios.post('/api/test');
      } catch(err) {
        console.error(err);
      }
    },
    connectRoom() {
      if (!this.socket) {
        this.socket = this.$nuxtSocket({
          name: 'main',
          channel: '/room',
          persist: true,
          emitTimeout: 1000
        })
      }
      this.socket.on('go', (data) => {
        console.log('go', data);
        this.socket.emit('gg', 'hihihihihi');
      })
    },
    // go() {
    //   console.log("dd");
    //   console.log(this.socket);
    //   this.socket.emit('gg', 'kkkkk');
    // }
  }
}
</script>
