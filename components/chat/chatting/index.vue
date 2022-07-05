<template>
  <div>
    <v-card>
      <v-card-text>

        <v-card 
          outlined
          :height="resize_height - 220"
          >
          <v-card-text>
          </v-card-text>
        </v-card>
      </v-card-text>
      <v-card-text>
        <v-text-field
          rounded
          outlined
          hide-details
          v-model="message"
          append-icon="mdi-send"
          @keyup.enter="sendMessage"
          @click:append="sendMessage"
        ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { resize } from '@/mixins/resize';
export default {
  mixins: [
    resize
  ],
  data() {
    return {
      message: null,
      msg: [ // page 쪽에서 props로 받는 쪽으로 할까??
        { nickName: 'GkaRiss', massegs: 'ㅎㅇㅎㅇㅎㅇ' },
        { nickName: 'minu', massegs: 'ㅎㅇㅎㅇㅎㅇ' },
        { nickName: 'GkaRiss', massegs: 'ㅎㅇㅎㅇㅎㅇ' },
        { nickName: 'GkaRiss', massegs: 'ㅎㅇㅎㅇㅎㅇ' },
      ]
    }
  },
  computed:{
    user() {
      return this.$store.getters['user/info'];
    }
  },
  methods: {
    sendMessage() {
      this.$emit('send-message', this.message);
      this.message = null;
    }
  }
}
</script>

<style>

</style>