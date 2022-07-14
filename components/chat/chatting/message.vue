<template>
  <div>
    <!-- {{type}} -->
    <v-row>
      <v-col cols="12" :align="type ==='other' ? 'start' : 'end'">
        {{type}}
        {{nickName}}
        <avatar :image="image" :size="35"/>
        {{message}}

      </v-col>
    </v-row>
  </div>
</template>

<script>
import avatar from '@/components/cmn/avatar';
// import avatar from './avatar';
export default {
  props: {
    type: {
      type: String,
      default: '', // 내 메세지: mine, 다른 사람 메세지: other
    },
    nickName: {
      type: String,
      default: '',
    },
    image: { //사용자 프로필 이미지
      type: String,
      default: '' 
    },
    message: { //입력 메세지
      type: String,
      default: '',
    },
  },
  components: {
    avatar
  },
}
</script>

<style>

</style>