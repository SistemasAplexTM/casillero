<template>
	<el-dialog :show-close="true" :custom-class="'tracking-dialog'" id="tracking-dialog" :visible="dialogvisible" @close="$emit('update:dialogvisible', false)">
		<div slot="title" class="bg-primary white-text p-15 flex">
			<div class="info box grow flex">
				<i class="fal fa-shipping-fast fa-2x m-a"></i>
				<div class="box grow flex white-text column justify-center p-0 ml-15">
					<div class="fs-12 info-text">20-FEB-2019 3:20 pm</div>
					<div class="fs-22">{{ data.num_warehouse }}</div>
					<div class="fs-14 o-050">{{ data.peso }} Lb.</div>
					<div class="fs-14 o-050">{{ data.descripcion }}</div>
				</div>
				<i class="fal fa-shipping-fast fa-5x o-010"></i>
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
						<timeline-title>
							<div class="box grow flex column">
								<div class="font-weight-900">
										RECIBIDO EN BODEGA
								</div>
								<div class="font-weight-500 secondary-text fs-15">
									30-ENE-2019 08:15 am
								</div>
							</div>
						</timeline-title>
						<timeline-item :hollow="true">
							Acá va a ir una observación del estado.
						</timeline-item>
						<timeline-title>
							<div class="box grow flex column">
								<div class="font-weight-900">
										CONSOLIDADO
								</div>
								<div class="font-weight-500 secondary-text fs-15">
									01-FEB-2019 11:00 am
								</div>
							</div>
						</timeline-title>
					</timeline>
				</el-tab-pane>
				<el-tab-pane class="mb-0">
					<span slot="label" class="fl">
						<i class="fal fa-search-location mr-3"></i>
							Trackings
							<el-badge class="accent-text m-a" :value="3" />
					</span>
					<el-collapse v-model="activeCollapse" accordion>
					  <el-collapse-item name="1">
							<template slot="title">
								<div class="font-weight-900">
										1z8574005aP892s
								</div>
					    </template>
							<el-row :gutter="20">
							    <el-col :span="10" class="br">
							        LLEGADA A LA BODEGA:
											<h3 class="m-0">14-FEB-2019 8:30 am</h3>
							    </el-col>
							    <el-col :span="14">
							        CONTENIDO:
											<h3 class="m-0">Computador ALIENWARE de regalo para DUMA de parte de APLEXTM</h3>
							    </el-col>
							</el-row>
					  </el-collapse-item>
					  <el-collapse-item name="2">
							<template slot="title">
								<div class="font-weight-900">
										2z8564005aP892r
								</div>
					    </template>
							<el-row :gutter="20">
							    <el-col :span="10" class="br">
							        LLEGADA A LA BODEGA:
											<h3 class="m-0">16-FEB-2019 04:30 pm</h3>
							    </el-col>
							    <el-col :span="14">
							        CONTENIDO:
											<h3 class="m-0">Un par de medias usadas de regalo para Jhonny de parte de APLEXTM</h3>
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
	props: ['data', 'dialogvisible'],
	data() {
		return {
			activeCollapse: '1'
		}
	},
	methods:{

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
