<template>
  <el-dialog :title="$t('table.add')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="dialog-form" label-width="70px" size="small">
            <el-form-item :label="$t('authority.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('authority.code')" prop="code">
        <el-input v-model="form.code"></el-input>
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
      if(form.parent==null){
        form.parent = {};
      }
      return {
        visible: true,
        loadingAuthorities: true,
        authorities: [],
        form: form,
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
        var params = JSON.parse(JSON.stringify(this.form));
        if(!params.parent.id){
            delete params.parent;
        }
        updateToSubmit.apply(this, [params])
      },
      onClose(){
        this.$router.push("/");
      }
    },
    mounted: function(){
      fetchQuery('/authority/query', {unpath: this.$parent.selectedRow.id}).then(response => {
        if(response.data.success) {
          let count = 0;
          for(var i=0; i<response.data.result.length; i++) {
            let row = response.data.result[i];
            if(this.$parent.selectedRow.id != row.id){
              Vue.set(this.authorities, count++, row);
            }
          }
        }
        this.loadingAuthorities = false;
      })
    }
  };
</script>
