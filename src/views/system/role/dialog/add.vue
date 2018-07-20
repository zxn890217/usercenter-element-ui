<template>
  <el-dialog :title="$t('table.add')" width="700px" :visible.sync="visible" @close="onClose">
    <el-row>
      <el-col :span="12">
        <el-form :model="form" :rules="rules" ref="dialog-form" label-width="70px" size="small">
          <el-form-item :label="$t('role.name')" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('role.authorities')">
            <el-tag v-for="(authority, index) in form.authorities" size="small" closable @close="onTagClose(index)">{{authority.name}}</el-tag>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-form :model="query" :inline="true" ref="searchForm">
          <el-form-item>
            <el-input v-model="query.name" :placeholder="$t('role.authorityName')" clearable maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-search" @click="reloadAuthorities">{{$t('table.search')}}</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="table" :data="authoritiesData" border highlight-current-row  style="width: 100%" max-height="400">
          <el-table-column prop="name" :label="$t('authority.name')"></el-table-column>
          <el-table-column prop="code" :label="$t('authority.code')"></el-table-column>
          <el-table-column :label="$t('table.opt')">
            <template slot-scope="scope">
              <el-button type="primary" @click="addAuthority(scope.row)">{{$t('table.add')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
        form: {
          authorities:[]
        },
        rules:{
          name:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
            { max: 20, message: vsprintf(this.$t('rules.message.maxLen'), 20), trigger: 'blur' }
          ],
          creatorId:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
          ],
          createTime:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
          ]
        },
        authoritiesData:[],
        query:{},

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
              message: this.$t('role.authorityExists'),
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
    mounted: function(){
      fetchQuery('/authority/query',{}).then(response => {
        if(response.data.success) {
          for(var i=0; i<response.data.result.length; i++) {
            Vue.set(this.authoritiesData, i, response.data.result[i]);
          }
        }
      })
    }
  };
</script>
