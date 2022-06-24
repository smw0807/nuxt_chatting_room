<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="550px"
      >
      <template v-slot:activator="{on, attrs}">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          outlined
          >
          회원가입
        </v-btn>
      </template>
      <v-card class="elevation-12">
        <v-toolbar
          color="info"
          dark
          flat
          dense
          >
          <v-toolbar-title class="text-subtitle-1 black--text">회원가입</v-toolbar-title>
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
              label="이메일"
              prepend-icon="mdi-mail"
              type="text"
              autocomplete="false"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :rules="rules.password"
              label="비밀빈호"
              prepend-icon="mdi-lock"
              type="password"
              autocomplete="false"
              clearable
            ></v-text-field>
              <!-- messages="8~16자의 영문 대소문자, 숫자, 특수문자( !,@,#,$,%,^,&,* )만 사용 가능합니다."
              :error-messages="rules.password" -->

            <v-text-field
              v-model="form.confirmPassword"
              label="비밀번호 확인"
              prepend-icon="mdi-lock-check"
              type="password"
              autocomplete="false"
            ></v-text-field>

            <v-text-field
              v-model="form.name"
              label="이름"
              prepend-icon="mdi-account"
              type="text"
              autocomplete="false"
            ></v-text-field>

            <v-text-field
              v-model="form.nickName"
              label="닉네임"
              prepend-icon="mdi-account-circle"
              type="text"
              autocomplete="false"
            ></v-text-field>

            <v-file-input
              v-model="form.image"
              :rules="rules.avatar"
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              label="프로필 이미지"
            ></v-file-input>

            <v-textarea
              counter="200"
              label="자기소개"
              :rules="rules.desc"
              v-model="form.desc"
              outlined
              >
            </v-textarea>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn color="accent" @click="refresh">초기화</v-btn> -->
          <v-btn color="accent" @click="$refs.form.reset()">초기화</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">가입하기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      form: { // 입력 폼 데이터 바인딩
        email: null,
        password: null,
        confirmPassword: null,
        name: null,
        nickName: null,
        image: null,
        desc: null
      },

      rules: { // 입력 폼 유효성 체크
        email: [ v => this.fnRules().email(v ?? '') ],
        password: [ v => this.fnRules().password(v ?? '') ],
        avatar : [
          v => !v || v.size < 2000000 || 'Avatar size should be less than 2 MB!',
        ],
        desc: [
          v => !v || v.length <= 200 || 'Max 20 characters'
        ]
      }
      
    }
  },
  methods: {
    fnRules() {
      return {
        email: (v) => {
          if (!v.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g)) {
            return '이메일 형식이 올바르지 않습니다.'
          }
          return true;
        },
        password: (v) => {
          // console.log(v);
          if (v.match(/[\s]/g)) {
            return '패스워드에 공백을 사용하실 수 없습니다.';
          }
          // if (v.length < 8 || v.length > 16) {
          //   return '패스워드는 최소 8자리 최대 16자리로 만들어야 합니다.'
          // }
          // if (v.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/)) {
          console.log(v.match(/^(?=.*[a-zA-Z\d!@#$%^&*-]).{8,16}$/g));
          if (!v.match(/^(?=.*[a-zA-Z\d!@#$%^&*-]).{8,16}$/g)) {
            return '패스워드는 영문 대소문자, 숫자, 특수문자 !@#$%^&*- 의 조합만 가능합니다. ';
          }
          return true;
        }
      }
    },
    refresh() { // 입력된 값들 초기화
      this.$refs.form.reset();
    },
    submit() { // 가입처리

    }
  }
}
</script>

<style>

</style>