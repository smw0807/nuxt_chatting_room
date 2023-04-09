<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="550px">
      <v-card class="elevation-12">
        <v-toolbar color="info" dark flat dense outlined>
          <v-toolbar-title class="text-h5 black--text"
            >방 만들기</v-toolbar-title
          >
          <v-spacer />
        </v-toolbar>
        <v-card-text class="mt-3 mb-0">
          <v-form @submit.prevent="submit" ref="form">
            <v-text-field
              v-model="form.title"
              :counter="formCounter.title"
              :hint="hint.nickName"
              :rules="rules.title"
              label="방 제목 *"
              prepend-icon="mdi-format-title"
              type="text"
              autocomplete="false"
              clearable
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :counter="formCounter.password"
              :hint="hint.password"
              :rules="rules.password"
              label="비밀빈호"
              prepend-icon="mdi-lock"
              type="password"
              autocomplete="false"
              clearable
            ></v-text-field>

            <span class="ml-8 text-overline"
              >참여 허용인원 : {{ form.acceptableMaxCount }}명</span
            >

            <v-slider
              v-model="form.acceptableMaxCount"
              hint="2명부터 최대 50명까지 설정 가능합니다."
              append-icon="mdi-plus"
              prepend-icon="mdi-minus"
              min="2"
              max="20"
              @click:append="form.acceptableMaxCount++ || 0"
              @click:prepend="form.acceptableMaxCount-- || 0"
            ></v-slider>
          </v-form>
          <div class="mt-5 caption red--text">
            * 표시는 필수 입력사항입니다.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="accent" @click="$refs.form.reset()">초기화</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="submit">만들기</v-btn>
          <v-btn @click="$emit('close')">닫기</v-btn>
        </v-card-actions>
      </v-card>
      <dial ref="dialog" />
    </v-dialog>
  </div>
</template>

<script>
import dial from "@/components/cmn/dialog";
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    dial,
  },
  data() {
    return {
      form: {
        // 입력 폼 데이터 바인딩
        //방 제목
        title: null,
        //방 비밀번호
        password: null,
        //방 참여 최대 허용 인원
        acceptableMaxCount: null,
      },

      formCounter: {
        // 입력 폼 입력길이 제한
        title: 50,
        password: 20,
      },

      hint: {
        // 입력 폼 힌트
        password: "입력하면 입장 시 비밀번호가 필요한 방으로 생성됩니다. ",
      },

      rules: {
        // 입력 폼 유효성 체크
        title: [(v) => this.fnRules().title(v ?? "")],
        password: [(v) => this.fnRules().password(v ?? "")],
      },
    };
  },
  computed: {
    dialog() {
      return this.open;
    },
  },
  methods: {
    fnRules() {
      return {
        title: (v) => {
          if (v === "") {
            return "방 제목을 입력해주세요.";
          }
          return true;
        },
        password: (v) => {
          if (v.match(/[\s]/g)) {
            return "패스워드에 공백을 사용하실 수 없습니다.";
          }
          if (v === "") {
            return true;
          }
          return true;
        },
      };
    },
    async submit() {
      try {
        if (!this.$refs.form.validate()) return;

        const confirm = await this.$refs.dialog.open({
          mode: "confirm",
          title: "방 만들기",
          text: "채팅방을 생성하시겠습니까?",
        });
        if (!confirm) return;
        this.$emit("inputData", this.form);
      } catch (err) {
        console.error("create room fail : ", err);
        await this.$refs.dialog.open({
          mode: "alert",
          type: "error",
          title: "방 생성 실패",
          text: err.message,
        });
      }
    },
  },
};
</script>

<style></style>
