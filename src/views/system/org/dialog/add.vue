<template>
  <el-dialog :title="$t('table.add')" width="500px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="dialog-form" label-width="70px" size="small">
      <el-form-item :label="$t('org.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('org.region')" prop="regionCode">
        <el-cascader
          size="small"
          :options="addressData"
          v-model="region"
          @change="onRegionChange">
        </el-cascader>
      </el-form-item>
      <el-form-item :label="$t('org.street')" prop="street">
        <el-input v-model="form.street"></el-input>
      </el-form-item>
      <el-form-item :label="$t('org.parent')">
        <el-select v-model="form.parent.id" filterable clearable placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in orgs"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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

<style>
  .area-select .area-selected-trigger{
    padding: 0px 15px !important;
  }
  .area-select{
    width: 100% !important;
  }
  .el-form-item.is-error .area-select{
    border-color: #f56c6c;
  }
</style>

<script>
  import Vue from 'vue'
  import { regionData } from 'element-china-area-data'
  import { vsprintf } from 'sprintf-js/dist/sprintf.min.js'
  import { saveToSubmit } from '@/utils/utils'
  import { fetchQuery } from '@/api/restful'

  export default {
    data() {
      var form = {
        autoAuth: '0',
        peerAuth: '0',
        childAuth: '0',
        parent: {}
      };
      if(this.$parent.selectedRow){
        form.parent.id = this.$parent.selectedRow.id
      }
      return {
        visible: true,
        form: form,
        addressData: regionData,
        region: null,
        orgs: [],
        rules:{
          name:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
            { max: 20, message: vsprintf(this.$t('rules.message.maxLen'), 20), trigger: 'blur' }
          ],
          regionCode:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
          ],
          street:[
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
      onRegionChange(val){
        if(val.length==3){
          this.form.regionCode = val[2];
          this.form.regionName = '';
        }
      }
    },
    mounted(){
      fetchQuery('/org/query', {}).then(response => {
        if(response.data.success) {
          for(var i=0; i<response.data.result.length; i++) {
            Vue.set(this.orgs, i, response.data.result[i]);
          }
        }
      })
    }
  };
</script>
