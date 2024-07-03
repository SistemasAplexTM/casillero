<template>
	<vue-scroll class="forgot-password-page align-vertical"
		v-bind:style="{ 'background-image': 'url(' + require('../../../assets/images/img_login.jpg') + ')' }">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img v-show="img" class="image-logo" :src="img" alt="logo" />
				<el-alert title="Ingresa tu email para recuperar tu contraseña" type="info" show-icon>
				</el-alert>
				<float-label class="styled">
					<input type="email" placeholder="E-mail">
				</float-label>

				<div class="flex text-center center pt-20 pb-10">
					<el-button plain size="small" @click="sendEmailForgotPassword" class="send-btn tada animated" :loading="loading">
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
export default {
	name: 'ForgotPassword',
	data() {
		return {
			img: "",
			loading:false,
		}
	},
	created() {
    this.getImg();
  },
	methods: {
		sendEmailForgotPassword() {
			// this.$store.commit('setLogin')
			// this.$router.push('login')
		},
		goToLogin() {
      this.$router.push({ path: '/login/'+this.$route.params.agency_id });
    },
		getImg() {
      var id = atob(this.$route.params.agency_id);
      getLogo(id)
        .then(({ data }) => {
          console.log(data);
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
