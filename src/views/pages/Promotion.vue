<template lang="html">
 <div class="scrollable">
  <el-row class="row" :gutter="14">
    <el-col v-for="(column, indexColumn) in publicity" :key="column.id" :lg="column.width" :xs="24" class="column">
     <div class="text-center mt-30">
						<h1 v-html="column.text" style="max-width: 100%"></h1>
     </div>
    </el-col>
		</el-row>
 </div>
</template>

<script>
import { getConfig } from '@/api/config'
import { getUser } from '@/utils/auth'

export default {
 data(){
  return {
   publicity: [],
   user: null
  }
 },
 created(){
  let me = this
  me.user = getUser()
  setTimeout(function () {
   me.getData()
  }, 300);
 },
 methods:{
  getData(){
   getConfig(this.user.agencia_id).then(({data}) => {
    var result = JSON.parse(data.value)
    this.publicity = result
   }).catch(error => error)
  },
 }
}
</script>

<style lang="css" scoped>
</style>
