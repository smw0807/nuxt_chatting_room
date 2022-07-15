<template>
  <div>
    <!-- {{type}} -->
    <v-row>
      <v-col cols="12" :align="type ==='other' ? 'start' : 'end'">
        
        <v-list align="start" v-if="type === 'other'">
          <v-list-item>
            <v-list-item-avatar>
              <avatar :image="image" :size="35"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{nickName}}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-card
                  mix-width="20"
                  max-width="300"
                  align="start"
                  outlined
                  >
                  <v-card-text>
                    {{message}}
                  </v-card-text>
                </v-card>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list align="end" v-else-if="type === 'mine'">
          <v-list-item>
            
            <v-list-item-content>
              <v-list-item-title>
                {{nickName}}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-card
                  mix-width="20"
                  max-width="300"
                  align="end"
                  outlined
                  >
                  <v-card-text>
                    {{message}}
                  </v-card-text>
                </v-card>
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