<template>
  <el-dialog :title="$t('table.update')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="dialog-form" label-width="70px" size="small">
      <el-form-item :label="$t('dict.type')">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.code')">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.text')">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.value')">
        <el-input v-model="form.value"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer"
         v-loading="submitting"
         :element-loading-text="$t('dialog.submitting')"
         element-loading-spinner="el-icon-loading">
      <el-button @click="onClose">{{$t('dialog.cancel')}}</el-button>
      <el-button type="primary" @click="save">{{$t('dialog.update')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { vsprintf } from 'sprintf-js/dist/sprintf.min.js'
  import { updateToSubmit } from '@/utils/utils'

  export default {
    data() {
      var form = JSON.parse(JSON.stringify(this.$parent.selectedRow));
      return {
        visible: true,
        submitting: false,
        form: form,
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
      save(){
        updateToSubmit.apply(this, [this.form]);
      },
      onClose(){
        this.$router.push("/");
      }
    }
  };
</script>
