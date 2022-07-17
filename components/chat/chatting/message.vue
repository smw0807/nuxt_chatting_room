<template>
  <div>
    <v-row>
      <v-col cols="12" :align="type ==='other' ? 'start' : 'end'">
        
        <v-list align="start" v-if="type === 'other'">
          <v-list-item>

            <v-list-item-avatar>
              <avatar :image="image" :size="35"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle>
                {{nickName}}
              </v-list-item-subtitle>
              <v-list-item-title>
                {{message}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{getTime()}}
              </v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item>
        </v-list>

        <v-list align="end" v-else-if="type === 'mine'">
          <v-list-item>
            
            <v-list-item-content>
              <v-list-item-subtitle>
                {{nickName}}
              </v-list-item-subtitle>
              <v-list-item-title>
                {{message}}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{getTime()}}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar>
              <avatar :image="image" :size="35"/>
            </v-list-item-avatar>

          </v-list-item>
        </v-list>
        
      </v-col>
    </v-row>
  </div>
</template>

<script>
import avatar from '@/components/cmn/avatar';
import moment from 'moment';
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
  methods: {
    getTime() {
      return moment().format('HH:mm');
    }
  }
}
</script>

<style>

</style>