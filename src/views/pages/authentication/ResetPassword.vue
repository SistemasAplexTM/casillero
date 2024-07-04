<template>
	<vue-scroll class="forgot-password-page align-vertical" id="background"
		v-bind:style="{ 'background-image': 'url(' + require('../../../assets/images/img_login.jpg') + ')' }">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge" v-loading="loadingPanel">
				<img v-show="img" class="image-logo" :src="img" alt="logo" />
				<el-alert title="Ingresa una contraseña nueva" type="info" show-icon :closable="false">
				</el-alert>
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="form-password">
					<el-form-item prop="password">
						<el-input v-model="ruleForm.password" :min="8" placeholder="Contraseña" show-password autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item prop="confirm_password">
						<el-input v-model="ruleForm.confirm_password" placeholder="Confirma la contraseña" show-password
							autocomplete="off"></el-input>
					</el-form-item>
				</el-form>
				<div class="flex text-center center pt-20 pb-10">
					<el-button type="success" size="small" @click="changePassword" class="send-btn tada animated"
						:loading="loading">
						Actualizar mi contraseña
					</el-button>
				</div>
				<div class="flex text-center center pt-20 pb-10">
					<el-link type="primary" icon="el-icon-user" @click="goToLogin">Iniciar de sesión</el-link>
				</div>
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import { getLogo } from "@/api/login";
import { validateToken, updatePassword } from "@/api/user";
export default {
	name: 'ResetPassword',
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('Por favor, ingresa una contraseña'));
			} else if (value.length < 8) {
        callback(new Error("Necesitas 8 caracteres como minimo"));
      } else {
				if (this.ruleForm.confirm_password !== '') {
					this.$refs.ruleForm.validateField('confirm_password');
				}
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('Por favor, repite la contraseña'));
			} else if (value !== this.ruleForm.password) {
				callback(new Error('Las contraseñas no coinciden!'));
			} else {
				callback();
			}
		};
		return {
			img: "",
			loading: false,
			loadingPanel: false,
			ruleForm: {
				password: '',
				confirm_password: ''
			},
			rules: {
				password: [
					{ validator: validatePass, trigger: 'blur' }
				],
				confirm_password: [
					{ validator: validatePass2, trigger: 'blur' }
				]
			}
		}
	},
	created() {
		this.getImg();
		this.validateTokens();
	},
	methods: {
		validateTokens() {
			let me = this
			me.loadingPanel = true;
			validateToken({
				"token": me.$route.params.token,
				"agencyId": me.$route.params.agency_id
			}).then(({ data }) => {
				if (data.code != 200) {
					me.$swal
						.fire({
							title: data.message,
							text: "Intenta recuperar tu contraseña nuevamente por favor",
							icon: "warning",
						}).then((result) => {
							if (result.isConfirmed) {
								this.$router.push({ path: '/login/' + this.$route.params.agency_id });
							}
						});
				}
				me.loadingPanel = false;
			}).catch(function (error) {
				console.log('Error: ', error);
				me.loadingPanel = false;
				me.$message.error('Error:' + error)
			});
		},
		changePassword() {
			let me = this
			me.loading = true;
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					updatePassword(me.ruleForm).then(({ data }) => {
						if (data.code === 200) {
							me.$swal
								.fire({
									title: data.message,
									icon: "success",
									confirmButtonText: "Volver al login"
								}).then((result) => {
									if (result.isConfirmed) {
										this.$router.push({ path: '/login/' + this.$route.params.agency_id });
									}
								});
						}else{
							me.$message.error('Error:' + data.message)
						}
						me.loadingPanel = false;
					}).catch(function (error) {
						console.log('Error: ', error);
						me.loadingPanel = false;
						me.$message.error('Error:' + error)
					});
				} else {
					me.$message.error('Por favor, completa el formulario')
					return false;
				}
			});
		},
		goToLogin() {
			this.$router.push({ path: '/login/' + this.$route.params.agency_id });
		},
		getImg() {
			var id = atob(this.$route.params.agency_id);
			// console.log("params:",this.$route.params);
			getLogo(id)
				.then(({ data }) => {
					// console.log(data);
					this.img = process.env.VUE_APP_ROOT_IMG + "/" + data.data.logo;
					document.title = 'Casillero ' + data.data.descripcion
				})
				.catch(error => error);
		},
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

#background {
	background-repeat: no-repeat;
	background-size: cover;
	z-index: 1;
}

#background::after {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.6);
	z-index: -1;
	// background-color: rgba(0,0,0,0.10);
	// filter:brightness(0.1);
}

.form-password {
	margin-top: 20px;
}


.forgot-password-page {
	background: $text-color;
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}

	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 150px;
			margin: 0px auto;
			margin-bottom: 30px;
			display: block;
		}

		.send-btn {
			width: 160px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.forgot-password-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
