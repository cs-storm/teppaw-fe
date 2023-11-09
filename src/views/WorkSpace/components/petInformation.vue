<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ref, watch } from 'vue'
import trainDialog from './trainDialog.vue'
import pictureMakingDialog from './pictureMakingDialog.vue'
import { useUserStore } from '@/stores/userStore'
import { $getPetDescription } from '@/api/pet'

const userStore = useUserStore()

const selectedPet = ref()

// 训练
const trainDialogVisible = ref<boolean>(false)
// 出图
const pictureMakingDialogVisible = ref<boolean>(false)

// 监听宠物列表请求完成
watch(
  () => userStore.pets,
  (newVal) => {
    if (newVal.length > 0) {
      selectedPet.value = newVal[0].id
    }
  }
)

// 宠物被选 请求宠物详情
watch(
  () => selectedPet.value,
  (newVal) => {
    if (newVal) {
      const pet = userStore.pets.find((pet) => pet.id === newVal)
      pet &&
        $getPetDescription({
          pet_uuid: pet.pet_uuid
        })
          .then((res) => {
            console.log('pet', res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    }
  }
)

// 已上传的图片列表
const fileList = ref<UploadUserFile[]>([
  {
    name: 'cat1',
    url: 'https://img1.baidu.com/it/u=244313577,3675477082&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  },
  {
    name: 'cat1',
    url: 'https://img1.baidu.com/it/u=3897762164,3002258442&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666'
  },
  {
    name: 'cat1',
    url: 'https://img1.baidu.com/it/u=244313577,3675477082&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  },
  {
    name: 'cat1',
    url: 'https://img1.baidu.com/it/u=3897762164,3002258442&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=666'
  },
  {
    name: 'cat1',
    url: 'https://img1.baidu.com/it/u=244313577,3675477082&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  },
  {
    name: 'cat1',
    url: 'https://img1.baidu.com/it/u=244313577,3675477082&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  }
])

const taskList = ref([
  {
    title: '20230112-12:30-123412@qq.com-miemie-出图任务1',
    content: `processing…
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf`,
    time: '3ms'
  },
  {
    title: '20230112-12:30-123412@qq.com-miemie-出图任务2',
    content: `processing…
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf
                component pipline[///////////] [300/500] 32minute;/fasdf`,
    time: '3ms'
  }
])

const dialogImageUrl = ref('')
const imgDialogVisible = ref(false)

// 上传图片删除
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

// 上传图片预览
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  imgDialogVisible.value = true
}
</script>

<template>
  <div>
    <el-descriptions title="猫猫信息">
      <el-descriptions-item label="数字宠物">
        <el-select v-model="selectedPet" class="m-2" placeholder="请选择你的宠物" size="small">
          <el-option
            v-for="item in userStore.pets"
            :key="item.id"
            :label="item.pet_name"
            :value="item.id"
        /></el-select>
      </el-descriptions-item>
    </el-descriptions>
    <div class="content-container">
      <div class="img-container">
        <div class="head">
          <h5>原始图片</h5>
        </div>
        <div class="scroll-box">
          <el-upload
            v-model:file-list="fileList"
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </div>
        <div class="tip">请上传png图片，图片要求可以参考文档<a href="">xxx</a></div>
      </div>
      <div class="task-container">
        <div class="head">
          <h5>任务进展</h5>
          <div class="btn-group">
            <el-button
              type="primary"
              text
              @click="
                () => {
                  pictureMakingDialogVisible = true
                }
              "
              >+出图</el-button
            >
            <el-button
              type="primary"
              text
              @click="
                () => {
                  trainDialogVisible = true
                }
              "
              >+训练</el-button
            >
          </div>
        </div>
        <div class="scroll-box">
          <el-collapse accordion>
            <!-- name是唯一标识 控制伸缩 后边需要改字段 -->
            <el-collapse-item v-for="task in taskList" :name="task.title">
              <template #title> {{ task.title }} </template>
              <div>
                {{ task.content }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
    <el-dialog v-model="imgDialogVisible">
      <el-image fit="cover" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <trainDialog v-model="trainDialogVisible" />
    <pictureMakingDialog v-model="pictureMakingDialogVisible" />
  </div>
</template>

<style scoped lang="less">
@imgSize: 100px;
.content-container {
  display: flex;
  justify-content: space-between;
  .head {
    display: flex;
    align-items: center;
    height: 35px;
  }

  .scroll-box {
    height: 240px;
    overflow-y: scroll;
  }
  .img-container {
    width: 49%;

    :deep(.el-upload-list__item) {
      width: @imgSize;
      height: @imgSize;
      margin-top: 10px;
      margin-right: 16px;
      //
      //   .is-success:focus:not(:hover) {
      //     display: none !important;
      //   }

      /* element-ui el-upload框去除‘按 delete 键可删除’提示 */
      /deep/.el-icon--close {
        display: none !important;
        opacity: 0.1;
      }
    }
    :deep(.el-upload--picture-card) {
      width: @imgSize;
      height: @imgSize;
      margin-top: 10px;
    }

    .tip {
      font-size: 10px;
    }
  }
  .task-container {
    width: 49%;
    .head {
      justify-content: space-between;
    }
  }
}
</style>
