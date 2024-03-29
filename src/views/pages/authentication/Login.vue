<template>
  <vue-scroll
    class="login-page align-vertical"
    id="background"
    v-bind:style="{ 'background-image': 'url(' + require('../../../assets/images/img_login.jpg') + ')' }"
  >
    <div class="form-wrapper align-vertical-middle">
      <div class="form-box card-base card-shadow--extraLarge">
        <img v-show="img" class="image-logo" :src="img" alt="logo" />
        <float-label class="styled">
          <input v-model="email" type="email" placeholder="Correo" autofocus @keyup.enter="Login" />
        </float-label>
        <float-label class="styled">
          <input v-model="password" type="password" placeholder="Contraseña" @keyup.enter="Login" />
        </float-label>
        <br />
        <el-alert
          v-show="error"
          title="Error al iniciar sesión"
          type="error"
          :description="errorMsg"
          show-icon
        ></el-alert>
        <div class="flex text-center center pt-30 pb-10">
          <el-button
            plain
            size="small"
            @click="Login"
            class="login-btn tada animated"
            :loading="loading"
          >Entrar</el-button>
        </div>
      </div>
    </div>
  </vue-scroll>
</template>

<script>
import { login } from "@/api/login";
import { setToken, setUser, setAgency } from "@/utils/auth";
import { getLogo } from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      errorMsg: "",
      loading: false,
      img: ""
    };
  },
  created() {
    this.getImg();
  },
  methods: {
    Login() {
      this.loading = true;
      var agency_id = atob(this.$route.params.agency_id);
      login(this.email, this.password, agency_id, false)
        .then(({ data }) => {
          this.$store.commit("setLogin");
          setToken(data.access_token);
          setUser(data.user);
          setAgency(data.agencia);
          this.loading = false;
          location.reload();
          // this.$router.push({ path: "/" });
        })
        .catch(error => {
          this.error = true;
          this.loading = false;
          this.errorMsg = error.errors;
          console.log(error);
        });
    },
    getImg() {
      var id = atob(this.$route.params.agency_id);
      getLogo(id)
        .then(({ data }) => {
          this.img = process.env.VUE_APP_ROOT_IMG + "/" + data.data.logo;
          document.title = 'Casillero ' + data.data.descripcion
        })
        .catch(error => error);
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/_variables";

#background {
  // background-image: url('../../../assets/images/contenedores-marítimos-848x450.jpg');
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

.login-page {
  // background: $text-color;

  // max-width: 100%;

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

    .login-btn,
    .social-btn {
      width: 160px;

      &.google {
        margin-bottom: 10px;
        background-color: #d73d32;
        color: white;

        &:hover {
          border-color: #d73d32;
        }
      }
      &.facebook {
        background-color: #3f5c9a;
        color: white;

        &:hover {
          border-color: #3f5c9a;
        }
      }
    }

    .signin-box {
      font-size: 14px;
    }
  }
}

@media (max-width: 768px) {
  .layout-container .container .view.login-page {
    margin-left: -5px;
    margin-right: -5px;
    max-width: calc(100% + 10px);
  }
}
</style>
