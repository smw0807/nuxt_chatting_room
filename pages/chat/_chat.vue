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
      receiveMsg: [], //받은 메세지
      users: [], //방에 접속 중인 사용자들 표시용
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
  watch: {
    users(v) {
      console.log('users : ' , v);
    }
  },
  methods: {
    async connectChat() {
      try {
        //벙 정보 가져오기
        await this.$store.dispatch('room/connection', {id: this.roomId});
        this.roomTitle = this.info.title;
      } catch (err) {
        console.error(err);
      }
      if (!this.socket) {
        //채팅 소켓 연결
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
      this.socket.on('users', (data) => {
        this.users.push(data);
      })
      this.join();
    },
    join() { //방 소켓 접속?
      this.users.push(this.user);
      this.socket.emit('join', { user: this.user, roomId: this.roomId});
    },
    exit() { //방 소켓 접속 해제
      //todo this.users 안에 데이터 삭제 해야함.
      this.socket.emit('exit', {user: this.user, roomId: this.roomId});
      this.$router.push('/');
    },
    async sendMsg(v) {
      this.receiveMsg.push({ user: this.user, roomId: this.roomId, message: v});
      this.socket.emit('sendMessage', { user: this.user, roomId: this.roomId, message: v});
    }
  }
}
</script>

<style>

</style>