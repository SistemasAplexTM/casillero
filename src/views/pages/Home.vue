<template>
		<vue-scroll class="scrollable only-y">
		<el-row :gutter="12">
		    <el-col :span="24" class="text-center lh-1 mb-5">
	        <h3 class="m-0 font-weight-300">Mi Casillero</h3>
									<h2 class="m-0 font-weight-900 accent-text">{{ user.nombre_full }}</h2>
									<h3 class="m-0">
										<i class="fal fa-map-marker-alt"></i>
										{{ agency.direccion }}
									</h3>
									<!-- <p class="m-0 font-weight-400" >Miami, FL, 33166</p> -->
									<h2 class="m-5 font-weight-900 accent-text">{{ user.po_box }}</h2>
		    </el-col>
		</el-row>
		<el-row :gutter="24">
	   <el-col :xs="24" :sm="24" :md="24" :lg="{span: 14, offset: 5}" :xl="{span: 14, offset: 5}">
							<el-row class="mt-0 w-50" :gutter="15">
								<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
									<div class="card-base card-shadow--small mb-10 pointer panel" v-loading="loading" @click="select('tracking/transito/Tránsito')">
										<div class="ph-10 p-3">
											<div class="flex justify-center align-center">
												<div class="mr-0 animated fadeInRight" style="margin-right: -5px">
													<i class="fal fa-plane accent-text fa-5x icon-card r320 warning-text"></i>
												</div>
												<div class="box grow  animated fadeInLeft lh-1">
													<h1 class="m-0 text-truncate">
														Tránsito
													</h1>
													<div class="o-090 mt-0  pt-0 pb-0 font-size-16">
														Encuentre aquí los <strong>recibos</strong> que están en <strong>tránsito</strong> a su dirección de entrega.
													</div>
												</div>
												<div class="box">
													<h1 class="h-big m-0 ml-10 font-weight-900 warning-text">{{ getCant(1) }}</h1>
												</div>
											</div>
										</div>
									</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
									<div class="card-base card-shadow--small mb-10 pointer panel" v-loading="loading" @click="select('tracking/2/Casillero')">
										<div class="ph-10 p-3">
											<div class="flex justify-center align-center">
												<div class="mr-10 animated fadeInRight">
													<i class="fal fa-shopping-bag accent-text fa-5x icon-card r100 danger-text"></i>
												</div>
												<div class="box grow animated fadeInLeft lh-1">
													<h1 class="m-0 text-truncate">
														Casillero
													</h1>
													<div class="o-090 pt-0 pb-0 font-size-16">
														Encuentre aquí los <strong>trackings</strong> que hemos <strong>recibido</strong> en nuestra bodega.
													</div>
												</div>
												<div class="box">
													<h1 class="h-big m-0 ml-10 font-weight-900 danger-text">{{ getCant(2) }}</h1>
												</div>
											</div>
										</div>
									</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
									<div class="card-base card-shadow--small mb-10 pointer panel" v-loading="loading" @click="select('tracking/7/Recibido')">
										<div class="ph-10 p-3">
											<div class="flex justify-center align-center">
												<div class="mr-10 animated fadeInRight">
													<i class="fal fa-hand-receiving accent-text fa-5x icon-card r100"></i>
												</div>
												<div class="box grow animated fadeInLeft lh-1">
													<h1 class="m-0 text-truncate">
														Recibido
													</h1>
													<div class="o-090 pt-0 pb-0 font-size-16">
														Encuentre aquí los <strong>trackings</strong> que hemos <strong>entregado</strong>.
													</div>
												</div>
												<div class="box">
													<h1 class="h-big m-0 ml-10 font-weight-900 accent-text">{{ getCant(7) }}</h1>
												</div>
											</div>
										</div>
									</div>
								</el-col>
								<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
									<div class="card-base card-shadow--small mb-10 pointer panel" v-loading="loading"  @click="select('prealert/list')">
										<div class="ph-10 p-3">
											<div class="flex justify-center align-center">
												<div class="mr-0 animated fadeInRight">
													<i class="fal fa-bell-school accent-text fa-5x icon-card r100"></i>
												</div>
												<div class="box grow animated fadeInLeft lh-1">
													<h1 class="m-0 text-truncate">
														Prealertado
													</h1>
													<div class="o-090 pt-0 pb-0 font-size-16">
														Estos son los <strong>trackings</strong> que usted nos ha <strong>prealertado</strong> de su llegada.
													</div>
												</div>
												<div class="box">
													<h1 class="h-big m-0 ml-10 font-weight-900 accent-text">{{ cantPrealert }}</h1>
												</div>
											</div>
										</div>
									</div>
								</el-col>
							</el-row>
    </el-col>
		</el-row>
		<el-row v-for="item in advertising">
		    <el-col v-for="column in item"  :lg="column.width" :xs="24">
			       <div :class="'bg-'+column.color" class="text-center mt-30">
										<h1 v-html="column.text"></h1>
		       </div>
		    </el-col>
		</el-row>
	</vue-scroll>
