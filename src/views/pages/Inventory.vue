<template lang="html">
  <div class="">
    <h1>No tiene nada omme</h1>
    <h1>{{ msg }}</h1>
    <pre>
      {{ users }}
    </pre>
  </div>

</template>

<script>
import { user } from '@/api/login'
export default {
  data(){
    return{
      msg: 'acá',
      users: []
    }
  },
  mounted() {
     this.$echo.private('PrealertChannel').listen('PrealertEvent', (payload) => {
         console.log(payload);
         this.msg = payload.tracking
     });
     user().then(({data}) => {
       this.users = data
     }).catch(error => { console.log(error) })
   },
  methods:{
    setAlert(param){
      this.msg = param
    }
  }
}
</script>

<style lang="css">
</style>
