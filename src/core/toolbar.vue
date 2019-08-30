<template>
	<div class="toolbar flex align-center justify-space-between">
		<div class="box-left box grow flex">
			<button @click="toggleSidebar" v-if="menuBurger !== 'right'" class="toggle-sidebar card-base card-shadow--small">
				<i class="fal fa-bars"></i>
			</button>

			<!-- <search class="hidden-xs-only"></search> -->
		</div>
		<div class="box-right flex align-center pl-10">
			<el-button type="primary" size="small" plain class="accent-text" @click="$store.commit('openRightMenu', {active: true, component: 'prealert', title:  'Prealertar', icon: 'bells'})">
				<i class="fal fa-bells"> </i> Prealertar
			</el-button>
			<!-- <el-popover ref="popover" placement="bottom" :width="popoverWidth" trigger="click">
				<notification-box></notification-box>
			</el-popover> -->
			<el-badge :value="cantNotification" :max="9" class="notification-icon-badge">
				<el-button v-popover:popover icon="fal fa-bell" class="notification-icon" @click="$store.commit('openRightMenu', {active: true, component: 'notificationBox', title:  'Notificaciones', icon: 'bells'})"></el-button>
			</el-badge>
			<span class="username"><router-link to="/profile">{{ $store.getters.user.po_box }}</router-link></span>
			<el-dropdown trigger="click" @command="onCommand">
				<span class="el-dropdown-link">
					<img src="../assets/images/profile.png" class="avatar" alt="avatar">
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="/profile"><i class="fal fa-user-cog mr-10"></i> Perfil</el-dropdown-item>
					<el-dropdown-item command="logout" divided><i class="fal fa-sign-out-alt mr-10"></i> Salir</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

			<button @click="toggleSidebar" v-if="menuBurger === 'right'" class="toggle-sidebar toggle-sidebar__right card-base card-shadow--small">
				<i class="fal fa-bars"></i>
			</button>
		</div>
		<!-- <prealert :dialogvisible.sync="dialogvisiblePrealert" @submitPrealert="prealert()"></prealert> -->
	</div>
</template>

<script>
import NotificationBox from '@/components/NotificationBox'
import Search from '@/components/Search'
import Prealert from '@/components/Prealert'
import { cant } from '@/api/notification'
import { mapGetters } from 'vuex'

export default {
	name: 'Toolbar',
	props: ['menuBurger'],
	data() {
		return {
			popoverWidth: 300,
			fullscreen: false,
			lang: 'us',
			dialogvisiblePrealert: false,
		}
	},
	computed: {
		...mapGetters(['cantNotification'])
	},
	methods: {
		getCantNotification () {
			cant().then(({data}) => {
				if (data == 0) {
					data = null
				}
				this.$store.commit('setCantNotification', data)
			}).catch(error => error)
		},
		prealert(){
			this.dialogvisiblePrealert = false
			this.$store.commit('setSubmitPrealert', true)
		},
		onCommandLang(lang) {
			if(lang.charAt(0) === '/')
				this.onCommand(lang)
			else
				this.lang = lang
		},
		onCommand(path) {
			if (path == 'logout') {
				this.$store.dispatch('logout')
				return
			}
			this.$router.push(path)
		},
		toggleSidebar() {
			this.$emit('toggle-sidebar')
		},
		resizePopoverWidth() {
			if(window.innerWidth <= 768) {
				this.popoverWidth = 250
			} else {
				this.popoverWidth = 300
			}
		},
		toggleFullscreen() {
			this.$fullscreen.toggle(document.querySelector('body'), {
				wrap: false,
				callback: () => {this.fullscreen = this.$fullscreen.getState()}
			})
		}
	},
	components: {
		NotificationBox,
		Search,
		Prealert
	},
	mounted() {
		this.fullscreen = this.$fullscreen.getState()
		this.resizePopoverWidth();
		this.getCantNotification()
		window.addEventListener('resize', this.resizePopoverWidth);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizePopoverWidth);
	}
}
</script>

<style lang="scss" scoped>
	@import '../assets/scss/_variables';
	@import '../assets/scss/_mixins';

.toolbar {
	width: 100%;
	height: 100%;
	padding: 0 20px;
	box-sizing: border-box;

	.username {
		margin-left: 20px;
		font-weight: bold;
		@include text-bordered-shadow();

		a {
			color: $text-color;
			text-decoration: none;

			&:hover {
				color: $text-color-accent;
			}
		}
	}

	.avatar {
		border-radius: 50%;
		width: 35px;
		height: 35px;
		border: 1px solid #FFF;
		margin-left: 20px;
		box-sizing: border-box;
		display: block;
		cursor: pointer;
		box-shadow: 0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08);
		transition: box-shadow .5s;

		&:hover {
			box-shadow: 0px 3px 10px 0 rgba(49, 49, 93, 0.08), 0px 2px 7px 0 rgba(0, 0, 0, 0.08);
		}
	}

	.notification-icon {
		font-size: 20px;
		outline: none;
		padding: 0;
		background: transparent;
		border: none;
		margin-left: 20px;
		//color: #aab7c5;
		// color: transparentize($text-color, 0.7);
		@include text-bordered-shadow();

		&:hover {
			color: $text-color-accent;
		}
	}

	.toggle-sidebar {
		border: 1px solid transparent;
		height: 32px;
		min-height: 32px;
		line-height: 32px;
		width: 32px;
		min-width: 32px;
		max-width: 32px;
		box-sizing: border-box;
		text-align: center;
		margin: 0;
		outline: none;
		margin-right: 5px;
		font-size: 24px;
		padding: 0;
		cursor: pointer;
		display: inline-block;
		color: $text-color;
		background: white;
		display: none;
		opacity: 0;
		transition: all .5s;

		&__right {
			margin-right: 0px;
			margin-left: 5px;
		}

		&:hover, &:focus, &:active {
			color: $text-color-accent;
			border-color: $text-color-accent;
		}
	}

	.fullscreen-button {
		font-size: 24px;
		cursor: pointer;
		outline: none;
		padding: 0;
		background: transparent;
		border: none;
		margin-left: 20px;
		//color: #aab7c5;
		color: transparentize($text-color, 0.7);
		@include text-bordered-shadow();

		&:hover {
			color: $text-color-accent;
		}
	}

	.el-dropdown {
		.flag-icon {
			box-shadow: 0 2px 5px 0 rgba(49,49,93,.1), 0 1px 2px 0 rgba(0,0,0,.08);
			cursor: pointer;
			border: 1px solid lighten($background-color, 20%);
			background-color: lighten($background-color, 20%);
		}
	}
}

@media (max-width: 650px) {
	.toolbar {
		.username {
			display: none;
		}
	}
}

@media (max-width: 768px) {
	.toolbar {
		padding: 0 10px;

		.toggle-sidebar {
			display: block;
			opacity: 1;
		}

		.fullscreen-button {
			display: none;
		}
	}
}
</style>
