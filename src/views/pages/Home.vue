<template>
	<vue-scroll>
		<el-row :gutter="12">
		    <el-col :span="24" class="text-center lh-1 mb-5">
	        <h3 class="m-0 font-weight-300">Mi Casillero</h3>
					<h2 class="m-0 font-weight-900 accent-text">RAMÓN OCAMPO TENORIO</h2>
					<h3 class="m-0">
						7546 NW 70 Ave
					</h3>
					<p class="m-0 font-weight-400" >Miami, FL, 33166</p>
					<h2 class="m-5 font-weight-900 accent-text">W1-1326</h2>
		    </el-col>
		</el-row>
		<el-row class="mt-0" :gutter="15">
			<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        <div class="card-base card-shadow--small mb-10 pointer" v-loading="loading" @click="select('tracking')">
          <div class="ph-10 p-3">
            <div class="flex justify-center align-center">
              <div class="mr-0 animated fadeInRight" style="margin-right: -5px">
                <i class="fal fa-plane accent-text fa-5x icon-card r320"></i>
              </div>
              <div class="box grow  animated fadeInLeft lh-1">
                <h1 class="m-0 text-truncate">
                  Tránsito
                </h1>
                <div class="o-060 mt-0  pt-0 pb-0 font-size-12">
                  Encuentre aquí los <strong>recibos</strong> que están en <strong>tránsito</strong> a su dirección de entrega.
                </div>
              </div>
              <div class="box">
                <h1 class="h-big m-0 ml-10 font-weight-900">5</h1>
              </div>
            </div>
          </div>
        </div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        <div class="card-base card-shadow--small mb-10 pointer" v-loading="loading">
          <div class="ph-10 p-3">
            <div class="flex justify-center align-center">
              <div class="mr-10 animated fadeInRight">
                <i class="fal fa-shopping-bag accent-text fa-5x icon-card r100"></i>
              </div>
              <div class="box grow animated fadeInLeft lh-1">
                <h1 class="m-0 text-truncate">
                  Casillero
                </h1>
                <div class="o-050 pt-0 pb-0 font-size-12">
                  Encuentre aquí los <strong>trackings</strong> que hemos <strong>recibido</strong> en nuestra bodega.
                </div>
              </div>
              <div class="box">
                <h1 class="h-big m-0 ml-10 font-weight-900">1</h1>
              </div>
            </div>
          </div>
        </div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        <div class="card-base card-shadow--small mb-10 pointer" v-loading="loading">
          <div class="ph-10 p-3">
            <div class="flex justify-center align-center">
              <div class="mr-0 animated fadeInRight">
                <i class="fal fa-bell-school accent-text fa-5x icon-card r100"></i>
              </div>
              <div class="box grow animated fadeInLeft lh-1">
                <h1 class="m-0 text-truncate">
                  Prealertado
                </h1>
                <div class="o-050 pt-0 pb-0 font-size-12">
                  Estos son los <strong>trackings</strong> que usted nos ha <strong>prealertado</strong> de su llegada.
                </div>
              </div>
              <div class="box">
                <h1 class="h-big m-0 ml-10 font-weight-900">0</h1>
              </div>
            </div>
          </div>
        </div>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="6">
        <div class="card-base card-shadow--small mb-20 pointer" v-loading="loading">
          <div class="ph-10 p-3">
            <div class="flex justify-center align-center">
              <div class="mr-20 animated fadeInRight">
                <i class="fal fa-file-invoice-dollar accent-text fa-5x icon-card r100"></i>
              </div>
              <div class="box grow animated fadeInLeft lh-1">
                <h1 class="m-0 text-truncate">
                  Facturas
                </h1>
                <div class="o-050 pt-0 pb-0 font-size-12">
                  Esta es la relación de las <strong>facturas</strong> pendientes de pago.
                </div>
              </div>
              <div class="box">
                <h1 class="h-big m-0 ml-10 font-weight-900">4</h1>
              </div>
            </div>
          </div>
        </div>
			</el-col>
		</el-row>
	</vue-scroll>
</template>

<script>
export default {
	name: 'Home',
	data () {
		return {
      loading: false
		}
	},
	created(){
    setTimeout(function () {
      this.loading = false
    }, 1000);
	},
	methods: {
		select(route){
			this.$router.push(route);
		}
	}
}
</script>

<style media="screen">
.icon-card{
  margin-left: -40px;
  margin-top: -20px;
	/* opacity: 0.5 */
}
.casillero{
	margin-left: -50px;
}
.r320{
  transform: rotate(310deg);
}
.r100{
  transform: rotate(30deg);
}
</style>
