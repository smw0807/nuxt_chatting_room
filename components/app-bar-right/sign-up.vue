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
            <!-- 이메일 -->
            <v-text-field
              v-model="form.email"
              :rules="rules.email"
              label="이메일 *"
              prepend-icon="mdi-mail"
              type="text"
              autocomplete="false"
              clearable
            ></v-text-field>

            <!-- 비밀번호 -->
            <v-text-field
              v-model="form.password"
              :rules="rules.password"
              :counter="formCounter.password"
              :hint="hint.password"
              label="비밀빈호 *"
              prepend-icon="mdi-lock"
              type="password"
              autocomplete="false"
              clearable
            ></v-text-field>

            <!-- 비밀번호 확인 -->
            <v-text-field
              v-model="form.confirmPassword"
              :rules="rules.confirmPassword"
              label="비밀번호 확인 *"
              prepend-icon="mdi-lock-check"
              type="password"
              autocomplete="false"
              clearable
            ></v-text-field>

            <!-- 이름 -->
            <v-text-field
              v-model="form.name"
              :rules="rules.name"
              :counter="formCounter.name"
              :hint="hint.name"
              label="이름 *"
              prepend-icon="mdi-account"
              type="text"
              autocomplete="false"
              clearable
            ></v-text-field>

            <!-- 닉네임 -->
            <v-text-field
              v-model="form.nickName"
              :rules="rules.nickName"
              :counter="formCounter.nickName"
              :hint="hint.nickName"
              label="닉네임 *"
              prepend-icon="mdi-account-circle"
              type="text"
              autocomplete="false"
              clearable
            ></v-text-field>

            <!-- 프로필 이미지 -->
            <v-file-input
              v-model="form.image"
              :rules="rules.avatar"
              :hint="hint.image"
              show-size
              accept="image/png, image/jpeg, image/bmp"
              prepend-icon="mdi-camera"
              label="프로필 이미지"
              clearable
            ></v-file-input>

            <!-- 자기소개 -->
            <v-textarea
              :counter="formCounter.desc"
              label="자기소개"
              :rules="rules.desc"
              v-model="form.desc"
              outlined
              clearable
              >
            </v-textarea>

          </v-form>
          <span class="caption red--text">* 표시는 필수 입력사항입니다.</span>
        </v-card-text>
        <v-card-actions>
          <v-btn color="accent" @click="$refs.form.reset()">초기화</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">가입하기</v-btn>
        </v-card-actions>
      </v-card>
      <dial ref="dialog"/>
    </v-dialog>
  </div>
</template>

<script>
import dial from '@/components/cmn/dialog';
export default {
  components: {
    dial
  },
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

      formCounter: { // 입력 폼 입력길이 제한
        password: 16,
        name: 20,
        nickName: 20,
        desc: 200
      },

      hint: { // 입력 폼 힌트
        password: '영문 대소문자, 숫자, 특수문자 각 최소 1자씩 포함 8~16자리',
        name: '영문, 한글만 입력 가능',
        nickName: '영문, 한글, 숫자만 입력 가능',
        image: '이미지 용량 최대 2M'
      },

      rules: { // 입력 폼 유효성 체크
        email: [ v => this.fnRules().email(v ?? '') ],
        password: [ v => this.fnRules().password(v ?? '') ],
        confirmPassword: [ v => this.fnRules().confirmPassword(v ?? '')],
        name: [ v => this.fnRules().name(v ?? '')],
        nickName: [ v => this.fnRules().nickName(v ?? '')],
        avatar : [
          v => !v || v.size < 2000000 || '2M 이상의 파일은 첨부할 수 업습니다.',
        ],
        desc: [
          v => !v || v.length <= 200 || '최대 200자까지 입력 가능합니다.'
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
          if (v.match(/[\s]/g)) {
            return '패스워드에 공백을 사용하실 수 없습니다.';
          }
          if (!v.match(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\w\d\s:])([^\s]){8,16}$/g)) {
            return '영문 대소문자, 숫자, 특수문자 각 최소 1자가 포함 8~16자가 되어야 합니다.';
          }
          return true;
        },
        confirmPassword: (v) =>{
          if (v !== this.form.password) {
            return '패스워드가 일치하지 않습니다.';
          }
          return true;
        },
        name: (v) => {
          if (!v.match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z]{1,20}$/g)) {
            return '이름은 한글 또는 영문만 가능합니다.'
          }
          return true;
        },
        nickName: (v) => {
          if (!v.match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{1,20}$/g)) {
            return '닉네임은 한글, 영문, 숫자만 가능합니다. (최대 15자)';
          }
          return true;
        }
      }
    },
    async submit() { // 가입처리
      try {
        if (!this.$refs.form.validate()) return;
        const confirm = await this.$refs.dialog.open({
          mode: 'confirm',
          title: '회원가입',
          text: '입력한 정보로 회원가입을 진행하시겠습니까?'
        });
        if (!confirm) return;
        const formData = new FormData();
        formData.append('info', JSON.stringify(this.form));
        formData.append('image', this.form.image);

        const rs = await this.$store.dispatch('user/signup', formData);
        if (!rs.data.ok) {
          await this.$refs.dialog.open({
            mode: 'alert',
            type: 'error',
            title: '회원가입 실패',
            text: rs.data.msg
          })
        } else {
          await this.$refs.dialog.open({
            mode: 'alert',
            type: 'success',
            title: '회원가입 완료',
            text: '회원가입에 성공했습니다.\n로그인을 해주시기 바랍니다.'
          })
          this.dialog = false;
        }
      } catch (err) {
        console.error('submit fail...', err);
        await this.$refs.dialog.open({
          mode: 'alert',
          type: 'error',
          title: '회원가입 실패',
          text: err
        })
      }
    }
  }
}
</script>

<style>

</style>