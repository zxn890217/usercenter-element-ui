import Vue from 'vue'
import { fetchQuery, fetchDelete, fetchSave, fetchUpdate } from '@/api/restful'

export function tableOptions(){
  return {
    total: 0,
    currentPage: 1,
    pageSize: 10,
    pageSizes: [10, 20, 30, 50, 80, 100, 200],
    tableData: [],
    selectedRow: null,
    loading: false
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
    sortChange( column, prop, order ){
      this.query.sort = prop;
      this.query.order = order;
      this.load();
    },
    resetForm() {
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
    }
  }
}

export function loadTableData(url){
  this.loading = true;
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
    this.loading = false;
  }).catch(e => {
    this.loading = false;
  })
}

export function reloadTableData(url){
  this.currentPage = 1;
  this.loading = true;
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
    this.loading = false;
  }).catch(e => {
    this.loading = false;
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
  this.$refs['dialog-form'].validate((valid) => {
    if(valid){
      this.submitting = true;
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
          this.submitting = false;
        }
      }).catch(() => {
        this.submitting = false;
      })
    }
  })
}

export function updateToSubmit(form){
  this.$refs['dialog-form'].validate((valid) => {
    if(valid){
      this.submitting = true;
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
          this.submitting = false;
        }
      }).catch(() => {
        this.submitting = false;
      })
    }
  })
}
