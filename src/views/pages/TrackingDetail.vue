<template>
	<div class="">
		<transition name="fade" mode="out-in">
			<div v-if="loading == false">
				<div slot="title" class="p-10 flex">
					<div class="info box grow flex">
						<i class="fal fa-box-open fa-2x m-a"></i>
						<div class="box grow flex  column justify-center p-10 ml-15">
							<div class="fs-22">{{ warehouse.num_warehouse }}</div>
							<div class="fs-14 o-080 mt-5">{{ warehouse.peso }} Lb.</div>
							<div class="fs-14 o-050">{{ warehouse.descripcion }}</div>
						</div>
						<!-- <i class="fal fa-box-open fa-5x o-010"></i> -->
					</div>
				</div>
				<hr class="divider-custom">
				<div class="pt-10 mt-0">
					<el-tabs tab-position="top">
						<el-tab-pane>
							<span slot="label" class="fl">
								<i class="fal fa-history mr-3"></i>
								Historial
							</span>
							<br>
							<timeline timeline-theme="lightblue">
								<template v-for="item in status">
									<timeline-title>
										<div class="box grow flex column">
											<div class="font-weight-700 mb-5">
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
											<p>Para seguir su carga con la transportadora local haga clic <a
													:href="item.transportadora_url_rastreo + item.transportadora_guia" target="_blank">aquí</a>
											</p>
										</span>
									</timeline-item>
								</template>
							</timeline>
						</el-tab-pane>
						<el-tab-pane class="mb-0">
							<span slot="label" class="fl">
								<i class="fal fa-search-location mr-3"></i>
								Trackings
								<el-badge class="accent-text m-a" :value="trackingInWH(trackings)" />
							</span>
							<el-collapse v-model="activeCollapse" accordion @change="handleChangeCollapse">
								<el-collapse-item v-for="tracking in trackings" :key="tracking.id" :name="tracking.id">
									<template slot="title">
										<div class="font-weight-800 fs-15">
											<i class="fal fa-truck icon-menu"></i>
											{{ tracking.codigo }}
										</div>
									</template>
									<el-row :gutter="20" v-loading="loadingTracking">
										<el-col :span="12" class="br">
											LLEGADA A LA BODEGA:
											<h3 class="m-0">{{ tracking.created_at }}</h3>
											<div class="file-invoice">
												<el-upload ref="upload" v-if="tracking.url == '' | tracking.url == null" action="" :on-change="handleFileChange"
													:before-upload="beforeUpload" :file-list="invoice" :auto-upload="true" accept=".pdf"
													:http-request="handleFileUpload">
													<el-button size="small" type="primary" icon="el-icon-upload">Clic para
														subir factura</el-button>
													<div slot="tip" class="el-upload__tip">Solo archivos con un tamaño menor
														de 1 MB</div>
												</el-upload>
												<div class="file-text" v-else>
													<a :href="tracking.url" :download="tracking.name_old" target="_blank"><i
															class="el-icon-download"></i>
														{{ tracking.name_old }}</a>
													<!-- <el-button class="file-btn-delete" size="mini" type="danger" round><i class="el-icon-delete"></i> Eliminar
														archivo</el-button> -->
												</div>
											</div>
										</el-col>
										<el-col :span="12">
											CONTENIDO:
											<h3 class="m-0">{{ tracking.contenido }}</h3>
										</el-col>
									</el-row>
								</el-collapse-item>
							</el-collapse>
						</el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</transition>
		<skeleton-loading v-if="loading" class="mt-15">
			<row :gutter="{ top: '10px', bottom: '2px' }">
				<column :span="3" :gutter="10">
					<circle-skeleton></circle-skeleton>
				</column>
				<column :span="20" :gutter="10">
					<square-skeleton :count="1" :boxProperties="{ bottom: '15px', width: '250px', height: '15px' }">
					</square-skeleton>
					<square-skeleton :count="1" :boxProperties="{ bottom: '15px', width: '100px', height: '15px' }">
					</square-skeleton>
				</column>
			</row>
			<row v-for="i in 5" :key="i" :gutter="{ top: '10px', bottom: '10px' }">
				<column :span="3" :gutter="10">
					<circle-skeleton></circle-skeleton>
				</column>
				<column :span="20" :gutter="8">
					<square-skeleton :count="3" :boxProperties="{ bottom: '10px', width: '170px', height: '15px' }">
					</square-skeleton>
				</column>
			</row>
		</skeleton-loading>
	</div>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import { getWarehouse, uploadFile } from '@/api/tracking'

export default {
	name: 'TrackingDetail',
	components: {
		Timeline,
		TimelineItem,
		TimelineTitle
	},
	props: ['data'],
	data() {
		return {
			agencyId: this.$store.getters.user.agencia_id,
			activeCollapse: '1',
			warehouse: [],
			status: [],
			trackings: [],
			loading: true,
			invoice: [],
			fileList: [],
			trackingId: null,
			showFileUpload: true,
			urlInvoice: null,
			nameInvoice: null,
			loadingTracking: true,
		}
	},
	mounted() {
		this.get()
	},
	methods: {
		handleFileUpload(file) {
			this.loadingTracking = true
			const formData = new FormData();
			// Encode the String
			var agencyId = btoa(this.agencyId);
			formData.append('agencyId', agencyId);

			// formData.append('agencyId', this.agencyId);
			formData.append('module_id', 20); // recibo de casillero 'tracking'
			formData.append('module_record_id', this.trackingId);

			if (this.invoice.length > 0) {
				formData.append('file', this.invoice[0].raw); // Agregar el archivo al FormData
			}
			uploadFile(agencyId, formData).then(({ data }) => {
				console.log(data);
				if (data.code == 200) {
					this.get();
					this.$message.success(data.message);
				} else {
					this.loadingTracking = false
					this.$message.error(data.message);
				}
			}).catch(error => { console.log(error) })
		},
		handleFileChange(file, fileList) {
			console.log('file: ', fileList[0]);
			this.invoice = fileList
		},
		beforeUpload(file) {
			const isPDF = file.type === 'application/pdf';
			if (!isPDF) {
				this.$message.error('Solo se pueden subir archivos en formato PDF');
			}
			return isPDF;
		},
		handleExceed(files, fileList) {
			this.$message.warning(
				`El límite es 1 archivo, haz cargado ${fileList.length} archivo esta vez`
			);
		},
		handleChangeCollapse(val) {
			console.log('Collapse vars: ', val);
			this.trackingId = val
		},
		trackingInWH(tracking) {
			if (tracking) {
				return tracking.length
			}
			return 0
		},
		get() {
			getWarehouse(this.data, null).then(({ data }) => {
				console.log('Track: ', data);
				this.trackings = data.trackings
				this.status = data.data
				if (data.data.length > 0) {
					this.warehouse = data.data[0]
				}
				this.loading = false
				this.loadingTracking = false
			}).catch(error => error)
		}
	}
}
</script>

<style lang="scss" scope>
.file-invoice {
	margin-top: 20px;

	.file-text {
		.file-btn-delete {
			margin-top: 20px;
		}
	}
}

.el-tabs__header {
	margin-bottom: 0
}

.el-badge__content {
	vertical-align: middle;
	background-color: #4a596a
}

.timeline {
	font-family: 'Exo'
}

.timeline-item {
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

.divider-custom {
	background-color: #DCDFE6;
	height: 1px;
	border: none;
	margin-top: 0px;
	margin-bottom: 0px;
}
</style>
