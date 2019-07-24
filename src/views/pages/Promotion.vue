<template lang="html">
 <div class="scrollable only-y">
  <el-row v-for="item in advertising" :key="item.id" >
   <el-col v-for="column in item" :key="item.id" :lg="column.width" :xs="24">
    <div :class="'bg-'+column.color" class="text-center mt-30">
     <h1 v-html="column.text" style="max-width: 100%"></h1>
    </div>
   </el-col>
  </el-row>
 </div>
</template>

<script>
export default {
 data(){
  return {
   advertising: [
				[
					// {width: 12, color: 'info-light', text: '<a><img src="https://designertask.com/wp-content/uploads/2018/05/soundcloud-banner-size.png"></a>'},
					{width: 24, color: '', text: '<a><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/The_Banner_Saga_logo_transparent.png/1200px-The_Banner_Saga_logo_transparent.png"></a>'},
				],
				[
					{width: 4, color: '', text: '<center><a href="https://www.siteground.com/web-hosting.htm?afbannercode=01aff31ae3f01cbcac6752d914848efb"><img src="https://ua.siteground.com/img/banners/general/static/250x250.jpg" alt="Web Hosting" width="250" height="250" border="0"></a></center>'},
					{width: 7, color: '', text: '<center><a href="https://www.siteground.com/web-hosting.htm?afbannercode=01aff31ae3f01cbcac6752d914848efb"><img src="https://images.ctfassets.net/wm1n7oady8a5/GrKoLIRviVS2XN5mRrr9w/f9feff4776b253967c04c548189c0a06/Customsize-Banner-DIY-Banner-UK.png?w=460&h=200&fit=fill" alt="Web Hosting" border="0"></a></center>'},
					{width: 6, color: '', text: '4 x 5'},
					{width: 7, color: '', text: '4 x 5'}
				],
			]
  }
 }
}
</script>

<style lang="css" scoped>
</style>
