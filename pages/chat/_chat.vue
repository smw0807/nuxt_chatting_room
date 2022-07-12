<template>
  <div>
    <!-- 접속중인 사용자 정보  -->
    <users :users="users" /> 

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

    <dial ref="dialog" />
  </div>
</template>

<script>
import users from '@/components/chat/users';
import chatting from '@/components/chat/chatting';
import exit from '@/components/chat/exit';
import dial from '@/components/cmn/dialog';
export default {
  layout: 'chat',
  components: {
    users,
    chatting,
    exit,
    dial
  },
  async created() {
    this.roomId = this.$route.params.chat;
    await this.connectChat();
  },
  async mounted() {
  },
  destroyed() {
    console.log('destroyed');
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
  methods: {
    async connectChat() {
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
      //접속하는 방에 접속자 정보 넣기
      this.socket.on('users', (data) => {
        this.connectedPerson(data);
      })
      
      try {
        //벙 정보 가져오기
        const rs = await this.$store.dispatch('room/connection', {id: this.roomId});
        if (rs.data.ok) {
          this.$store.commit('room/info', rs.data.result);
          this.roomTitle = this.info.title;
          this.join();
        } else {
          if (rs.data.msg === 'max') {
            await this.$refs.dialog.open({
              mode: 'alert',
              type: 'warning',
              title: '방 접속 불가',
              text: rs.data.result
            })
          } else {
            await this.$refs.dialog.open({
              mode: 'alert',
              type: 'error',
              title: '방 접속 실패',
              text: rs.data.msg
            })
          }
          this.$router.push('/');
        }
      } catch (err) {
        console.error(err);
      }
    },
    join() { //방 소켓 접속?
      this.connectedPerson(this.user);
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
    },
    connectedPerson(v) { //방 접속자 넣기
      const hasUser = this.users.find( x => x.nickName == v.nickName);
      if (!hasUser) this.users.push(v);
    }
  }
}
</script>

<style>

</style>