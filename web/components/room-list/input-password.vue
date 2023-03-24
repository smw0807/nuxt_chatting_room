<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="300"
    >
    <v-card>
      <v-toolbar
        color="info"
        dark
        flat
        dense
        >
        <v-toolbar-title class="text-subtitle-1 black--text">방 비밀번호를 입력해주세오.</v-toolbar-title>
        <v-spacer/>
        <v-toolbar-items @click="dialog = !dialog">
          <v-icon>
            mdi-close
          </v-icon>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          v-model="password"
          prepend-icon="mdi-lock"
          hide-details
          ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="join">확인</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * 비밀방 접속 시 패스워드 입력 컴포넌트
 */
export default {
  props: {
    roomPassword: {
      type: String
    }
  },
  data() {
    return {
      dialog: false,
      password: null,
      result: null,
    }
  },
  methods: {
    open() {
      this.dialog = true;
      return new Promise( (resolve, reject) => {
        this.result = resolve;
      })
    },
    join() {
      if (this.roomPassword === this.password) {
        this.result(true);
      } else {
        this.result(false);
      }
      this.password = null;
      this.dialog = false;
    }
  }
}
</script>

<style>

</style>