<template>
  <div>
    <v-card>
      <v-card-text>
        <v-card 
          outlined
          :height="resize_height - 280"
          :max-height="resize_height - 280"
          >
          <v-card-text>
            <!--  -->
            
            <!--  -->
          </v-card-text>
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