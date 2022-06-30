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
              v-model="form.email"
              :rules="rules.email"
              @keyup.enter="submit"
              label="이메일"
              prepend-icon="mdi-mail"
              type="text"
              autocomplete="false"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :rules="rules.password"
              @keyup.enter="submit"
              label="비밀번호"
              prepend-icon="mdi-lock"
              type="password"
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
      <dial ref="dialog"/>
    </v-dialog>
  </div>
</template>

<script>
import dial from '@/components/cmn/dialog';
import signUp from './sign-up';
export default {
  components: {
    signUp,
    dial,
  },
  data() {
    return {
      dialog: false,

      form: { // 입력 폼 데이터 바인딩
        //이메일
        email: null,
        //비밀번호
        password: null,
      },

      rules: {
        email: [ v => this.fnRules().email(v ?? '') ],
        password: [ v => this.fnRules().password(v ?? '') ],
      },

    }
  },
  methods: {
    fnRules() {
      return {
        email: (v) => {
          if (v === '') {
            return '이메일을 입력해주시기 바랍니다.'
          }
          if (!v.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g)) {
            return '이메일 형식이 올바르지 않습니다.'
          }
          return true;
        },
        password: (v) => {
          if ('') {
            return '비밀번호를 입력해주시기 바랍니다.';
          }
          return true;
        },
      }
    },
    async submit() {
      console.log('submit');
      try {
        if (!this.$refs.form.validate()) return;

        const rs = await this.$store.dispatch('user/signin', this.form);
        if (!rs.data.ok) {
          await this.$refs.dialog.open({
            mode: 'alert',
            type: 'warning',
            title: '로그인 실패',
            text: rs.data.msg
          })
        } else {
          this.dialog = false;
        }
      } catch (err) {
        console.error('login fail...', err);
        await this.$refs.dialog.open({
          mode: 'alert',
          type: 'error',
          title: '로그인 실패',
          text: err
        })
      }
    }
  }
}
</script>

<style>

</style>