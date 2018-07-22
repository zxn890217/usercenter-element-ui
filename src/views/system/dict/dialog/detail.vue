<template>
  <el-dialog :title="$t('table.detail')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" label-width="70px" size="small">
      <el-form-item :label="$t('dict.type')">
        <el-input v-model="form.type" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.code')">
        <el-input v-model="form.code" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.text')">
        <el-input v-model="form.text" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.value')">
        <el-input v-model="form.value" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.downLoad')">
        <el-radio v-model="form.downLoad" label="1" :disabled="true">{{$t('dict.enum.downLoad.1')}}</el-radio>
        <el-radio v-model="form.downLoad" label="2" :disabled="true">{{$t('dict.enum.downLoad.2')}}</el-radio>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import { vsprintf } from 'sprintf-js/dist/sprintf.min.js'

  export default {
    data() {
      var form = JSON.parse(JSON.stringify(this.$parent.selectedRow));
      return {
        visible: true,
        form: form
      };
    },
    methods: {
      onClose(){
        this.$router.push("/");
      }
    }
  };
</script>
