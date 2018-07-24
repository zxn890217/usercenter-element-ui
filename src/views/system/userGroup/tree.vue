<template>
  <div class="app-container">
    <el-row style="margin-bottom: 10px;">
      <el-button-group>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="toAdd">{{$t('table.add')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="toUpdate">{{$t('table.update')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="toDelete">{{$t('table.delete')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-document" @click="toDetail">{{$t('table.detail')}}</el-button>
      </el-button-group>
    </el-row>
    <el-tree
      :data="data"
      :props="defaultProps"
      :expand-on-click-node="false"
      :highlight-current="true"
      @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { fetchQuery, fetchDelete, fetchSave, fetchUpdate } from '@/api/restful'

  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        selectedNode: null
      };
    },
    methods: {
      handleNodeClick(data) {
        this.selectedNode = data;
      },
      toAdd(){

      },
      toUpdate(){

      },
      toDelete(){

      },
      toDetail(){

      },
      loadData(){
        fetchQuery('/userGroup/query',{}).then(response => {
          if(response.data.success){
            var rows = response.data.result;
            var roots = this.getRoots(rows);
            if(this.data.length>0){
              this.data.splice(0, this.data.length);
            }
            for(let i=0; i<roots.length; i++){
              roots[i].children = this.getChildren(rows, roots[i].id);
              Vue.set(this.data, i, roots[i]);
            }
          }
        });
      },
      getRoots(rows){
        var roots = [];
        for(let i=0; i< rows.length; i++){
          let row = rows[i];
          if(row.parent==null || row.parent.id==0){
            roots.push(row);
            delete row.parent;
          }
        }
        return roots;
      },
      getChildren(rows, pid){
        var children = [];
        for(let i=0; i< rows.length; i++){
          let row = rows[i];
          if(row.parent!=null && row.parent.id==pid){
            children.push(row);
            delete row.parent;
            row.children = this.getChildren(rows, row.id);
          }
        }
        return children;
      }
    },
    mounted(){
      this.loadData();
    }
  };
</script>
