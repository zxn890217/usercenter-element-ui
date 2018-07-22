<template>
  <el-dialog :title="$t('table.detail')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" label-width="70px" size="small">
            <el-form-item :label="$t('userGroup.name')">
        <el-input value="{{form.name}}" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('userGroup.pid')">
        <el-input value="{{form.pid}}" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('userGroup.path')">
        <el-input value="{{form.path}}" readonly></el-input>
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
