<template>
	<div class="page-profile-edit pt-20">
		<el-form ref="form" :model="form" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Documento">
						<el-input size="small" v-model="form.documento"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Correo">
						<el-input size="small" v-model="form.correo" type="email" disabled/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Primer nombre">
						<el-input size="small" v-model="form.primer_nombre"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Segundo nombre">
						<el-input size="small" v-model="form.segundo_nombre"/>
					</el-form-item>
				</el-col>
			</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Primer apellido">
						<el-input size="small" v-model="form.primer_apellido"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Segundo apellido">
						<el-input v-model="form.segundo_apellido"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Teléfono">
						<el-input size="small" v-model="form.telefono" placeholder=""/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Celular">
						<el-input size="small" v-model="form.celular" placeholder=""/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Dirección">
						<el-input size="small" v-model="form.direccion"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Código postal">
						<el-input v-model="form.zip"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Ciudad">
						<city-component @get="form.localizacion_id = $event.id" :selected="form.city"/>
						<!-- <el-input v-model="form.localizacion_id"/> -->
					</el-form-item>
				</el-col>
				<!-- <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Country">
						<el-input v-model="form.country"/>
					</el-form-item>
				</el-col> -->
			</el-col>
			<el-col class="col-p">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Actualizar</el-button>
					<el-button>Cancelar</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
import { update, find } from '@/api/user'
import CityComponent from '@/components/CityComponent'

export default {
	name: 'ProfileEdit',
	components: { CityComponent },
	data() {
		return {
			form: {
				id: null,
				documento: '',
				primer_nombre: '',
				segundo_nombre: '',
				primer_apellido: '',
				segundo_apellido: '',
				direccion: '',
				telefono: '',
				correo: '',
				zip: '',
				celular: '',
				localizacion_id: ''
			},
			labelPosition: 'top'
		}
	},
	methods: {
		onSubmit() {
			update(this.form).then(({data}) => {
				if (data.code == 200) {
					this.$message.success('Actualizado con éxito.')
				}
			}).catch(error => { console.log(error) })
		},
		setData(){
			find(this.$store.getters.user.id).then(({data}) => {
				this.form = data.data[0]
			}).catch(error => error)
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'
			}
		}
	},
	mounted() {
		this.resizeLabelPosition();
		this.setData();
		window.addEventListener('resize', this.resizeLabelPosition);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-profile-edit {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
}
</style>
