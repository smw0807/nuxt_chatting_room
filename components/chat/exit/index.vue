<template>
  <div style="display: flex; justify-content: end;">
    <v-btn
      @click="exit"
      text
      >
      <v-icon>mdi-exit-to-app</v-icon>
       방 나가기
    </v-btn>
    <dial  ref="dialog"/>
  </div>
</template>

<script>
import dial from '@/components/cmn/dialog'
export default {
  components:{
    dial,
  },
  methods: {
    async exit() {
      const isExit = await this.$refs.dialog.open({
        mode: 'confirm',
        type: 'info',
        title: '채팅방 나가기',
        text: '현재 채팅방을 나가시겠습니까?'
      })
      if (isExit) {
        this.$emit('soekct-exit');
      }
    }
  }
}
</script>

<style>

</style>