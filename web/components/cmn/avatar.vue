<template>
  <div>
    <v-avatar v-if="image !== ''"
      color="white"
      :size="size"
      >
      <img :src="'/userProfiles/' + image" style="max-width:25px; max-height:25px;"/>
    </v-avatar>

    <v-avatar v-else
      color="blue lighter-4"
      :size="size"
      >
      <v-icon dark >
        mdi-account-circle
      </v-icon>
    </v-avatar>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 35
    }
  },
}
</script>

<style>

</style>