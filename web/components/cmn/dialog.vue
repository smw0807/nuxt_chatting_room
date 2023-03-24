<template>
  <v-overlay
    :value="is_show"
    z-index="110000"
    >
    <v-alert :type="type" border="right" colored-border>
      <v-row>
        <v-col cols="12">
          {{ title }}
        </v-col>
        <v-col cols="12" v-html="change(text)">
        </v-col>
      </v-row>
      <v-row >
        <v-col cols="12" align="end">
          <template v-if="mode === 'alert'">
            <v-btn
              :color="type"
              @click="ok"
              >
              확인
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              :color="type"
              @click="ok"
              >
              예
            </v-btn>
            <v-btn
              text
              outlined
              @click="cancel"
              >
              아니요
            </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-alert>
  </v-overlay>
</template>

<script>
export default {
  data() {
    return {
      is_show: false,
      mode: 'alert', // alert or confirm
      type: 'info', 
      title: '',
      text: '',
      result : undefined,
    }
  },
  mounted() {
    document.addEventListener('keydown', this.onKeyEvent);
  },
  methods:{
    onKeyEvent(e) {
      if (this.is_show) {
        let code = e.keyCode;
        if (code === 27) { //esc
          this.cancel();
        } else if (code === 13) { //enter
          this.ok();
        } else {
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },
    change(v) {
      return String(v).replace(/(?:\r\n|\r|\n)/g,"</br>");
    },
    open (options) {
      this.is_show = true;
      this.mode = options.mode ?? 'alert';
      this.type = options.type ?? 'info';
      this.title = options.title;
      this.text = options.text;
      return new Promise( (resolve, reject) => {
        this.result = resolve;
      })
    },
    ok() {
      this.is_show = false;
      this.result(true);
      this.removeEvent();
    },
    cancel() {
      this.is_show = false;
      this.result(false);
      this.removeEvent();
    },
    removeEvent(){
      document.removeEventListener('keydown', this.onKeyEvent);
    }
  }
}
</script>

<style>

</style>