</template>

<script>
import { getUser, getAgency } from '@/utils/auth'
import { getAllWarehouse } from '@/api/tracking'
import { getCantPrealert } from '@/api/prealert'
import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	data () {
		return {
  	loading: false,
			cant: [],
			cantPrealert: 0,
			user: {},
			agency: {},
			advertising: [
				[
					// {width: 12, color: 'info-light', text: '<a><img src="https://designertask.com/wp-content/uploads/2018/05/soundcloud-banner-size.png"></a>'},
					{width: 24, color: 'info-light', text: '<a><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/The_Banner_Saga_logo_transparent.png/1200px-The_Banner_Saga_logo_transparent.png"></a>'},
				],
				[
					{width: 12, color: 'info-light', text: '<center><a href="https://www.siteground.com/web-hosting.htm?afbannercode=01aff31ae3f01cbcac6752d914848efb"><img src="https://ua.siteground.com/img/banners/general/static/250x250.jpg" alt="Web Hosting" width="250" height="250" border="0"></a></center>'},
					{width: 4, color: 'red', text: '13 x 5'},
					{width: 4, color: 'accent-lighter', text: '4 x 5'},
					{width: 4, color: 'success-light', text: '4 x 5'}
				],
			]
		}
	},
	created(){
		this.agency = getAgency()
		this.user = this.$store.getters.user
    setTimeout(function () {
      this.loading = false
    }, 1000);
	},
	mounted() {
		this.getData()
		this.getCantPrealertF()
	},
	computed: {...mapGetters(['submitPrealert'])},
	watch: {
		submitPrealert(newVal, oldVal){
			this.getCantPrealertF()
		}
	},
	methods: {
		select(route){
			this.$router.push({path: route});
		},
		getData(){
			let me = this
			me.loading = true
			getAllWarehouse(me.user.id, 'count').then(({data}) => {
				me.loading = false
				me.cant = data.data
			}).catch( error => error)
		},
		getCantPrealertF(){
			let me = this
			me.loading = true
			getCantPrealert(me.agency.id, me.user.id).then(({data}) => {
				me.loading = false
				me.cantPrealert = data.data
			}).catch( error => error)
		},
		getCant(id){
			let me = this
			var result = []
			if (id != 7 && id != 2) {
				if (me.cant.length > 0) {
					result.cant = 0
					me.cant.forEach(function(element) {
						if (element.status_id != 7 && element.status_id != 2) {
							result.cant += element.cant
						}
					});
				}else{
					result.cant = 0
				}
			}else{
				result = me.cant.filter(item => item.status_id == id)
				result = result[0]
			}
			return (result) ? result.cant : 0
		}
	}
}
</script>

<style media="screen">
.panel:hover{
		color: black;
		-webkit-transition: all 60ms ease-in;
		-webkit-transform: scale(1.015, 1.015);
		-webkit-box-shadow: 0px 0px 21px -8px rgba(0,0,0,0.75);
		-moz-box-shadow: 0px 0px 21px -8px rgba(0,0,0,0.75);
		box-shadow: 0px 0px 21px -8px rgba(0,0,0,0.75);
	}

.icon-card{
  margin-left: -40px;
  margin-top: -20px;
	/* opacity: 0.5 */
}
.casillero{
	margin-left: -50px;
}
.r320{
  transform: rotate(310deg);
}
.r100{
  transform: rotate(30deg);
}
</style>
