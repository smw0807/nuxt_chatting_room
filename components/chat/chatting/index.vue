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
            <v-card-text align="center" v-if="data.type === 'system'" :key="idx">
              <v-alert
                color="cyan"
                border="left"
                elevation="2"
                outlined
                >
                {{data.message}}
              </v-alert>
            </v-card-text>
            <v-card-text align="left" v-else-if="data.user !== user.nickName" :key="idx">
              {{data.message}}
            </v-card-text>
            <v-card-text align="left" v-else-if="data.user === user.nickName" :key="idx">
              {{data.message}}
            </v-card-text>
          </template>
          
          <!-- <v-card-text class="d-flex flex-row deep-purple " style="width: 200px;">
            abc
          </v-card-text>
          <v-card-text class="d-flex flex-row-reverse mt-1 black--text light-blue lighten-5" style="width: 200px">
            def
          </v-card-text>
          <v-card-text class="d-flex flex-row deep-purple " style="width: 200px;">
            hij
          </v-card-text> -->
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
export default {
  mixins: [
    resize
  ],
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