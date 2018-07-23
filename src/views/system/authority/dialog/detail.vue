<template>
  <el-dialog :title="$t('table.detail')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" label-width="70px" size="small">
            <el-form-item :label="$t('authority.name')">
        <el-input v-model="form.name" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.code')">
        <el-input v-model="form.code" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.groups')">
        <div style="border: 1px solid #dcdfe6; min-height: 30px;">
          <el-tag v-for="(group, index) in form.groups" type="small" style="margin-left: 5px;">{{group.name}}</el-tag>
        </div>
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
