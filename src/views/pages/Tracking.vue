<template>
	<div class="page-contacts flex column" id="page-contacts">
		<div class="page-header">
			<h1 class="mb-2">{{ title }}</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="fal fa-home"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Trackings</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<el-row>
				<el-col :xs="24" :sm="24" :md="24" :lg="{span: 14, offset: 5}" :xl="{span: 14, offset: 5}">
		<resize-observer @notify="__resizeHanlder" />
		<div class="search-wrap flex align-center">
			<el-input v-model="search" placeholder="Buscar">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
				<p class="m-10" slot="suffix">{{trackingsFiltered.length}} trackings</p>
			</el-input>
		</div>
		<div class="card-shadow--small card-base p-0 contacts-root box grow flex gaps" :class="trackingClass">
			<div class="contacts-list box grow scrollable only-y">

								<transition-group name="fade">
					<div v-if="trackingsFiltered.length > 0" key="full" v-for="t in trackingsFiltered" :key="t.id" class="flex contact border-bottom" @click="openDialog(t)">
						<div class="star align-vertical p-10 fs-15">
							<i class="fal fa-badge-check align-vertical-middle" :style="'color:' + t.color" ></i>
						</div>
						<div class="avatar align-vertical">
							<i :class="t.icon + ' fa-2x align-vertical-middle'"></i>
							<!-- <img :src="'/static/images/users/user-'+c.id+'.jpg'" class="align-vertical-middle" alt="user avatar"> -->
						</div>
						<div class="info box grow flex">
								<div class="name box grow flex column justify-center p-0">
									<div class="fullname fs-22">{{ t.num_warehouse }}</div>
									<div class="fs-14 secondary-text">{{ t.fecha_status }}</div>
									<div class="fs-14 secondary-text">{{ t.descripcion }}</div>
									<div class="email">
										<p><strong>{{ trackingInWH(t.tracking) }}</strong> Trackings en esta caja.</p>
									</div>
								</div>
							<!-- <div class="phone align-vertical p-10"><span class="align-vertical-middle">{{c.date}}</span></div> -->
							</div>
					</div>
					<div v-if="trackingsFiltered.length <= 0" key="empty">
						<el-row :gutter="20" class="pt-50 o-050">
							<el-col v-if="loading" :span="24" class="text-center">
								<h1>Cargando trackings...</h1>
								<i class="fal fa-spinner fa-spin fa-7x m-a"></i>
							</el-col>
							<el-col v-else :span="24" class="text-center">
								<h1>No tiene trackings disponibles</h1>
								<i class="fal fa-box-open fa-7x m-a"></i>
							</el-col>
						</el-row>
					</div>
				</transition-group>
			</div>
		</div>
	</el-col>
</el-row>
		<tracking-dialog :dialogvisible.sync="dialogvisible" :data="warehouse" :dataHead="dataHead"></tracking-dialog>
	</div>
</template>

<script>
import TrackingDialog from '@/components/TrackingDialog'
import { getAllWarehouse, getWarehouse } from '@/api/tracking'
import { getUser } from '@/utils/auth'

