<template>
    <el-dialog :title="$t('table.add')" :visible.sync="visible" @close="dialogClosed">
        <!--<el-form :model="form">
            <el-form-item :label="$t('dict.type')" :label-width="formLabelWidth">
                <el-input v-model="form.type" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dict.code')" :label-width="formLabelWidth">
                <el-input v-model="form.code" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dict.text')" :label-width="formLabelWidth">
                <el-input v-model="form.text" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('dict.value')" :label-width="formLabelWidth">
                <el-input v-model="form.value" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">{{$t(dialog.cancel)}}</el-button>
            <el-button type="primary" @click="save">{{$t(dialog.save)}}</el-button>
        </div>-->
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                visible: true,
                form: {
                },
                formLabelWidth: '120px'
            };
        },
        methods: {
            cancel(){

            },
            save(){

            },
            dialogClosed(){
                this.$router.back();
            }
        }
    };
</script>