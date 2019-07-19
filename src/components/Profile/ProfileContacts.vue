<template>
	<div class="page-contacts flex column" id="page-contacts">
		<resize-observer @notify="__resizeHanlder" />
		<div class="search-wrap flex align-center">
			<el-input v-model="search" placeholder="Buscar">
				<i slot="prefix" class="el-input__icon el-icon-search"></i>
				<!-- <p class="m-10" slot="suffix">{{contactsFiltered.length}} contactos</p> -->
        <template slot="append">
          <el-button type="success" icon="el-icon-plus" circle @click="dialogvisible=true"></el-button>
        </template>
			</el-input>
		</div>
		<div class="c" :class="trackingClass">
			<div class="contacts-list box grow scrollable only-y">
				<transition-group name="fade">
					<div v-if="contactsFiltered.length > 0" key="full" v-for="t in contactsFiltered" :key="t.id" v-show="t.nombre" class="flex contact border-bottom">
						<div class="avatar align-vertical ml-10">
							<i class="fal fa-user fa-2x align-vertical-middle"></i>
						</div>
						<div class="info box grow flex">
							<div class="name box grow flex column justify-center p-0">
								<div class="fullname fs-22">{{ t.nombre }}</div>
								<div class="fs-14 secondary-text">{{ t.telefono }}</div>
								<div class="fs-14 secondary-text">{{ t.ciudad }}</div>
							</div>
							<!-- <div class="phone align-vertical p-10"><span class="align-vertical-middle">{{c.date}}</span></div> -->
						</div>
					</div>
					<div v-if="contactsFiltered.length <= 0" key="empty">
						<el-row :gutter="20" class="pt-50 o-050">
							<el-col v-if="loading" :span="24" class="text-center">
								<h1>Cargando contactos...</h1>
								<i class="fal fa-spinner fa-spin fa-7x m-a"></i>
							</el-col>
							<el-col v-else :span="24" class="text-center">
								<h1>No tiene contactos</h1>
								<i class="fal fa-box-open fa-7x m-a"></i>
							</el-col>
						</el-row>
					</div>
				</transition-group>
			</div>
		</div>
		<contact-dialog :dialogvisible.sync="dialogvisible" @submitPrealert="refresh"></contact-dialog>
	</div>
</template>

<script>
import ContactDialog from '@/components/ContactDialog'
import { getAllPrealert } from '@/api/prealert'
import { getUser } from '@/utils/auth'
import { getContacts } from '@/api/user'

  export default {
    components: {
  		ContactDialog
  	},
    data() {
      return {
        loading: false,
        contacts: [],
        pageWidth: 0,
        search: '',
        dialogvisible: false,
      }
    },
    computed: {
  		contactsFiltered() {
  			return this.contacts.filter(({nombre}) => (nombre != null).toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1)
  		},
  		trackingClass() {
  			return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
  		}
  	},
    mounted() {
  		this.setPageWidth()
  		// this.getData()
  	},
    methods: {
      getData(){
        let me = this
  						me.loading = true
        var user = getUser()
        getContacts(user.id).then(({data}) => {
									data = JSON.parse(data.data.contactos_json)
									console.log(data);
									if (data) {
										 this.contacts = data.campos
									}
										me.loading = false
        }).catch(error => { console.log(error) })
      },
      refresh(){
        this.getData()
        this.dialogvisible = false
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
	padding-top: 30px;
	padding-bottom: 50px;
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
