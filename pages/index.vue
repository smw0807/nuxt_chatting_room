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
            <room-table />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
  
</template>

<script>
import createRoom from '@/components/create-room';
import roomTable from '@/components/room-list';
export default {
  components: {
    createRoom,
    roomTable,
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
    connectRoom() {
      if (!this.socket) {
        //채팅방 소켓 연결
        this.socket = this.$nuxtSocket({
          name: 'main',
          channel: '/room',
          persist: true,
          emitTimeout: 1000
        })
      }
      //방 리스트 가져오기
      this.socket.on('loadRoom', async () => {
        await this.$store.dispatch('room/list', {});
      })
    },
  }
}
</script>
