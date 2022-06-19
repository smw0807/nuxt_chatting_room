<template>
  <div>
    <v-avatar v-if="user.image"
      :color="avatarColor.hasImage"
      size="48"
      >
      <img :src="'userProfiles/' + user.image" style="max-width:35px; max-height:35px;"/>
    </v-avatar>

    <v-avatar v-else
      :color="user.gender === 'male' ? avatarColor.male : avatarColor.female"
      size="48"
      >
      <v-icon dark >
        mdi-account-circle
      </v-icon>
    </v-avatar>

  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarColor: {
        male: 'blue lighter-4',
        female: 'pink lighten-4',
        hasImage: 'white' //이미지가 있을 경우
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/info'];
    }
  },
}
</script>

<style>

</style>