<template>
  <div class="app-container">
    <el-form :model="query" :inline="true" ref="searchForm">
      <el-form-item prop="type">
        <el-input v-model="query.type" :placeholder="$t('dict.type')" clearable maxlength="30"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="query.code" :placeholder="$t('dict.code')" clearable maxlength="30"></el-input>
      </el-form-item>
      <el-form-item prop="text">
        <el-input v-model="query.text" :placeholder="$t('dict.text')" clearable maxlength="30"></el-input>
      </el-form-item>
      <el-form-item prop="value">
        <el-input v-model="query.value" :placeholder="$t('dict.value')" clearable maxlength="30"></el-input>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 10px;">
      <el-button-group>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="toAdd">{{$t('table.add')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="toUpdate">{{$t('table.update')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="toDelete">{{$t('table.delete')}}</el-button>
      </el-button-group>
      <el-button-group style="position: absolute; right: 0px;">
        <el-button type="primary" size="small" icon="el-icon-search" @click="loadData">{{$t('table.search')}}</el-button>
        <el-button type="default" size="small" @click="resetForm">
          <svg-icon icon-class="reset" />
          {{$t('table.reset')}}
        </el-button>
        <el-button type="default" size="small" icon="el-icon-refresh" @click="loadData">{{$t('table.refresh')}}</el-button>
      </el-button-group>
    </el-row>
    <el-table v-loading="loading" :data="tableData" border highlight-current-row @row-click="getSelectedRow" style="width: 100%">
      <el-table-column type="index" :label="$t('table.index')" :index="indexMethod" align="center" width="55"></el-table-column>
      <el-table-column prop="type" :label="$t('dict.type')"></el-table-column>
      <el-table-column prop="code" :label="$t('dict.code')"></el-table-column>
      <el-table-column prop="text" :label="$t('dict.text')"></el-table-column>
      <el-table-column prop="value" :label="$t('dict.value')"></el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import { fetchPage } from '@/api/restful'
  import AddDialog from './dialog/add'
  import UpdateDialog from './dialog/update'
  export default {
    router: new VueRouter({
      routes: [
        { path: '/add', component: AddDialog },
        { path: '/update', component: UpdateDialog }
      ]
    }),
    data() {
      return {
        query: {
          sort: 'id',
          order: 'desc',
          type: null,
          code: null,
          text: null,
          value: null
        },
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 80, 100, 200],
        tableData: [],
        selectedRow: null,
        loading: false,
        dialog:{
          title: null,
          visible: false,
          buttons:[]
        }
      }
    },
    methods: {
      getSelectedRow(row, event, column) {
        this.selectedRow = row;
      },
      indexMethod(index) {
        return (index+1)+ (this.currentPage - 1) * this.pageSize;
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadData();
      },
      loadData() {
        this.loading = true;
        var params = JSON.parse(JSON.stringify(this.query));
        for(var key in params){
          if('' == params[key])
            params[key] = null;
        }
        params.offset = (this.currentPage - 1) * this.pageSize;
        params.limit = this.pageSize;
        fetchPage('/dict/page', params).then(response => {
          if(response.data.success) {
            this.tableData.splice(0, this.tableData.length);
            this.total = response.data.result.total;
            for(var i=0; i<response.data.result.rows.length; i++) {
              Vue.set(this.tableData, i, response.data.result.rows[i]);
            }
          }
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        })
      },
      resetForm() {
        this.$refs['searchForm'].resetFields();
        this.loadData();
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
        if(this.selectedRow){

        }
        else{
          this.$message({
            message: this.$t('notify.unselectedRowToDel'),
            type: 'warning'
          });
        }
      }
    },
    mounted: function () {
      this.loadData();
    }
  }
</script>
