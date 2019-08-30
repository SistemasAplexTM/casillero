<template lang="html">
  <el-drawer
    style="overflow: auto !important;"
    title=""
    :size="width"
    :show-close="false"
    :visible="rightMenu.active"
    @close="$store.commit('closeRightMenu')"
    direction="rtl">
    <span slot="title" class="mb-5">
      <i class="fr fa-4x o-010" :class="'fal fa-' + rightMenu.icon"></i>
      <el-page-header @back="$store.commit('closeRightMenu')" title="" style="color: white !important">
        <span slot="content" class="w-100">
          <h3>
            <i :class="'fal fa-' + rightMenu.icon"></i>
            {{ rightMenu.title }}
          </h3>
        </span>
      </el-page-header>

    </span>
    <el-row class="ml-20 mr-20 scrollable only-y">
        <el-col :span="24">
          <keep-alive>
            <transition name="fade" mode="out-in">
              <component v-bind:is="rightMenu.component" :data="rightMenu.data"></component>
            </transition>
          </keep-alive>
        </el-col>
    </el-row>
  </el-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import Profile from '@/views/pages/Profile.vue'
import TrackingDetail from '@/views/pages/TrackingDetail.vue'
import Prealert from '@/components/Prealert.vue'
import NotificationBox from '@/components/NotificationBox.vue'

export default {
  name: 'RightMenu',
  props: ['title'],
  components: { Profile, Prealert, NotificationBox, TrackingDetail },
  computed: {
    ...mapGetters(['rightMenu']),
    width() {
      if(screen.width <= 768) {
        return '100%'
      } else {
        return '25%'
      }
    }
 },
  data () {
    return {
      component: 'profile'
    }
  }

}
</script>

<style lang="css" scope>
  .el-drawer {
    overflow: auto !important;
  }
  .el-drawer__header {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    background-color: #5f8fdf !important;
    color: white;
    margin-bottom: 0px;
  }
  .el-page-header__content{
    color: white !important;
  }

</style>
