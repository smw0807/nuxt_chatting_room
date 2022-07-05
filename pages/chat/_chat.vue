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
  asyncData({params}) {
    const _id = params.chat;
    console.log("_id : ", _id);
  },
  created() {
    console.log("created");
  },
  data() {
    return {
      socket: null,
    }
  },
  computed: {
    info() {
      return this.$store.getters['chat/info'];
    }
  },
  methods: {
    sendMsg(v) {
      console.log("sendMsg : ", v);
      //todo 여기서 이제 소켓 처리하기?
    }
  }
}
</script>

<style>

</style>