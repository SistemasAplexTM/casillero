<template>
	<div class="page-contacts flex column" id="page-contacts">
		<div class="page-header">
			<h1 class="mb-2">Prealertas</h1>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }"><i class="fal fa-home"></i></el-breadcrumb-item>
				<el-breadcrumb-item>Prealertas</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<resize-observer @notify="__resizeHanlder" />
		<div class="search-wrap flex align-center">
			<el-input v-model="search" placeholder="Buscar">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
				<p class="m-10" slot="suffix">{{ prealertsFiltered.length }} prealertas</p>
				<template slot="append">
					<el-button type="success" icon="el-icon-plus" circle
						@click="$store.commit('openRightMenu', { active: true, component: 'prealert', title: 'Prealertar', icon: 'bells' })"></el-button>
				</template>
			</el-input>
		</div>
		<!-- <el-row> -->
		<el-col class="card-shadow--small card-base p-0 contacts-root box grow flex gaps" :class="trackingClass"
			:xs="24" :sm="24" :md="24" :lg="{ span: 14, offset: 5 }" :xl="{ span: 14, offset: 5 }">
			<!-- <div > -->
			<div class="contacts-list box grow scrollable only-y">

				<transition-group name="fade">
					<div v-if="prealertsFiltered.length > 0" key="full" v-for="t in prealertsFiltered" :key="t.id"
						class="flex contact border-bottom">
						<div class="star align-vertical p-10 fs-15">
							<el-badge class="align-vertical-middle"
								:value="t.despachar == 0 ? 'Esperar' : 'Despachar'" />
							<!-- <i class="fal fa-badge-check align-vertical-middle" :style="'color:' + t.color" ></i> -->
						</div>
						<div class="avatar align-vertical">
							<i class="fal fa-truck fa-2x align-vertical-middle"></i>
							<!-- <img :src="'/static/images/users/user-'+c.id+'.jpg'" class="align-vertical-middle" alt="user avatar"> -->
						</div>
						<div class="info box grow flex">
							<div class="name box grow flex column justify-center p-0">
								<div class="fullname fs-22">{{ t.tracking }}</div>
								<div class="fs-14 secondary-text"> <small>Instrucción: </small> <strong> {{
									t.instruccion
								}} </strong> </div>
								<div class="fs-14 secondary-text"> <small>Contenido: </small> <strong>{{
									t.contenido
								}}</strong> </div>
								<div class="fs-14 secondary-text"> <small>Declarado ($USD): </small> <strong>$ {{
									t.declarado
								}}</strong> </div>
								<div class="fs-14 secondary-text">{{ t.created_at }}</div>
							</div>
							<!-- <div class="phone align-vertical p-10"><span class="align-vertical-middle">{{c.date}}</span></div> -->
						</div>
					</div>
					<div v-if="prealertsFiltered.length <= 0" key="empty">
						<el-row :gutter="20" class="pt-50 pb-50 o-050">
							<el-col v-if="loading" :span="24" class="text-center">
								<h1>Cargando prealertas...</h1>
								<i class="fal fa-spinner fa-spin fa-7x m-a"></i>
							</el-col>
							<el-col v-else :span="24" class="text-center">
								<h1>No se encontraron prealertas</h1>
								<i class="fal fa-box-open fa-7x m-a"></i>
							</el-col>
						</el-row>
					</div>
				</transition-group>
			</div>
			<!-- </div> -->
		</el-col>
		<!-- </el-row> -->
	</div>
</template>

<script>
import Prealert from '@/components/Prealert'
import { getAllPrealert } from '@/api/prealert'
import { getUser } from '@/utils/auth'
import { mapActions, mapGetters } from 'vuex'

export default {
	components: { Prealert },
	data() {
		return {
			loading: false,
			// prealerts: [],
			pageWidth: 0,
			search: ''
		}
	},
	computed: {
		...mapGetters(['prealerts']),
		prealertsFiltered() {
			return this.prealerts.filter(({ tracking, }) => (tracking).toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1)
		},
		trackingClass() {
			return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
		},
		create() {
			return this.$route.params.create
		}
	},
	mounted() {
		this.setPageWidth()
		this.getPrealert().then(data => {
			// this.prealerts = data
		}).catch(error => error)
	},
	methods: {
		...mapActions(['getPrealert']),
		// getData(){
		//   let me = this
		// 	   me.loading = true
		//   var user = getUser()
		//   getAllPrealert(user.agencia_id, user.id).then(({data}) => {
		//     this.prealerts = data.data
		//   	me.loading = false
		//   }).catch(error => { console.log(error) })
		// },
		refresh() {
			this.getData()
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

.page-header {
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

		.el-input,
		.el-button {
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
				box-shadow: 0 4px 5px 0 rgba(40, 40, 90, .09), 0 3px 6px 0 rgba(0, 0, 0, .065);

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
