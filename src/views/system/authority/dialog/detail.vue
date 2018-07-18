<template>
  <el-dialog :title="$t('table.detail')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" label-width="70px" size="small">
            <el-form-item :label="$t('authority.name')">
        <el-input v-model="form.name" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.code')">
        <el-input v-model="form.code" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.parent')">
        <el-input v-model="form.parent.name" readonly></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import { vsprintf } from 'sprintf-js/dist/sprintf.min.js'

  export default {
    data() {
      var form = JSON.parse(JSON.stringify(this.$parent.selectedRow));
      if(form.parent==null){
        form.parent = {};
      }
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
