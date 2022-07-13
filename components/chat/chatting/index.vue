<template>
  <div>
    <v-card>
      <v-card-text>
        <v-card 
          class="overflow-y-auto"
          outlined
          :height="resize_height - 280"
          :max-height="resize_height - 280"
          >
          <template v-for="(data, idx) of message">
            <!-- 시스템 메세지 -->
            <v-card-text align="center" v-if="data.type === 'system'" :key="idx">
              <v-alert
                color="cyan"
                border="left"
                elevation="2"
                outlined
                dense
                >
                {{data.message}}
              </v-alert>
            </v-card-text>

            <!-- 사용자 메세지 -->
            <message 
              v-else-if="data.type === 'user'"
              :type="data.user.nickName === user.nickName ? 'mine' : 'other'"
              :nickName="data.user.nickName"
              :image="data.user.image"
              :message="data.message" 
              :key="idx"/>
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
  watch: {
    message(v) {
      console.log('watch message : ', v);
    }
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