export default {
	name: 'Tracking',
	components: {
		TrackingDialog
	},
	data() {
		return {
			loading: false,
			search: '',
			dialogvisible: false,
			pageWidth: 0,
			warehouse: [],
			trackings: [],
			dataHead: {}
		}
	},
	computed: {
		trackingsFiltered() {
			return this.trackings.filter(({num_warehouse, peso, descripcion}) => (num_warehouse+peso+descripcion).toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1)
		},
		trackingClass() {
			return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
		},
		title(){
			return this.$route.params.type
		}
	},
	watch:{
		title(newVal, oldVal){
			if (newVal != oldVal) {
				this.getData()
			}
		}
	},
	mounted() {
		this.setPageWidth()
		this.getData()
	},
	methods: {
		trackingInWH(tracking){
			if (tracking) {
				var result = tracking.split(',')
				return result.length
			}
			return 0
		},
		getData(){
			let me = this
			me.loading = true
			var user = getUser()
			getAllWarehouse(user.id, me.$route.params.status).then(({data}) => {
				this.trackings = data.data
				me.loading = false
			}).catch( error => error)
		},
		openDialog(data) {
			this.dataHead = data
			getWarehouse(data.num_warehouse, null).then(({data}) => {
				this.warehouse = data
			}).catch( error => error)

			// this.warehouse = data
			this.dialogvisible = true
		},
		setPageWidth() {
			this.pageWidth = document.getElementById('page-contacts').offsetWidth
		},
		__resizeHanlder: _.throttle(function (e) {
			this.setPageWidth()
		}, 700)
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
.page-header{
  margin-bottom: 0px !important
}
.page-contacts {
	height: 100%;
	margin: 0 !important;
	padding: 20px;
	padding-bottom: 10px;
	box-sizing: border-box;

	.search-card {
		padding: 50px;
		max-width: 350px;
		max-height: 320px;
		box-sizing: border-box;
		margin-bottom: 15px;

		.el-input, .el-button {
			width: 100%;
		}
	}

	.search-wrap {
		margin: 0 auto;
		margin-bottom: 10px;
		padding: 0px 30px;
		box-sizing: border-box;
		width: 100%;
		max-width: 600px;

		i {
			display: inline-block;
			width: 22px;
		}

		input {
			outline: none;
			background: transparent;
			border: none;
			font-size: 15px;
			position: relative;
			top: -2px;
			width: 100%;
			padding: 0;
			color: $text-color;
		}

		.contacts-tot {
			margin-right: 20px;
			margin-left: 10px;
		}

		a {
			border-bottom: 1px solid;
			text-decoration: none;
			color: $text-color;

			&:hover {
				opacity: .6;
			}
		}
	}

	.contacts-root {
		max-height: 100%;
	}

	.contacts-list {
		//margin: 0 auto;
		width: 100%;
		// max-width: 965px;
		padding: 0px 30px;
		box-sizing: border-box;

		.contact {
			margin: 10px 0;
			padding: 5px;
			box-sizing: border-box;
			cursor: pointer;
			transition: all .5s .25s;

			.star {
				.mdi-star {
					color: #ffd730;
				}
				.mdi-star-outline {
					opacity: .5;
				}
			}

			.avatar {
				width: 60px;
				transition: all .5s .25s;

				img {
					border: 1px solid transparentize($text-color, .9);
					box-sizing: border-box;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					transition: all .5s .25s;
				}
			}

			.info {
				word-break: break-word;

				.name {

					//.fullname {}

					.email {
						font-size: 1px;
						opacity: 0;
						line-height: 0;
						transition: all .5s .25s;
					}

					.phone {
						display: none;
					}
				}

				//.phone {}
			}

			&:hover {
				margin: 15px -20px;
				padding: 10px;
				background-color: lighten($background-color, 20%);
				border-radius: 5px;
				box-shadow: 0 4px 5px 0 rgba(40,40,90,.09),0 3px 6px 0 rgba(0,0,0,.065);

				// .avatar {
				// 	width: 90px;
				//
				// 	img {
				// 		width: 90px;
				// 		height: 90px;
				// 	}
				// }

				.info {
					.name {
						.email {
							opacity: 1;
							line-height: 1.4;
							font-size: 14px;
						}
					}
				}
			}
		}
	}

	.contacts-root {
		&.medium {
			.search-card {
				padding: 20px;
				max-width: 260px;
				max-height: 260px;
			}
		}
		&.small {
			overflow-y: auto;
			display: block;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			padding: 5px;

			.search-card {
				padding: 20px;
				max-width: 100%;
				width: 100%;
				//max-height: 240px;
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}

			.contacts-list {
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}
		}
	}
}

@media (max-width: 768px) {
	.page-contacts {
		.search-wrap {
			padding: 0;
		}
		.contacts-list {
			padding: 0px;

			.contact {
				.avatar {
					width: 50px;

					img {
						width: 40px;
						height: 40px;
					}
				}

				.info {
					.phone {
						display: none;
					}

					.name {
						.phone {
							display: block;
						}
					}
				}

				&:hover {
					margin: 15px 0px;

					.avatar {
						width: 60px;

						img {
							width: 60px;
							height: 60px;
						}
					}
				}
			}
		}

		.contacts-root {
			&.medium {
				.contacts-list {
					padding: 0 30px;
				}
			}
			&.small {
				.contacts-list {
					padding: 8px;
				}
			}
		}
	}
}
</style>
