<template>
  <div>
    <!-- 접속중인 사용자 정보  -->
    <users /> 

    <!-- 방 제목 및 방 나가기 버튼 -->
    <v-row>
      <v-col cols="9">
        <span class="text-h4">{{roomTitle}}</span>
      </v-col>
      <v-col cols="3">
        <exit @soekct-exit="exit"/>
      </v-col>
    </v-row>

    <!-- 채팅 메시지 관련 -->
    <chatting :message="receiveMsg" @send-message="sendMsg"/>
  </div>
</template>

<script>
import users from '@/components/chat/users';
import chatting from '@/components/chat/chatting';
import exit from '@/components/chat/exit';
export default {
  layout: 'chat',
  components: {
    users,
    chatting,
    exit
  },
  async created() {
    this.roomId = this.$route.params.chat;
    await this.connectChat();
  },
  async mounted() {
  },
  destroyed() {
    this.socket = null;
  },
  data() {
    return {
      roomTitle: '',
      socket: null,
      roomId: null,
      receiveMsg: [],
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/info'];
    },
    info() {
      return this.$store.getters['room/info'];
    }
  },
  methods: {
    async connectChat() {
      try {
        await this.$store.dispatch('room/connection', {id: this.roomId});
        this.roomTitle = this.info.title;
      } catch (err) {
        console.error(err);
      }
      if (!this.socket) {
        this.socket = this.$nuxtSocket({
          name: 'main',
          channel: '/chat',
          persist: true,
          emitTimeout: 1000
        });
      }
      this.socket.on('message', (data) => {
        this.receiveMsg.push(data);
      });
      this.join();
    },
    join() { //방 소켓 접속?
      this.socket.emit('join', { user: this.user, roomId: this.roomId});
    },
    exit() { //방 소켓 접속 해제
      this.socket.emit('exit', {user: this.user, roomId: this.roomId});
      this.$router.push('/');
    },
    async sendMsg(v) {
      this.receiveMsg.push({ user: this.user, roomId: this.roomId, msg: v});
      this.socket.emit('sendMessage', { user: this.user, roomId: this.roomId, msg: v});
    }
  }
}
</script>

<style>

</style>