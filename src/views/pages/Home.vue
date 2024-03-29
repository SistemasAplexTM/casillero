<template>
	<div class="scrollable only-y">
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
			<el-col :xs="24" :sm="24" :md="24" :lg="{ span: 16, offset: 5 }" :xl="{ span: 16, offset: 5 }">
				<el-row class="mt-0" :gutter="15">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<div class="card-base card-shadow--small mb-10 pointer panel" v-loading="loading"
							@click="select('tracking/transito/Tránsito', 1)">
							<div class="ph-10 p-3">
								<div class="flex justify-center align-center">
									<div class="mr-0 animated fadeInRight" style="margin-right: -5px">
										<i class="fal fa-plane accent-text fa-5x icon-card r320 warning-text"></i>
									</div>
									<div class="box grow  animated fadeInLeft lh-1 p-10">
										<h1 class="m-0 text-truncate font-weight-800">
											Tránsito
										</h1>
										<div class="o-090 mt-0  pt-0 pb-0 font-size-16">
											Encuentre aquí los <strong>recibos</strong> que están en <strong>tránsito</strong> a su dirección
											de entrega.
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
						<div class="card-base card-shadow--small mb-10 pointer panel" v-loading="loading"
							@click="select('tracking/2/Casillero', 2)">
							<div class="ph-10 p-3">
								<div class="flex justify-center align-center">
									<div class="mr-10 animated fadeInRight">
										<i class="fal fa-shopping-bag accent-text fa-5x icon-card r100 danger-text"></i>
									</div>
									<div class="box grow animated fadeInLeft lh-1 p-10">
										<h1 class="m-0 text-truncate font-weight-800">
											Casillero
										</h1>
										<div class="o-090 pt-0 pb-0 font-size-16">
											Encuentre aquí los <strong>trackings</strong> que hemos <strong>recibido</strong> en nuestra
											bodega.
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
						<div class="card-base card-shadow--small mb-10 pointer panel" v-loading="loading"
							@click="select('tracking/7/Recibido', [7, 33])">
							<div class="ph-10 p-3">
								<div class="flex justify-center align-center">
									<div class="mr-10 animated fadeInRight">
										<i class="fal fa-box accent-text fa-5x icon-card r100"></i>
									</div>
									<div class="box grow animated fadeInLeft lh-1 p-10">
										<h1 class="m-0 text-truncate font-weight-800">
											Recibido
										</h1>
										<div class="o-090 pt-0 pb-0 font-size-16">
											Encuentre aquí los <strong>trackings</strong> que hemos <strong>entregado</strong>.
										</div>
									</div>
									<div class="box">
										<h1 class="h-big m-0 ml-10 font-weight-900 accent-text">{{ getCant([7, 33]) }}</h1>
									</div>
								</div>
							</div>
						</div>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
						<div class="card-base card-shadow--small mb-10 pointer panel" v-loading="loading"
							@click="select('prealert/list', null)">
							<div class="ph-10 p-3">
								<div class="flex justify-center align-center">
									<div class="mr-0 animated fadeInRight">
										<i class="fal fa-bells accent-text fa-5x icon-card r100"></i>
									</div>
									<div class="box grow animated fadeInLeft lh-1 p-10">
										<h1 class="m-0 text-truncate font-weight-800">
											Prealertado
										</h1>
										<div class="o-090 pt-0 pb-0 font-size-16">
											Estos son los <strong>trackings</strong> que usted nos ha <strong>prealertado</strong> de su
											llegada.
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
		<promotions class="hidden-sm-and-down"></promotions>
	</div>
</template>

<script>
import { getUser, getAgency } from '@/utils/auth'
import { getAllWarehouse } from '@/api/tracking'

import { mapGetters, mapActions } from 'vuex'
import Promotions from './Promotion'

export default {
	name: 'Home',
	components: { Promotions },
	data() {
		return {
			loading: false,
			cant: [],
			// cantPrealert: 0,
			user: {},
			agency: {},
		}
	},
	created() {
		this.agency = getAgency()
		this.user = this.$store.getters.user
		setTimeout(function () {
			this.loading = false
		}, 1000);
	},
	mounted() {
		this.getData()
		// this.getCantPrealertF()
		this.getCantPrealertF().then(data => {
			// this.prealerts = data
		}).catch(error => error)
	},
	computed: { ...mapGetters(['submitPrealert', 'cantPrealert']) },
	watch: {
		submitPrealert(newVal, oldVal) {
			// this.getCantPrealertF()
		}
	},
	methods: {
		...mapActions(['getCantPrealertF']),
		select(route, cant) {
			if (cant) {
				if (this.getCant(cant) > 0) {
					this.$router.push({ path: route })
				}
			} else {
				if (this.cantPrealert > 0) {
					this.$router.push({ path: route })
				}
			}
		},
		getData() {
			let me = this
			me.loading = true
			getAllWarehouse(me.user.id, 'count').then(({ data }) => {
				me.loading = false
				me.cant = data.data
			}).catch(error => error)
		},
		// getCantPrealertF(){
		// 	let me = this
		// 	me.loading = true
		// 	getCantPrealert(me.agency.id, me.user.id).then(({data}) => {
		// 		me.loading = false
		// 		me.cantPrealert = data.data
		// 	}).catch( error => error)
		// },
		getCant(id) {
			let me = this
			var result = []
			if (Array.isArray(id)) {
				let resultSum =0
				if (!id.includes(2) && !id.includes(7) && !id.includes(33)) {
					if (me.cant.length > 0) {
						result.cant = 0
						me.cant.forEach(function (element) {
							if (element.status_id != 7 && element.status_id != 2 && element.status_id != 33) {
								result.cant += element.cant
							}
						});
					}else {
						result.cant = 0
					}
				} else {
					for (let index = 0; index < id.length; index++) {
						result = me.cant.filter(item => item.status_id == id[index])
						if(result.length > 0){
							resultSum += result[0].cant
						}
					}
				}
				return resultSum
			} else {
				if (id != 7 && id != 2 && id != 33) {
					if (me.cant.length > 0) {
						result.cant = 0
						me.cant.forEach(function (element) {
							if (element.status_id != 7 && element.status_id != 2 && element.status_id != 33) {
								result.cant += element.cant
							}
						});
					} else {
						result.cant = 0
					}
				} else {
					result = me.cant.filter(item => item.status_id == id)
					result = result[0]
				}
				return (result) ? result.cant : 0
			}
		}
	}
}
</script>

<style media="screen">
.panel:hover {
	color: black;
	-webkit-transition: all 60ms ease-in;
	-webkit-transform: scale(1.003, 1.003);
	-webkit-box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.75);
	box-shadow: 0px 0px 15px -8px rgba(0, 0, 0, 0.75);
}

.icon-card {
	margin-left: -40px;
	margin-top: -20px;
	/* opacity: 0.5 */
}

.casillero {
	margin-left: -50px;
}

.r320 {
	transform: rotate(310deg);
}

.r100 {
	transform: rotate(30deg);
}
</style>
