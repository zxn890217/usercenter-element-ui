<template>
  <el-dialog :title="$t('table.detail')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" label-width="70px" size="small">
      <el-form-item :label="$t('role.name')">
        <el-input readonly>{{form.name}}</el-input>
      </el-form-item>
      <el-form-item :label="$t('role.createTime')">
        <el-input readonly>{{form.createTime | longTimeFormatter}}</el-input>
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
