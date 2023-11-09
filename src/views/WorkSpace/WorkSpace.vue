<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref, reactive, onMounted } from 'vue'
import petInformation from './components/petInformation.vue'
import petGallery from './components/petGallery.vue'
import createPetDialogVue from './components/createPetDialog.vue'
import { $getPetDescription } from '../../api/pet'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

//创建宠物
const petDialogVisible = ref<boolean>(false)

const userEmailInput = ref<string>('')
const userInfo = reactive({
  // phone: '',
  channel: '' //独立站
  // email: '',
  // digitalPets: []
})

onMounted(() => {
  // $getPetDescription({
  //   pet_uuid: 'pet-99C32RwY'
  // })
  //   .then((res) => {
  //     console.log('pet', res.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
})

// {
//     "user_name": "user10",
//     "password": "Teppaw33",
//     "phone_number": "15159248545",
//     "email": "973126591@qq.com",
//     "user_uuid": "user-jHJzoT20",
//     "request_id": "value1"
// }
</script>

<template>
  <div class="topContainer">
    <el-button
      type="primary"
      @click="
        () => {
          petDialogVisible = true
        }
      "
      >创建数字宠物</el-button
    >
    <el-input
      v-model="userEmailInput"
      class="email-input"
      placeholder="请输入邮箱检索用户"
      :suffix-icon="Search"
    />
  </div>
  <el-card>
    <el-descriptions title="用户信息" :column="2">
      <el-descriptions-item label="手机">{{ userStore.phone }}</el-descriptions-item>
      <el-descriptions-item label="渠道">{{ userInfo.channel }}</el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userStore.email }}</el-descriptions-item>
      <el-descriptions-item label="数字宠物">
        <!-- TODO: 样式待调整 -->
        <div class="petList">
          <el-tag v-for="pet in userStore.pets">{{ pet.pet_name }}</el-tag>
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
      .el-tag {
        margin-right: 5px;
      }
      // flex-direction: column;
    }
  }
}
</style>
