<template>
  <div class="">
    <el-select
      size="medium"
      clearable
      v-model="city_id.nombre"
      filterable
      remote
      reserve-keyword
      placeholder="Buscar Ciudad"
      :remote-method="remoteMethod"
      :loading="loading"
      :disabled="disabled"
      loading-text="Cargando..."
      no-data-text="No hay datos"
      @change="handleSelect"
      value-key="id">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.name"
        :value="item">
        <span style="float: left">{{ item.name }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.prefijo_pais }}</span>
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { getCity } from '@/api/city'

export default {
  props:["disabled", "selected"],
  data(){
    return {
      options: [],
      city_id: [],
      list: [],
      loading: false,
    }
  },
  watch:{
    selected:function(value, old) {
      this.city_id = value
    }
  },
  mounted(){
    this.getData();
  },
  methods:{
    getData(){
      var me = this;
      getCity().then((response) => {
          me.list = response.data.data;
      }).catch(function(error) {
          me.$message({
          showClose: true,
          message: 'Error',
          type: 'error'
        });
      });
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
    },
    handleSelect(item) {
     console.log('Pakñldmoskdmaokm  ', item);
      this.$emit('get', item);
    }
  }
}
</script>

<style lang="css" scoped>
  .el-select{
    width: 100%;
  }
</style>
