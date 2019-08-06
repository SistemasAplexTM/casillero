<template>
	<div class="scrollable">
		<div class="page-header">
			<h1 class="mb-2">Pago en Línea</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="fal fa-home"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Pago en Línea</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row type="flex" justify="center" v-if="actived">
    <el-col :lg="4" :xs="24">
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">

						<input type="hidden" name="cmd" value="_xclick">
						<input type="hidden" name="business" :value="email_agency">


						<strong>Número de Guía: </strong><br>
						<el-input placeholder="" v-model="item_number" name="item_number"></el-input>

						<strong>Monto: </strong><br>
						<!-- <input type="text" ><br><br> -->
						<el-input placeholder="" v-model="amount" id="a" name="amount"></el-input>
						<!-- <input type="hidden" name="amount"> -->
						<input type="hidden" name="item_name" :value="item_name.nombre_full">
						<input type="hidden" name="no_shipping" value="0">
						<input type="hidden" name="no_note" value="1">
						<input type="hidden" name="currency_code" value="USD">
						<input type="hidden" name="lc" value="AU">

						<br><br>
						<el-button type="primary" native-type="submit" class="w100" icon="fab fa-paypal">
								Pagar con PayPal
							</el-button>
						<!-- <input type="submit" value="Pagar con PayPal"> -->

					</form>
    </el-col>
		</el-row>
		<el-row v-else type="flex" justify="center" class="text-center">
		    <el-col :span="24">
		        <h1 v-if="actived == null">Validando...</h1>
		        <h1 v-else>No está disponible</h1>
		    </el-col>
		</el-row>
	</div>
</template>

<script>
import { getUser } from '@/utils/auth'
import { getPaypal } from '@/api/integrations'
export default {
	name: 'Invoice',
	data(){
		return {
			amount: null,
			item_number: null,
			item_name: getUser(),
			actived: null,
			email_agency: null
		}
	},
	mounted(){
		this.validateIntegration()
	},
	methods: {
		validateIntegration(){
			var result = null
			getPaypal(this.item_name.agencia_id).then(({data}) => {
				if (data.data) {
					result = JSON.parse(data.data.value)
					this.email_agency = result.email
					this.actived = result.actived
				}
			}).catch(error => error)
		}
	}
}
</script>

<style lang="scss">

</style>
