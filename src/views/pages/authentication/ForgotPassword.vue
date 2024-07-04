<template>
	<vue-scroll class="forgot-password-page align-vertical" id="background"
		v-bind:style="{ 'background-image': 'url(' + require('../../../assets/images/img_login.jpg') + ')' }">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img v-show="img" class="image-logo" :src="img" alt="logo" />
				<el-alert title="Ingresa tu email para recuperar tu contraseña" type="info" show-icon>
				</el-alert>
				<float-label class="styled">
					<input type="email" placeholder="E-mail" v-model="email">
				</float-label>

				<div class="flex text-center center pt-20 pb-10">
					<el-button type="warning" size="small" @click="sendEmailForgotPassword" class="send-btn tada animated"
						:loading="loading">
						Recuperar contraseña
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
import { sendPasswordReset } from "@/api/user";
export default {
	name: 'ForgotPassword',
	data() {
		return {
			img: "",
			email: "",
			loading: false,
		}
	},
	created() {
		this.getImg();
	},
	methods: {
		sendEmailForgotPassword() {
			let me = this
			sendPasswordReset({
				"email": me.email,
				"agencyId": this.$route.params.agency_id
			}).then(({data}) => {
				console.log("data:", data);
			}).catch(function (error) {
          me.loading = false;
          // this.$message.error('Error registrar cliente.')
          console.log(error);
        });
		},
		goToLogin() {
			this.$router.push({ path: '/login/' + this.$route.params.agency_id });
		},
		getImg() {
			var id = atob(this.$route.params.agency_id);
			getLogo(id)
				.then(({ data }) => {
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
