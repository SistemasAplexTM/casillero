<template lang="html">
  <div class="">
    <h3>Usuarios</h3>
    <h1 v-for="user in users" v-if="user">{{ user.name }}</h1>
  </div>

</template>

<script>
import { user } from '@/api/login'
export default {
  data(){
    return{
      users: []
    }
  },
  mounted() {
     this.$echo.private('userNew').listen('NewEvent', (payload) => {
         // console.log(payload.user);
         this.users.push(payload.user)
     });
     user().then(({data}) => {
       this.users = data
     }).catch(error => { console.log(error) })
   },
  methods:{

  }
}
</script>

<style lang="css">
</style>
