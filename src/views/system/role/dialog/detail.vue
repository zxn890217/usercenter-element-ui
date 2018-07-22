<template>
  <el-dialog :title="$t('table.detail')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" label-width="70px" size="small">
      <el-form-item :label="$t('role.name')">
        <el-input :value="form.name" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('role.createTime')">
        <el-input :value="form.createTime | longTimeFormatter" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('role.authorities')">
        <div style="border: 1px solid #dcdfe6; min-height: 30px;">
          <el-tag v-for="(authority, index) in form.authorities" type="small" style="margin-left: 5px;">{{authority.name}}</el-tag>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import { vsprintf } from 'sprintf-js/dist/sprintf.min.js'
  import { commonFilters } from '@/utils/utils'

  export default {
    data() {
      var form = JSON.parse(JSON.stringify(this.$parent.selectedRow));
      if(!form.authorities){
        form.authorities = [];
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
    },
    filters: {
      ...commonFilters.apply(this)
    }
  };
</script>
