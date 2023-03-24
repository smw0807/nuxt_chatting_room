<template>
  <div>
    <template v-if="!user">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="accent"
            dark
            v-bind="attrs"
            v-on="on"
            small
          >
            들어가기
          </v-btn>
        </template>
        <span>{{msg}}</span>
      </v-tooltip>
    </template>
    <template v-else>
      <v-btn @click="join" small class="info">들어가기</v-btn>
    </template>
    <dial ref="dialog"/>
    <input-pass :roomPassword="roomInfo.password" ref="passChk" />
  </div>
</template>

<script>
import dial from '@/components/cmn/dialog';
import inputPass from './input-password';
export default {
  components: {
    dial,
    inputPass,
  },
  props: {
    roomInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      msg: '로그인 후 접속할 수 있습니다.'
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/info'];
    }
  },
  methods: {
    async join() {
      // 비밀번호가 있을 경우.
      if (this.roomInfo.password !== '') {
        const chk = await this.$refs.passChk.open();
        if (!chk) {
          await this.$refs.dialog.open({
            title: '방 접속 실패',
            text: '방 비밀번호와 일치하지 않습니다.'
          });
          return;
        }
      }
      this.$router.push(`/chat/${this.roomInfo._id}`);
    }
  }
}
</script>

<style>

</style>