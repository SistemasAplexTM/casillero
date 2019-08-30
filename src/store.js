import { removeToken, removeUser, removeAgency, getUser } from '@/utils/auth'
import { getAllPrealert, getCantPrealert } from '@/api/prealert'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		layout: {
			navPos: 'left', //top, bottom, left, right, false
			toolbar: 'top', //top, bottom, false
			footer: true, //above, below, false
			boxed: false, //true, false
			roundedCorners: false, //true, false
			viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
		},
		rightMenu: {
      active: false,
      component: null,
      title: null,
      icon: null
    },
		splashScreen: true,
		submitPrealert: false,
		logged: true,
		user: getUser(),
		prealerts: [],
		cantPrealert: 0,
		cantNotification: null
	},
	mutations: {
		setLayout (state, payload) {
			if(payload && payload.navPos !== undefined)
				state.layout.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.layout.toolbar = payload.toolbar

			if(payload && payload.footer !== undefined)
				state.layout.footer = payload.footer

			if(payload && payload.boxed !== undefined)
				state.layout.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.layout.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation
		},
		setLogin (state, payload) {
			state.logged = true
		},
		setLogout (state, payload) {
			removeToken()
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
		},
		setSplashScreen (state, payload) {
			state.splashScreen = payload
		},
		setSubmitPrealert (state, payload) {
			state.submitPrealert = payload
		},
		openRightMenu (state, payload) {
      state.rightMenu = payload
    },
    closeRightMenu (state, payload) {
      state.rightMenu = {
        active: false,
        component: null,
        title: null,
        icon: null
      }
    },
    setPrealert (state, payload) {
      state.prealerts = payload
    },
    setCantPrealert (state, payload) {
      state.cantPrealert = payload
    },
    setCantNotification (state, payload) {
      state.cantNotification = payload
    },
	},
	actions: {
		logout(){
			removeToken()
			removeUser()
			removeAgency()
			window.location.href = '/'
		},
		getPrealert(context){
			var user = getUser()
			getAllPrealert(user.agencia_id, user.id).then(({data}) => {
				context.commit('setPrealert', data.data)
			}).catch(error => { console.log(error) })
		},
		getCantPrealertF(context){
			var user = getUser()
			getCantPrealert(user.agencia_id, user.id).then(({data}) => {
				context.commit('setCantPrealert', data.data)
			}).catch( error => error)
		}
	},
	getters: {
		layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.layout.navPos
		},
		toolbar(state, getters) {
			return state.layout.toolbar
		},
		footer(state, getters) {
			return state.layout.footer
		},
		boxed(state, getters) {
			return state.layout.boxed
		},
		roundedCorners(state, getters) {
			return state.layout.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
		isLogged(state, getters) {
			return state.logged
		},
		splashScreen(state, getters) {
			return state.splashScreen
		},
		submitPrealert(state, getters) {
			return state.submitPrealert
		},
		user(state, getters) {
			return state.user
		},
		rightMenu: state => state.rightMenu,
		prealerts: state => state.prealerts,
		cantPrealert: state => state.cantPrealert,
		cantNotification: state => state.cantNotification
	},
	plugins: [createPersistedState({paths: ['layout']})],
	strict: debug
})
