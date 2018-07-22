<template>
  <el-dialog :title="$t('table.update')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="dialog-form" label-width="70px" size="small">
            <el-form-item :label="$t('userGroup.name')" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item :label="$t('userGroup.pid')" prop="pid">
        <el-input v-model="form.pid"></el-input>
      </el-form-item>
      <el-form-item :label="$t('userGroup.path')" prop="path">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">{{$t('dialog.cancel')}}</el-button>
      <el-button type="primary" @click="save">{{$t('dialog.save')}}</el-button>
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
        form: form,
        rules:{
          name:[
            { max: 30, message: vsprintf(this.$t('rules.message.maxLen'), 30), trigger: 'blur' }
           ],
          pid:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
           ],
          path:[
            { required: true, message:this.$t('rules.message.required'), trigger: 'blur' },
            { max: 50, message: vsprintf(this.$t('rules.message.maxLen'), 50), trigger: 'blur' }
           ]
        }
      };
    },
    methods: {
      save(){
        updateToSubmit.apply(this, [this.form])
      },
      onClose(){
        this.$router.push("/");
      }
    }
  };
</script>
