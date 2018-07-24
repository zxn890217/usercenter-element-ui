<template>
  <div>
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
        default-expand-all
        :highlight-current="true"
        @node-click="handleNodeClick"></el-tree>
    </div>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import { fetchQuery, fetchDelete, fetchSave, fetchUpdate } from '@/api/restful'

  export default {
    data() {
      return {
        data: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        selectedRow: null,
        baseUrl: '/userGroup',
      };
    },
    methods: {
      handleNodeClick(data) {
        this.selectedRow = data;
      },
      toAdd(){
        this.$router.push({path: '/add'});
      },
      toUpdate(){
        if(this.selectedRow)
          this.$router.push({path: '/update'});
        else{
          this.$message({
            message: this.$t('notify.unselectedRow'),
            type: 'warning'
          });
        }
      },
      toDelete(){
        if(this.selectedRow) {
          this.$confirm(
            this.$t('notify.confirmToDel'),
            this.$t('notify.title.prompt'),
            {
              confirmButtonText: this.$t('dialog.confirm'),
              cancelButtonText: this.$t('dialog.cancel'),
              type: 'warning'
            }
          ).then(() => {
            this.loading = true;
            fetchDelete(this.baseUrl + '/' + this.selectedRow.id).then(response => {
              if (response.data.success) {
                this.$notify.success({
                  title: this.$t('notify.title.success'),
                  message: response.data.msg
                });
                this.load();
              }
              else {
                this.loading = false;
                this.$notify.warning({
                  title: this.$t('notify.title.fail'),
                  message: response.data.msg
                });
              }
            })
          }).catch(() => {
            this.loading = false;
            this.$message({
              type: 'info',
              message: this.$t('notify.cancelDel')
            });
          });
        }
        else{
          this.$message({
            message: this.$t('notify.unselectedRowToDel'),
            type: 'warning'
          });
        }
      },
      toDetail(){
        if(this.selectedRow)
          this.$router.push({path: '/detail'});
        else{
          this.$message({
            message: this.$t('notify.unselectedRow'),
            type: 'warning'
          });
        }
      },
      load(){
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
            //delete row.parent;
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
            //delete row.parent;
            row.children = this.getChildren(rows, row.id);
          }
        }
        return children;
      }
    },
    mounted(){
      this.load();
    },
    router: new VueRouter({
      mode: 'abstract',
      routes: [
        { path: '/add', component: () => import('./dialog/add') },
        { path: '/update', component: () => import('./dialog/update') },
        { path: '/detail', component: () => import('./dialog/detail') }
      ]
    })
  };
</script>
