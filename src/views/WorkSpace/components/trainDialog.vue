<script setup lang="ts">
import type { UploadProps } from 'element-plus'
import { reactive, ref } from 'vue'

const fileList = ref([
  {
    name: 'cat1',
    url: 'https://img1.baidu.com/it/u=244313577,3675477082&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  },
  {
    name: 'cat1',
    url: 'https://img1.baidu.com/it/u=3897762164,3002258442&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666'
  }
])

const form = reactive({
  email: '1234132423@qq.com',
  phone: '12323412342',
  petName: 'miemie',
  trainScript: ['aaaa', 'bbbb']
})

// 上传图片删除
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
</script>

<template>
  <TepDialog title="训练">
    <el-form :model="form" label-width="120px" label-position="left">
      <el-form-item label="用户邮箱">
        {{ form.email }}
      </el-form-item>
      <el-form-item label="手机">
        {{ form.phone }}
      </el-form-item>
      <el-form-item label="宠物名称">
        {{ form.petName }}
      </el-form-item>
      <!-- 这里内嵌一层 form，主要是改变为上下对齐方式 -->
      <el-form label-width="120px" label-position="top">
        <el-form-item label="原始图片">
          <el-upload
            v-model:file-list="fileList"
            action=""
            list-type="picture-card"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="训练脚本">
          <el-select placeholder="请选择训练脚本">
            <el-option v-for="item in form.trainScript" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form>
  </TepDialog>
</template>

<style scoped lang="less">
@imgSize: 100px;

:deep(.el-upload-list__item) {
  width: @imgSize;
  height: @imgSize;
}

:deep(.el-upload--picture-card) {
  width: @imgSize;
  height: @imgSize;
  //   margin-top: 10px;
}
</style>
