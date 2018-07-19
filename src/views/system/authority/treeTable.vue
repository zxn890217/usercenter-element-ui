<template>
  <div class="app-container">
    <el-form :model="query" :inline="true" ref="searchForm">
      <el-form-item prop="name">
        <el-input v-model="query.name" :placeholder="$t('authority.name')" clearable maxlength="30"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="query.code" :placeholder="$t('authority.code')" clearable maxlength="30"></el-input>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 10px;">
      <el-button-group>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="toAdd">{{$t('table.add')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="toUpdate">{{$t('table.update')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="toDelete">{{$t('table.delete')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-document" @click="toDetail">{{$t('table.detail')}}</el-button>
      </el-button-group>
      <el-button-group style="position: absolute; right: 0px;">
        <el-button type="primary" size="small" icon="el-icon-search" @click="reload">{{$t('table.search')}}</el-button>
        <el-button type="default" size="small" icon="el-icon-refresh" @click="resetForm">{{$t('table.reset')}}</el-button>
      </el-button-group>
    </el-row>
    <tree-table :data="data" :columns="columns" border></tree-table>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import treeTable from '@/components/TreeTable'
  import { tableOptions, tableMethods, loadTableData, reloadTableData, updateTableRow, deleteTableRow } from '@/utils/utils'
  import { fetchQuery } from '@/api/restful'

  export default {
    components: { treeTable },
    data() {
      return {
        baseUrl: '/authority',
        query: {},
        data: [],
        columns: [
          { text: this.$t('authority.name'), value: 'name'},
          { text: this.$t('authority.code'), value: 'code'}
        ]
      };
    },
    methods: {
      ...tableMethods.apply(this),
      convertToTree(rows) {
        var pid = 0;
        for(var i=0; i<rows.length; i++ ){
          if(rows[i].parent == null || rows[i].parent.id == 0){
            var row = rows[i];
            row.children = this.getNodeChildren(rows, row);
            delete row.parent;
            Vue.set(this.data, this.data.length, row);
          }
        }
      },
      getNodeChildren(rows, node) {
        var pid = node.id;
        var children = [];
        for(var i=0; i<rows.length; i++ ){
          if(rows[i].parent && rows[i].parent.id == node.id){
            var row = rows[i];
            children.push(row);
            row.children = this.getNodeChildren(rows, row);
            //delete row.parent;
          }
        }
        return children;
      },
      loadData(){
        var params = JSON.parse(JSON.stringify(this.query));
        for(var key in params){
          if('' == params[key])
            params[key] = null;
        }
        fetchQuery(this.baseUrl+"/query", params).then(response => {
          if(response.data.success) {
            this.convertToTree(response.data.result);
          }
        })
      }
    },
    mounted: function () {
      this.loadData();
    },
    router: new VueRouter({
      mode: 'abstract',
      routes: [
        { path: '/add', component: () => import('./dialog/add') },
        { path: '/update', component: () => import('./dialog/update') },
        { path: '/detail', component: () => import('./dialog/detail') }
      ]
    })
  }
</script>
