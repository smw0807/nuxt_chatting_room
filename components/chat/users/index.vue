<template>
  <div>
     <v-navigation-drawer
      app
      v-model="drawer"
      clipped
      permanent
      height="100%"
      >

      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-avatar>
          <v-list-item-title>
            현재 접속자
          </v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item
          v-for="(user, idx) in users"
          :key="idx"
          link
          >
          <v-list-item-icon>
            <avatar :image="user.image" :size="35" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{user.nickName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import avatar from '@/components/cmn/avatar'
export default {
  components: {
    avatar,
  },
  data() {
    return {
      drawer: true
    }
  },
  computed: {
    users() {
      return this.$store.getters['chat/users'];
    }
  }
}
</script>

<style>

</style>