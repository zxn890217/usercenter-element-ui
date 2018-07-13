<template>
  <el-dialog :title="$t('table.add')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="form" label-width="70px" size="small">
      <el-form-item :label="$t('dict.type')" prop="type">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.code')" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.text')" prop="text">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.value')" prop="value">
        <el-input v-model="form.value"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{$t('dialog.cancel')}}</el-button>
      <el-button type="primary" @click="save">{{$t('dialog.save')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { vsprintf } from 'sprintf-js/dist/sprintf.min.js'
  import { fetchSave } from '@/api/restful'

  export default {
    data() {
      return {
        visible: true,
        form: {},
        rules:{
          type:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
            { max: 50, message: vsprintf(this.$t('rules.message.maxLen'), 50), trigger: 'blur' }
          ],
          code:[
            { required: true, message: this.$t('rules.message.required'), trigger: 'blur' },
            { max: 50, message: vsprintf(this.$t('rules.message.maxLen'), 50), trigger: 'blur' }
          ],
          text:[
            { max: 100, message: vsprintf(this.$t('rules.message.maxLen'), 100), trigger: 'blur' }
          ],
          value:[
            { max: 100, message: vsprintf(this.$t('rules.message.maxLen'), 100), trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      cancel(){
        this.$router.push("/");
      },
      save(){
        fetchSave('/dict', this.form).then(response => {
          if(response.data.success) {
            this.$notify({
              title: this.$t('notify.title.success'),
              message: response.data.msg,
              type: 'success'
            });
            this.$parent.loadData();
            this.$router.push("/");
          }
          else{
            this.$notify({
              title: this.$t('notify.title.fail'),
              message: response.data.msg,
              type: 'warning'
            });
          }
        })
      },
      onClose(){
        this.$router.push("/");
      }
    }
  };
</script>
