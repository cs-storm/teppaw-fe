<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import petInformation from './components/petInformation.vue'
import petGallery from './components/petGallery.vue'
import createPetDialogVue from './components/createPetDialog.vue'
import { getPetDescription } from '../../api/pet'

//创建宠物
const petDialogVisible = ref<boolean>(false)

const userEmailInput = ref<string>('')
const userInfo = reactive({
  phone: '15800000000',
  channel: '独立站',
  email: 'xxxxx@abc.com',
  digitalPets: ['alice', 'duobi', 'miemie']
})

onMounted(() => {
  console.log('env', import.meta.env.VITE_APP_DEV_URL)
  getPetDescription({
    pet_uuid: 'pet-99C32RwY'
  }).then(res => {
    console.log('res', res)
  }).catch(err => {
    console.log(err)
  })
})
</script>

<template>
  <div class="topContainer">
    <el-button type="primary" @click="() => {
      petDialogVisible = true
    }
      ">创建数字宠物</el-button>
    <el-input v-model="userEmailInput" class="email-input" placeholder="请输入邮箱检索用户" :suffix-icon="Search" />
  </div>
  <el-card>
    <el-descriptions title="用户信息" :column="2">
      <el-descriptions-item label="手机">{{ userInfo.phone }}</el-descriptions-item>
      <el-descriptions-item label="渠道">{{ userInfo.channel }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userInfo.email }}</el-descriptions-item>
      <el-descriptions-item label="数字宠物">
        <!-- TODO: 样式待调整 -->
        <div class="petList">
          <el-tag v-for="pet in userInfo.digitalPets">{{ pet }}</el-tag>
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <!-- 宠物信息 -->
  <el-card><pet-information /> </el-card>
  <!-- 画廊 -->
  <el-card><pet-gallery /></el-card>

  <createPetDialogVue v-model="petDialogVisible" />
</template>

<style scoped lang="less">
.topContainer {
  display: flex;
  justify-content: space-between;

  .email-input {
    width: 250px;
  }
}

.el-card {
  margin-top: 20px;

  .el-descriptions {
    width: 70%;

    .petList {
      display: inline-flex;
      flex-direction: column;
    }
  }
}
</style>
