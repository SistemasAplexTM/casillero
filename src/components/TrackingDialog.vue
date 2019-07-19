<template>
	<el-dialog :show-close="true" :custom-class="'tracking-dialog'" id="tracking-dialog" :visible="dialogvisible" @close="$emit('update:dialogvisible', false)">
		<div slot="title" class="bg-accent white-text p-15 flex">
			<div class="info box grow flex">
				<i class="fal fa-box-open fa-2x m-a"></i>
				<div class="box grow flex white-text column justify-center p-0 ml-15">
					<!-- <div class="fs-12 info-text">20-FEB-2019 3:20 pm</div> -->
					<div class="fs-22">{{ dataHead.num_warehouse }}</div>
					<div class="fs-14 o-050">{{ dataHead.peso }} Lb.</div>
					<div class="fs-14 o-050">{{ dataHead.descripcion }}</div>
				</div>
				<i class="fal fa-box-open fa-5x o-010"></i>
			</div>
		</div>
		<div class="pt-10 p-20">
			<el-tabs tab-position="top">
				<el-tab-pane>
					<span slot="label" class="fl">
						<i class="fal fa-history mr-3"></i>
						Historial
					</span>
					<br>
					<timeline timeline-theme="lightblue" >
						<template v-for="item in status">
							<timeline-title>
								<div class="box grow flex column">
									<div class="font-weight-900">
										{{ item.estado }}
									</div>
									<div class="font-weight-500 secondary-text fs-15">
										{{ item.fecha_status }}
									</div>
								</div>
							</timeline-title>
							<timeline-item :hollow="true">
								{{ item.descripcion_general }}
								<span v-if="item.transportadora_url_rastreo">
									<p>Para seguir su carga con la transportadora local haga clic <a  :href="item.transportadora_url_rastreo + item.transportadora_guia" target="_blank">aquí</a></p>
								</span>
							</timeline-item>
						</template>
					</timeline>
				</el-tab-pane>
				<el-tab-pane class="mb-0">
					<span slot="label" class="fl">
						<i class="fal fa-search-location mr-3"></i>
							Trackings
							<el-badge class="accent-text m-a" :value="trackingInWH(data.trackings)" />
					</span>
					<el-collapse v-model="activeCollapse" accordion>
					  <el-collapse-item v-for="tracking in trackings" :key="tracking.id" :name="tracking.id">
							<template slot="title">
									<div class="font-weight-900">
										<i class="fal fa-truck icon-menu"></i>
											{{ tracking.codigo }}
									</div>
				    </template>
							<el-row :gutter="20">
							    <el-col :span="10" class="br">
							        LLEGADA A LA BODEGA:
											<h3 class="m-0">{{ tracking.created_at }}</h3>
							    </el-col>
							    <el-col :span="14">
							        CONTENIDO:
											<h3 class="m-0">{{ tracking.contenido }}</h3>
							    </el-col>
							</el-row>
					  </el-collapse-item>
					</el-collapse>
				</el-tab-pane>
		  </el-tabs>
		</div>
	</el-dialog>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
	name: 'TrackingDialog',
	components: {
		Timeline,
		TimelineItem,
		TimelineTitle
	},
	props: ['data', 'dialogvisible', 'dataHead'],
	data() {
		return {
			activeCollapse: '1',
			status: [],
			trackings: []
		}
	},
	watch:{
		data(newVal, oldVal){
			let me = this
			me.status = newVal.data
			me.trackings = newVal.trackings
		}
	},
	methods:{
		trackingInWH(tracking){
			if (tracking) {
				// var result = tracking.split(',')
				// this.trackings = result
				return tracking.length
			}
			// console.log(tracking.length);
			return 0
		},
	}
}
</script>
<style lang="scss">
.el-tabs__header{
	margin-bottom: 0
}
.el-badge__content{
	vertical-align: middle;
	background-color: #4a596a
}
.timeline{
	font-family: 'Exo'
}
.timeline-item{
		margin-top: 0;
		padding-bottom: 5px
}
.el-dialog.tracking-dialog {
	.el-dialog__header {
		padding: 0;
	}
	.el-dialog__body {
		padding: 0;
	}
}
</style>
