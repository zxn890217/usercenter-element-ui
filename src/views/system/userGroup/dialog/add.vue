<template>
  <el-dialog :title="$t('table.add')" width="500px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="dialog-form" label-width="70px" size="small">
      <el-form-item :label="$t('userGroup.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('userGroup.parent')">
        <el-select v-model="form.parent" filterable clearable placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in groups"
            :key="item.id"
            :label="item.name"
            :value="item">
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
        form: {},
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
      },
      addAuthority(row){
        for(var i=0; i<this.form.authorities.length; i++){
          var authority = this.form.authorities[i];
          if(authority.id == row.id){
            this.$message({
              message: this.$t('userGroup.authorityExists'),
              type: 'warning'
            });
            return;
          }
        }
        Vue.set(this.form.authorities, this.form.authorities.length, row);
      },
      onTagClose(index){
        this.form.authorities.splice(index, 1);
      },
      reloadAuthorities(){
        fetchQuery('/authority/query', this.query).then(response => {
          if(response.data.success) {
            this.authoritiesData.splice(0, this.authoritiesData.length);
            for(var i=0; i<response.data.result.length; i++) {
              Vue.set(this.authoritiesData, i, response.data.result[i]);
            }
          }
        })
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
