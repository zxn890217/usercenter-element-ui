<template>
  <el-dialog :title="$t('table.update')" :visible.sync="visible" @close="onClose">
    <el-form :model="form">
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
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{$t('dialog.cancel')}}</el-button>
      <el-button type="primary" @click="save">{{$t('dialog.update')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: true,
        form: {}
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
