<template>
  <el-dialog :title="$t('table.add')" width="500px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="dialog-form" size="small">
      <el-form-item :label="$t('userGroup.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('userGroup.autoAuth')">
        <el-radio v-model="form.autoAuth" label="0">{{$t('userGroup.enum.autoAuth.0')}}</el-radio>
        <el-radio v-model="form.autoAuth" label="1">{{$t('userGroup.enum.autoAuth.1')}}</el-radio>
      </el-form-item>
      <el-form-item :label="$t('userGroup.peerAuth')">
        <el-radio v-model="form.peerAuth" label="0">{{$t('userGroup.enum.peerAuth.0')}}</el-radio>
        <el-radio v-model="form.peerAuth" label="1">{{$t('userGroup.enum.peerAuth.1')}}</el-radio>
      </el-form-item>
      <el-form-item :label="$t('userGroup.childAuth')">
        <el-radio v-model="form.childAuth" label="0">{{$t('userGroup.enum.childAuth.0')}}</el-radio>
        <el-radio v-model="form.childAuth" label="1">{{$t('userGroup.enum.childAuth.1')}}</el-radio>
      </el-form-item>
      <el-form-item :label="$t('userGroup.parent')">
        <el-select v-model="form.parent.id" filterable clearable placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">{{$t('dialog.cancel')}}</el-button>
      <el-button type="primary" @click="save">{{$t('dialog.save')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Vue from 'vue'
  import { vsprintf } from 'sprintf-js/dist/sprintf.min.js'
  import { saveToSubmit } from '@/utils/utils'
  import { fetchQuery } from '@/api/restful'

  export default {
    data() {
      var form = {
        autoAuth: '0',
        peerAuth: '0',
        childAuth: '0',
        parent: {}
      };
      if(this.$parent.selectedRow){
        form.parent.id = this.$parent.selectedRow.id
      }
      return {
        visible: true,
        form: form,
        groups: [],
        rules:{
          name:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
            { max: 20, message: vsprintf(this.$t('rules.message.maxLen'), 20), trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      save(){
        saveToSubmit.apply(this, [this.form])
      },
      onClose(){
        this.$router.push("/");
      }
    },
    mounted(){
      fetchQuery('/userGroup/query',{}).then(response => {
        if(response.data.success) {
          for(var i=0; i<response.data.result.length; i++) {
            Vue.set(this.groups, i, response.data.result[i]);
          }
        }
      })
    }
  };
</script>
