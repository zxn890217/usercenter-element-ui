<template>
  <el-dialog :title="$t('table.add')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="dialog-form" label-width="70px" size="small">
            <el-form-item :label="$t('authority.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.code')" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.parent')" prop="parentId">
        <el-select v-model="form.parent.id" filterable placeholder="请选择" clearable :loading="loadingAuthorities" style="width: 100%;">
          <el-option
            v-for="item in authorities"
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
      return {
        visible: true,
        loadingAuthorities: true,
        authorities: [],
        form: {
          parent: {
            id: null
          }
        },
          rules:{
            name:[
              { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
              { max: 20, message: vsprintf(this.$t('rules.message.maxLen'), 20), trigger: 'blur' }
            ],
            code:[
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
    mounted: function(){
      fetchQuery('/authority/query', {}).then(response => {
        if(response.data.success) {
          for(var i=0; i<response.data.result.length; i++) {
            Vue.set(this.authorities, i, response.data.result[i]);
          }
        }
        this.loadingAuthorities = false;
      })
    }
  };
</script>
