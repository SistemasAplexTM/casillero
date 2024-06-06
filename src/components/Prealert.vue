<template>
  <div class="">
    <!-- <el-dialog :show-close="true" :custom-class="'tracking-dialog'" id="tracking-dialog" :visible="dialogvisible" @close="$emit('update:dialogvisible', false)"> -->
    <!-- <div slot="title" class="bg-accent white-text p-15 flex"> -->
    <!-- <div class="info box grow flex">
			<i class="fal fa-bells fa-2x m-a"></i>
			<div class="box grow flex white-text column justify-center p-0 ml-15">
				<div class="fs-22">Nueva prealerta</div>
			</div>
			<i class="fal fa-bells fa-5x o-010"></i>
		</div> -->
    <!-- </div> -->
    <div class="pt-10 p-20">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" label-position="top"
        class="demo-ruleForm">
        <el-form-item label="Tracking" prop="tracking">
          <el-input v-model="ruleForm.tracking"></el-input>
        </el-form-item>
        <el-form-item label="Valor declarado ($ USD)" prop="declarado">
          <el-input-number v-model="ruleForm.declarado" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="Contenido" prop="contenido">
          <el-input type="textarea" v-model="ruleForm.contenido"></el-input>
        </el-form-item>
        <el-form-item label="Instrucción" prop="instruccion">
          <el-input type="textarea" v-model="ruleForm.instruccion"></el-input>
        </el-form-item>
        <el-form-item label="Despachar" prop="despachar">
          <el-switch v-model="ruleForm.despachar"></el-switch>
        </el-form-item>
        <el-form-item label="Factura" prop="invoice">
          <el-upload ref="upload" action="#" :on-change="handleFileChange" :before-upload="beforeUpload"
            :file-list="ruleForm.invoice" :auto-upload="false" accept=".pdf">
            <el-button size="small" type="primary" icon="el-icon-upload">Clic para
              subir archivo</el-button>
            <div slot="tip" class="el-upload__tip">Solo archivos con un tamaño menor
              de 1 MB</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" :loading="loading">Aceptar</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import { setPrealert } from '@/api/prealert'

export default {
  name: 'Prealert',
  // props: ['data', 'dialogvisible'],
  data() {
    return {
      loading: false,
      ruleForm: {
        tracking: '',
        declarado: '',
        contenido: '',
        instruccion: '',
        consignee_id: '',
        agencia_id: '',
        despachar: false,
        invoice: [],
      },
      rules: {
        tracking: [
          { required: true, message: 'Campo requerido', trigger: 'blur' }
        ],
        declarado: [
          { required: true, message: 'Campo requerido', trigger: 'blur' }
        ],
        contenido: [
          { required: true, message: 'Campo requerido', trigger: 'blur' }
        ],
        instruccion: [
          { required: true, message: 'Campo requerido', trigger: 'blur' }
        ]
      },
      fileList: [],
      // headersUpload: {
      //   'X-CSRF-TOKEN': $("meta[name='csrf-token']").attr("content"),
      // },
      agencyId: this.$store.getters.user.agencia_id
    }
  },
  methods: {
    handleFileChange(file, fileList) {
      console.log('file: ',fileList[0]);
      this.ruleForm.invoice = fileList
    },
    beforeUpload(file) {
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        this.$message.error('Solo se pueden subir archivos en formato PDF');
      }
      return isPDF;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `El límite es 1 archivo, haz cargado ${fileList.length} archivo esta vez`
      );
    },
    submitForm(formName) {
      let me = this
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.consignee_id = this.$store.getters.user.id
          this.ruleForm.agencia_id = this.$store.getters.user.agencia_id
          this.ruleForm.correo = this.$store.getters.user.correo

          const formData = new FormData();
          formData.append('tracking', this.ruleForm.tracking);
          formData.append('declarado', this.ruleForm.declarado);
          formData.append('contenido', this.ruleForm.contenido);
          formData.append('instruccion', this.ruleForm.instruccion);
          formData.append('consignee_id', this.ruleForm.consignee_id);
          formData.append('agencia_id', this.ruleForm.agencia_id);
          formData.append('despachar', this.ruleForm.despachar);
          formData.append('correo', this.ruleForm.correo);
          
          if (this.ruleForm.invoice.length > 0) {
            formData.append('file', this.ruleForm.invoice[0].raw);
          }
          console.log('FormData: ', formData);
          setPrealert(formData).then(({ data }) => {
            console.log(data);
            if (data.code == 200) {
              this.$message.success(data.message);
              this.resetForm('ruleForm')
              this.$emit('submitPrealert')
              this.$store.dispatch('getPrealert')
              this.$store.dispatch('getCantPrealertF')
            } else {
              this.$message.error(data.message);
            }
            me.loading = false
          }).catch(error => { console.log(error) })
        } else {
          me.loading = false
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="scss">
.el-input-number {
  width: 100%;
}

.el-dialog__headerbtn .el-dialog__close {
  color: white;
}

.el-tabs__header {
  margin-bottom: 0
}

.el-badge__content {
  vertical-align: middle;
  background-color: #4a596a
}

.el-dialog.tracking-dialog {
  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 0;
  }
}
</style>
