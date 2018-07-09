<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="query.type" :placeholder="$t('dict.type')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.code" :placeholder="$t('dict.code')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.text" :placeholder="$t('dict.text')"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.value" :placeholder="$t('dict.value')"></el-input>
      </el-form-item>
    </el-form>
    <el-row style="margin-bottom: 10px;">
      <el-button-group>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="toAdd">{{$t('table.add')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="toUpdate">{{$t('table.update')}}</el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="toDelete">{{$t('table.delete')}}</el-button>
      </el-button-group>
      <el-button-group style="position: absolute; right: 0px;">
        <el-button type="primary" size="small" icon="el-icon-search">{{$t('table.search')}}</el-button>
        <el-button type="default" size="small">
          <svg-icon icon-class="reset" />
          {{$t('table.reset')}}
        </el-button>
        <el-button type="default" size="small" icon="el-icon-refresh" @click="loadData()">{{$t('table.refresh')}}</el-button>
      </el-button-group>
    </el-row>
    <el-table :data="tableData" border highlight-current-row @row-click="getSelectedRow" style="width: 100%">
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
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { fetchPage } from '@/api/dict'
  export default {
    data() {
      return {
        query: {
          'sort': 'id',
          'order': 'desc'
        },
        total: 0,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [10, 20, 30, 50, 80, 100, 200],
        tableData: [],
        selectedRow: null,
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
        this.query.offset = (this.currentPage - 1) * this.pageSize;
        this.query.limit = this.pageSize;
        fetchPage(this.query).then(response => {
          if(response.data.success) {
            this.tableData.splice(0, this.tableData.length);
            this.total = response.data.result.total;
            for(var i=0; i<response.data.result.rows.length; i++) {
              Vue.set(this.tableData, i, response.data.result.rows[i]);
            }
          }
        })
      },
      toAdd(){
          this.$router.push("/system/dict/add");
          //router.push("add");
      },
      toUpdate(){

      },
      toDelete(){

      }
    },
    mounted: function () {
      this.loadData();
    }
  }
</script>
