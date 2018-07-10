<template>
  <el-dialog :title="$t('table.add')" width="560px" :visible.sync="visible" @close="onClose">
    <el-form :model="form" :rules="rules" ref="form" label-width="70px" size="small">
      <el-form-item :label="$t('dict.type')" prop="type">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item :label="$t('dict.code')" required prop="code">
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
  import { fetchSave } from '@/api/dict'

  export default {
    data() {
      return {
        visible: true,
        form: {},
        rules:{
          type:[
            { required: true, message: '请输入类型', trigger: 'blur' },
            { max: 50, message: '最多50个字符', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '请输入代码', trigger: 'blur' },
            { max: 50, message: '最多50个字符', trigger: 'blur' }
          ],
          text:[
            { max: 100, message: '最多100个字符', trigger: 'blur' }
          ],
          value:[
            { max: 100, message: '最多100个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      cancel(){

      },
      save(){

      },
      onClose(){
        this.$router.push("/");
      }
    }
  };
</script>
