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
        <el-button type="primary" size="small" icon="el-icon-search" @click="reload">{{$t('table.search')}}</el-button>
        <el-button type="default" size="small" icon="el-icon-refresh" @click="resetForm">{{$t('table.reset')}}</el-button>
      </el-button-group>
    </el-row>
    <el-table v-loading="loading" :data="tableData" border highlight-current-row @row-click="onRowSelected" style="width: 100%" @sort-change="sortChange">
      <el-table-column type="index" :label="$t('table.index')" :index="indexMethod" align="center" width="55"></el-table-column>
      <el-table-column prop="type" :label="$t('dict.type')" sortable></el-table-column>
      <el-table-column prop="code" :label="$t('dict.code')" sortable></el-table-column>
      <el-table-column prop="text" :label="$t('dict.text')"></el-table-column>
      <el-table-column prop="value" :label="$t('dict.value')" sortable></el-table-column>
      <el-table-column prop="downLoad" :label="$t('dict.downLoad')" :formatter="downLoadFormatter"></el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
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
  import { fetchPage, fetchDelete } from '@/api/restful'
  import { tableOptions, tableMethods, loadTableData, reloadTableData, updateTableRow, deleteTableRow } from '@/utils/utils'
  export default {
    data() {
      return {
        ...tableOptions.apply(this),
        baseUrl: '/dict'
      };
    },
    methods: {
      ...tableMethods.apply(this),
      downLoadFormatter: function(row, column, value, index){
        if(value!=null && value!='')
          return this.$t('dict.enum.downLoad.'+value);
      }
    },
    mounted: function () {
      this.reload();
    },
    router: new VueRouter({
      mode: 'abstract',
      routes: [
        { path: '/add', component: () => import('./dialog/add') },
        { path: '/update', component: () => import('./dialog/update') }
      ]
    })
  }
</script>
