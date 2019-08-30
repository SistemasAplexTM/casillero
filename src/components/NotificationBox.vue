<template>
	<div class="notification-box">
	 <el-divider/>
	 <transition-group name="fade" mode="out-in">
		<div v-if="notifications.length > 0 && !loading" key="full" class="mb-0 flex pointer notification" v-for="n in notifications" :key="n.id">
			<div class="pt-15 pb-15 pr-15 w-15 text-center danger-text" >
				<i :style="'color: '+ n.data.color" class="fa-2x" :class="n.data.icon"></i>
			</div>
			<div class="w-100" @click="select(n)">
				<h3 class="mb-5 mt-0" :style="'color: '+ n.data.color" v-if="n.data.tracking">{{ n.data.tracking }}</h3>
				<h3 class="mb-5 mt-0" :style="'color: '+ n.data.color" v-if="n.data.warehouse">{{ n.data.warehouse }}</h3>
				<h4 class="mb-5 mt-0">{{ n.data.title }}</h4>
				<p class="mt-5 mb-10 info-text">{{ n.data.desc }}</p>
				<small class="accent-text">
					<el-link ><i class="el-icon-view el-icon--right"></i> </el-link>
					<span class="fr">
						{{ n.created_at }}
						<i class="fal fa-clock"></i>
					</span>
				</small>
				<el-divider class="m-0" style="margin: 10px"></el-divider>
			</div>
		</div>
		</transition-group>
		<div v-if="notifications.length > 0" @click="check" class="see-all text-center accent-text pointer mt-20">Marcar todo como leído</div>
			<skeleton-loading v-if="loading" class="">
				<row v-for="i in 5":key="i" :gutter="{top: '10px', bottom: '10px'}">
					<column :span="3" :gutter="10">
						<circle-skeleton></circle-skeleton>
					</column>
					<column :span="20" :gutter="8">
						<square-skeleton :count="3" :boxProperties="{bottom: '10px',height: '15px'}" :style="`width: ${Math.floor(Math.random() * 51) + 70}%;`">
						</square-skeleton>
					</column>
				</row>
			</skeleton-loading>
			<transition name="fade" >
				<div v-if="!loading">
					<el-row v-if="notifications.length <= 0" :gutter="20" class="m-0 o-050">
						<el-col :span="24" class="text-center p-50">
							<h1>No se encontraron notificaciones</h1>
							<i class="fal fa-bell-slash fa-7x m-a"></i>
						</el-col>
					</el-row>
				</div>
			</transition>
	</div>
</template>

<script>
import { getNotification, viewedAll } from '@/api/notification'

export default {
	name: 'NotificationBox',
	data () {
		return {
			notifications: [],
			loading: false
		}
	},
	created () {
		this.get()
	},
	methods: {
		select (item) {
			if (item.data.warehouse) {
				this.$store.commit('openRightMenu', {active: true, component: 'trackingDetail', title:  'Detalle de tracking', icon: item.data.icon, data: item.data.warehouse})
			}
			if (item.data.tracking) {
				this.$message({
          message: item.data.tracking,
          type: 'success'
        });
				// this.$store.commit('openRightMenu', {active: true, component: 'prealert', title:  'Prealertar', icon: 'bells'})
			}
		},
		check () {
			viewedAll().then(data => {
				this.get()
				this.$store.commit('setCantNotification', null)
				this.$message({
          message: 'Notificaciones leídas.',
          type: 'success'
        });
			}).catch(error => error)
		},
		get () {
			this.loading = true
			getNotification().then(({data}) => {
				this.notifications = data
				this.loading = false
			}).catch(error => error)
		},
		viewed () {
			this.loading = true
			viewedAll().then(({data}) => {
				this.notifications = data
				this.loading = false
			}).catch(error => error)
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/scss/_variables';
.el-divider {
	margin-top: 10px;
	margin-bottom: 10px;
}
.notification {

}
.notification:hover{
	opacity: 0.7;
}
</style>
