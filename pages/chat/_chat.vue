<template>
  <div>
    <!-- 접속중인 사용자 정보  -->
    <users /> 

    <!-- 방 나가기 버튼 -->
    <v-row>
      <v-col cols="12">
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
  },
  async mounted() {
    await this.connectChat();
  },
  destroyed() {
    this.socket = null;
    this.$store.commit('chat/users', []);
  },
  data() {
    return {
      socket: null,
      roomId: null,
      receiveMsg: [], //받은 메세지
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
        //받은 메세지
        this.receiveMsg.push(data);
      });

      // 이미 방에 접속 중인 사람들은 이걸로 최신 접속자 정보를 받음
      this.socket.on('chatUsers', (data) => {
        this.$store.commit('chat/users', data);
      })
      
      try {
        //벙 정보 가져오기
        const rs = await this.$store.dispatch('room/connection', {id: this.roomId});
        if (rs.data.ok) {
          this.$store.commit('room/info', rs.data.result);
          this.$store.commit('chat/title', rs.data.result.title || '');
          this.join();//방 사람들에게 입장 메세지 보냄
          if (this.$store.getters['chat/users'].length === 0) {
            await this.chatUsers();
          }
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
    async chatUsers() {
      try {
        const rs = await this.$store.dispatch('chat/users', { user: this.user, roomId: this.roomId});
        if (!rs.data.ok) {
          await this.$refs.dialog.open({
            mode: 'alert',
            type: 'error',
            title: '현재 접속자 정보 가져오기 실패',
            text: rs.data.msg
          })
        }
      } catch (err) {
        await this.$refs.dialog.open({
          mode: 'alert',
          type: 'error',
          title: '현재 접속자 정보 가져오기 실패',
          text: err.message
        })
      }
    },
    join() { //방 소켓 접속?
      this.socket.emit('join', { user: this.user, roomId: this.roomId});
    },
    exit() { //방 소켓 접속 해제
      this.socket.emit('exit', {user: this.user, roomId: this.roomId});
      this.$router.push('/');
    },
    async sendMsg(v) {
      // 내가 입력한 메세지는 다이렉트로 푸시(내 화면에 표시하기 위해)
      this.receiveMsg.push({type: 'user', user: this.user, roomId: this.roomId, message: v});
      // 같은 방 접속자들에게 메세지 보내기.
      this.socket.emit('sendMessage', { user: this.user, roomId: this.roomId, message: v});
    },
  }
}
</script>

<style>

</style>