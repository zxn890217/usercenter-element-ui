import Vue from 'vue'
import { fetchQuery, fetchDelete, fetchSave, fetchUpdate } from '@/api/restful'
import { Loading } from 'element-ui'

Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

export function tableOptions(){
  return {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50, 80, 100, 200],
    tableData: [],
    multipleSelection: [],
    selectedRow: null,
    query: {}
  }
}

export function tableMethods(){
  return {
    onRowSelected(row, event, column) {
      this.selectedRow = row;
    },
    indexMethod(index) {
      return (index+1)+ (this.currentPage - 1) * this.pageSize;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      loadTableData.apply(this, ['/dict/page']);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.load();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sortChange(column, prop, order){
      if(column){
        this.query.sort = column.prop;
        if(column.order == 'descending')
          this.query.order = 'desc';
        else
          this.query.order = 'asc';
      }
      else{
        this.query.sort = null;
        this.query.order = null;
      }
      this.load();
    },
    resetForm(){
      this.$refs['searchForm'].resetFields();
      this.reload();
    },
    load(){
      this.selectedRow = null;
      loadTableData.apply(this, [this.baseUrl+'/page']);
    },
    reload(){
      this.selectedRow = null;
      reloadTableData.apply(this, [this.baseUrl+'/page']);
    },
    toAdd(){
      this.$router.push({path: '/add'});
    },
    toUpdate(){
      updateTableRow.apply(this);
    },
    toDelete(){
      deleteTableRow.apply(this);
    },
    toDetail(){
      detailTableRow.apply(this);
    },
    longTimeFormatter(row, column, value, index){
      if(value){
        let date = new Date(value);
        return date.format('yyyy-MM-dd hh:mm:ss');
      }
      return '';
    }
  }
}

export function commonFilters(){
  return {
    longTimeFormatter(value, parttern){
      if(value){
        let date = new Date(value);
        if(!parttern)
          return date.format('yyyy-MM-dd hh:mm:ss');
        return date.format(parttern);
      }
      return '';
    }
  }
}

export function loadTableData(url){
  let loading = Loading.service({ target: this.$refs['table'].$el });
  var params = JSON.parse(JSON.stringify(this.query));
  for(var key in params){
    if('' == params[key])
      params[key] = null;
  }
  params.offset = (this.currentPage - 1) * this.pageSize;
  params.limit = this.pageSize;
  fetchQuery(url, params).then(response => {
    if(response.data.success) {
      this.tableData.splice(0, this.tableData.length);
      this.total = response.data.result.total;
      for(var i=0; i<response.data.result.rows.length; i++) {
        Vue.set(this.tableData, i, response.data.result.rows[i]);
      }
    }
    loading.close();
  }).catch(e => {
    loading.close();
  })
}

export function reloadTableData(url){
  this.currentPage = 1;
  let loading = Loading.service({ target: this.$refs['table'].$el });
  var params = JSON.parse(JSON.stringify(this.query));
  for(var key in params){
    if('' == params[key])
      params[key] = null;
  }
  params.offset = (this.currentPage - 1) * this.pageSize;
  params.limit = this.pageSize;
  fetchQuery(url, params).then(response => {
    if(response.data.success) {
      this.tableData.splice(0, this.tableData.length);
      this.total = response.data.result.total;
      for(var i=0; i<response.data.result.rows.length; i++) {
        Vue.set(this.tableData, i, response.data.result.rows[i]);
      }
    }
    loading.close();
  }).catch(e => {
    loading.close();
  })
}

export function updateTableRow(){
  if(this.selectedRow)
    this.$router.push({path: '/update'});
  else{
    this.$message({
      message: this.$t('notify.unselectedRow'),
      type: 'warning'
    });
  }
}


export function detailTableRow(){
  if(this.selectedRow)
    this.$router.push({path: '/detail'});
  else{
    this.$message({
      message: this.$t('notify.unselectedRow'),
      type: 'warning'
    });
  }
}

export function deleteTableRow(pk){
  if(pk==undefined || pk==null){
    pk = 'id';
  }
  if(this.selectedRow){
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
      fetchDelete(this.baseUrl+'/'+this.selectedRow[pk]).then(response => {
        if(response.data.success){
          this.$notify.success({
            title: this.$t('notify.title.success'),
            message: response.data.msg
          });
          this.load();
        }
        else{
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
}

export function saveToSubmit(form){
  let loading = Loading.service({ target: this.$el.childNodes[0] });
  this.$refs['dialog-form'].validate((valid) => {
    if(valid){
      fetchSave(this.$parent.baseUrl, form).then(response => {
        if(response.data.success) {
          this.$notify.success({
            title: this.$t('notify.title.success'),
            message: response.data.msg
          });
          this.$parent.load();
          this.$router.push("/");
        }
        else{
          this.$notify.warning({
            title: this.$t('notify.title.fail'),
            message: response.data.msg
          });
          loading.close();
        }
      }).catch(() => {
        loading.close();
      })
    }
    else{
      loading.close();
    }
  })
}

export function updateToSubmit(form){
  let loading = Loading.service({ target: this.$el.childNodes[0] });
  this.$refs['dialog-form'].validate((valid) => {
    if(valid){
      fetchUpdate(this.$parent.baseUrl, form).then(response => {
        if(response.data.success){
          this.$notify.success({
            title: this.$t('notify.title.success'),
            message: response.data.msg
          });
          this.$parent.load();
          this.$router.push("/");
        }
        else{
          this.$notify.warning({
            title: this.$t('notify.title.fail'),
            message: response.data.msg
          });
          loading.close();
        }
      }).catch(() => {
        loading.close();
      })
    }
    else{
      loading.close();
    }
  })
}
