<template>
  <el-dialog :title="$t('table.add')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="dialog-form" label-width="70px" size="small">
            <el-form-item :label="$t('authority.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.code')" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.groups')">
        <el-select v-model="selectedOptions" multiple placeholder="请选择" style="width: 100%;">
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
  import { updateToSubmit } from '@/utils/utils'
  import { fetchQuery } from '@/api/restful'

  export default {
    data() {
      var form = JSON.parse(JSON.stringify(this.$parent.selectedRow));
      var selectedOptions = [];
      if(form.groups){
        selectedOptions = form.groups.map(item=>{
            return item.id;
        });
      }
      return {
        visible: true,
        form: form,
        groups: [],
        selectedOptions: selectedOptions,
        rules:{
          name: [
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
            { max: 20, message: vsprintf(this.$t('rules.message.maxLen'), 20), trigger: 'blur' }
          ],
          code: [
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
            { max: 20, message: vsprintf(this.$t('rules.message.maxLen'), 20), trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      save(){
        this.form.groups = this.selectedOptions.map(item => {
          return {id: item};
        });
        updateToSubmit.apply(this, [this.form]);
      },
      onClose(){
        this.$router.push("/");
      }
    },
    mounted(){
      fetchQuery('/userGroup/query',{}).then(response => {
        if(response.data.success){
          for(let i=0; i<response.data.result.length; i++){
            Vue.set(this.groups, i, response.data.result[i]);
          }
        }
      })
    }
  };
</script>
