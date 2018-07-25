<template>
  <el-dialog :title="$t('table.detail')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" size="small">
      <el-form-item :label="$t('userGroup.name')">
        <el-input :value="form.name" readonly></el-input>
      </el-form-item>
      <el-form-item :label="$t('userGroup.autoAuth')">
        <el-radio v-model="form.autoAuth" label="0" :disabled="true">{{$t('userGroup.enum.autoAuth.0')}}</el-radio>
        <el-radio v-model="form.autoAuth" label="1" :disabled="true">{{$t('userGroup.enum.autoAuth.1')}}</el-radio>
      </el-form-item>
      <el-form-item :label="$t('userGroup.peerAuth')">
        <el-radio v-model="form.peerAuth" label="0" :disabled="true">{{$t('userGroup.enum.peerAuth.0')}}</el-radio>
        <el-radio v-model="form.peerAuth" label="1" :disabled="true">{{$t('userGroup.enum.peerAuth.1')}}</el-radio>
      </el-form-item>
      <el-form-item :label="$t('userGroup.childAuth')">
        <el-radio v-model="form.childAuth" label="0" :disabled="true">{{$t('userGroup.enum.childAuth.0')}}</el-radio>
        <el-radio v-model="form.childAuth" label="1" :disabled="true">{{$t('userGroup.enum.childAuth.1')}}</el-radio>
      </el-form-item>
      <el-form-item :label="$t('userGroup.parent')">
        <el-input :value="form.parent | parentFormatter" readonly></el-input>
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
      parentFormatter(val){
        if(val){
          return val.name;
        }
        return '';
      }
    }
  };
</script>
