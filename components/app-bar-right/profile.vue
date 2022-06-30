<template>
  <div>
    <v-menu
        bottom
        min-width="200px"
        rounded
        offset-y
      >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          x-large
          v-on="on"
        >
          <avatar />
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <avatar />
            <h4 class="mt-2">{{ user.name }}</h4>
            <p class="text-caption mt-1">
              {{ user.nickName }}<br>
              {{ user.email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn
              depressed
              rounded
              text
              @click="editProfile"
            >
              사용자 정보 수정
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn
              depressed
              rounded
              text
              @click="logout"
            >
              로그아웃
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import avatar from './avatar';
export default {
  components: {
    avatar
  },
  data() {
    return {
      avatarColor: {
        male: 'blue lighter-4',
        female: 'pink lighten-4'
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/info'];
    }
  },
  methods: {
    editProfile() {
      console.log('사용자 수정');
      const test = { //테스트 데이터
        email: 'test@naver.com',
        name: 'minwoo',
        nickName: 'smw001',
        gender: 'female',
        image: null
      }
      this.$store.commit('user/info', test);
    },
    logout() {
      this.$store.dispatch('user/signout');
    }
  }
}
</script>

<style>

</style>