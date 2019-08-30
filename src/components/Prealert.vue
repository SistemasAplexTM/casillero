<template>
	<div class="">
		<!-- <el-dialog :show-close="true" :custom-class="'tracking-dialog'" id="tracking-dialog" :visible="dialogvisible" @close="$emit('update:dialogvisible', false)"> -->
		<!-- <div slot="title" class="bg-accent white-text p-15 flex"> -->
		<!-- <div class="info box grow flex">
			<i class="fal fa-bells fa-2x m-a"></i>
			<div class="box grow flex white-text column justify-center p-0 ml-15">
				<div class="fs-22">Nueva prealerta</div>
			</div>
			<i class="fal fa-bells fa-5x o-010"></i>
		</div> -->
		<!-- </div> -->
		<div class="pt-10 p-20">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="top" class="demo-ruleForm">
				<el-form-item label="Tracking" prop="tracking">
					<el-input v-model="ruleForm.tracking"></el-input>
				</el-form-item>
				<el-form-item label="Contenido" prop="contenido">
					<el-input type="textarea" v-model="ruleForm.contenido"></el-input>
				</el-form-item>
				<el-form-item label="Instrucción" prop="instruccion">
					<el-input type="textarea" v-model="ruleForm.instruccion"></el-input>
				</el-form-item>
				<el-form-item label="Despachar" prop="despachar">
					<el-switch v-model="ruleForm.despachar"></el-switch>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">Aceptar</el-button>
					<el-button @click="resetForm('ruleForm')">Reset</el-button>
				</el-form-item>
			</el-form>
		</div>
		<!-- </el-dialog> -->
	</div>
</template>

<script>
import { setPrealert } from '@/api/prealert'

export default {
	name: 'Prealert',
	props: ['data', 'dialogvisible'],
	data() {
		return {
			loading: false,
			ruleForm: {
        tracking: '',
        contenido: '',
        instruccion: '',
        consignee_id: '',
				agencia_id: '',
				despachar: false
      },
			rules: {
        tracking: [
          { required: true, message: 'Campo requerido', trigger: 'blur' }
        ],
        contenido: [
          { required: true, message: 'Campo requerido', trigger: 'blur' }
        ],
        instruccion: [
          { required: true, message: 'Campo requerido', trigger: 'blur' }
        ]
      }
		}
	},
	methods:{
		submitForm(formName) {
			this.loading = true
			 this.$refs[formName].validate((valid) => {
				 if (valid) {
					 this.ruleForm.consignee_id = this.$store.getters.user.id
					 this.ruleForm.agencia_id = this.$store.getters.user.agencia_id
					 this.ruleForm.correo = this.$store.getters.user.correo
					 setPrealert(this.ruleForm).then(({data}) => {
						 if (data.message) {
						 	 this.$message.error(data.message);
						 }else{
							 this.resetForm('ruleForm')
							 this.$emit('submitPrealert')
							 this.$store.dispatch('getPrealert')
							 this.$store.dispatch('getCantPrealertF')
						 }
						 this.loading = false
					 }).catch(error => { console.log(error) })
				 } else {
					 console.log('error submit!!');
						this.loading = false
					 return false;
				 }
			 });
		 },
		 resetForm(formName) {
			 this.$refs[formName].resetFields();
		 }
	}
}
</script>
<style lang="scss">
.el-dialog__headerbtn .el-dialog__close{
	color: white;
}
.el-tabs__header{
	margin-bottom: 0
}
.el-badge__content{
	vertical-align: middle;
	background-color: #4a596a
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
