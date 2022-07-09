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
  </div>
</template>

<script>
import dial from '@/components/cmn/dialog';
export default {
  components: {
    dial
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
    join() {
      this.$router.push(`/chat/${this.roomInfo._id}`);
    }
  }
}
</script>

<style>

</style>