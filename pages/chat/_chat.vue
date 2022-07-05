<template>
  <div>
    <!-- 채팅방 왼쪽 방 참여자 목록 -->
    <users /> 
    <!-- 채팅방 오른쪽 채팅 -->
    <chatting @send-message="sendMsg"/>
  </div>
</template>

<script>
import users from '@/components/chat/users';
import chatting from '@/components/chat/chatting';
export default {
  layout: 'chat',
  components: {
    users,
    chatting,
  },
  // asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
    
  // },
  async asyncData({params, store}) {
    const _id = params.chat;
    console.log("_id : ", _id);
    try {
      await store.dispatch('room/connection', {id: _id});
    } catch (err) {

    }
  },
  created() {
    console.log("created");
    this.connectChat();
  },
  data() {
    return {
      test: 'test',
      socket: null,
    }
  },
  computed: {
    info() {
      return this.$store.getters['chat/info'];
    }
  },
  methods: {
    connectChat() {
      this.socket = this.$nuxtSocket({
        name: 'main',
        channel: '/chat',
        persist: true,
        emitTimeout: 1000
      });
    },
    sendMsg(v) {
      console.log("sendMsg : ", v);
      //todo 여기서 이제 소켓 처리하기?
    }
  }
}
</script>

<style>

</style>