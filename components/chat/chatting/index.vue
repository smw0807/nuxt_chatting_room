<template>
  <div>
    <v-card>
      <v-card-text>
        <v-card 
          id="msgCard"
          class="overflow-y-auto"
          outlined
          :height="resize_height - 250"
          :max-height="resize_height - 250"
          >
          <template v-for="(data, idx) of message">
            <!-- 사용자 메세지 -->
            <message 
              v-if="data.type === 'user'"
              :type="data.user.nickName === user.nickName ? 'mine' : 'other'"
              :nickName="data.user.nickName"
              :image="data.user.image"
              :message="data.message" 
              :key="idx"
              />

            <!-- 시스템 메세지 -->
            <v-card-text v-else align="center"  :key="idx">
              <v-alert
                :color="data.type === 'system-in' ? 'cyan' : 'amber'"
                border="left"
                elevation="2"
                outlined
                dense
                >
                {{data.message}}
              </v-alert>
            </v-card-text>
          </template>
        </v-card>
      </v-card-text>
      <v-card-text>
        <v-text-field
          rounded
          outlined
          hide-details
          v-model="inputMsg"
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
import message from './message';
export default {
  mixins: [
    resize
  ],
  components: {
    message
  },
  props: {
    message: {
      type: Array
    }
  },
  data() {
    return {
      inputMsg: null,
    }
  },
  updated() {
    const msgCard = document.getElementById('msgCard');
    msgCard.scrollTo({top: msgCard.scrollHeight, behavior: 'smooth' });
  },
  computed:{
    user() {
      return this.$store.getters['user/info'];
    }
  },
  methods: {
    sendMessage() {
      if (this.inputMsg) {
        this.$emit('send-message', this.inputMsg);
        this.inputMsg = null;
      }
    }
  }
}
</script>

<style>

</style>