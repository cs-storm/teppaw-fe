<script setup lang="ts">
import { $createPet } from '@/api/pet'
import { useUserStore } from '@/stores/userStore'
import { ElMessage, type UploadProps } from 'element-plus'
import { reactive, ref } from 'vue'

const userStore = useUserStore()

const fileList = ref<{ name: string; url: string }[]>([])

const form = reactive({
  email: '',
  phone: '',
  petName: '',
  createModel: '1',
  checkList: [],
  num: 1
})

// 上传图片删除
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const createNewPet = async () => {
  // console.log('-----', form.petName, fileList.value)
  try {
    const { data } = await $createPet({
      images: fileList.value,
      pet_name: form.petName,
      belong_user_uuid: userStore.userId
    })
    console.log('data', data)
    // $message
    ElMessage({
      message: `创建成功, 宠物id为${data.pet_uuid}`,
      type: 'success'
    })
  } catch (error) {
    ElMessage({
      message: `创建失败, ${error}`,
      type: 'warning'
    })
  }
}
</script>

<template>
  <TepDialog :handel-create="createNewPet" title="创建数字宠物">
    <el-form :model="form" label-width="120px" label-position="left">
      <el-form-item label="用户邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="宠物名称">
        <el-input v-model="form.petName" />
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="form.createModel" class="ml-4">
          <el-radio label="1" size="large">仅创建</el-radio>
          <el-radio label="2" size="large">创建后执行训练和出图</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 这里内嵌一层 form，主要是改变为上下对齐方式 -->
      <el-form label-width="120px" label-position="top">
        <el-form-item label="原始图片">
          <el-upload
            v-model:file-list="fileList"
            :auto-upload="false"
            list-type="picture-card"
            :on-remove="handleRemove"
          >
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item label="出图风格">
          <el-checkbox-group v-model="form.checkList">
            <el-checkbox label="Option A" />
            <el-checkbox label="Option B" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-form-item label="每风格张数">
        <el-input-number v-model="form.num" :min="1" :max="99" />
      </el-form-item>
      <!-- <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item> -->
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
