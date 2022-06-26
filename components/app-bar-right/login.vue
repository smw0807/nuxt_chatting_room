<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="450px"
      >
      <template v-slot:activator="{on, attrs}">
        <v-btn
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
          outlined
          >
          로그인
        </v-btn>
      </template>
      <v-card class="elevation-12">
        <v-toolbar
          color="info"
          dark
          flat
          dense
        >
          <v-toolbar-title class="text-subtitle-1">채팅방에 참여하기 위해선 로그인이 필요합니다.</v-toolbar-title>
          <v-spacer/>
          <v-toolbar-items @click="dialog = !dialog">
            <v-icon>
              mdi-close
            </v-icon>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="mt-3 mb-0">
          <v-form @submit.prevent="submit" ref="form">
            <v-text-field
              v-model="email"
              @keyup.enter="submit"
              label="Email"
              name="email"
              prepend-icon="mdi-mail"
              type="text"
              :rules="emailRules"
              autocomplete="false"
            ></v-text-field>

            <v-text-field
              v-model="password"
              @keyup.enter="submit"
              id="password"
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              :rules="passwdRules"
              autocomplete="false"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <!-- todo 회원가입 컴포넌트 넣기 -->
          <signUp />
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">로그인</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import signUp from './sign-up';
export default {
  components: {
    signUp,
  },
  data() {
    return {
      dialog: false,
      email: null,
      password: null,
      emailRules: [],
      passwdRules: [],
    }
  },
  methods: {
    submit() {
      console.log('submit');
    }
  }
}
</script>

<style>

</style>