<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const selectedPet = ref()
const selectedStyle = ref('')
const styleList = ref(['outstanding', 'retro'])

// 监听宠物列表请求完成
watch(
  () => userStore.pets,
  (newVal) => {
    if (newVal.length > 0) {
      selectedPet.value = newVal[0].id
    }
  }
)

const imgList = ref([
  {
    id: '1',
    url: 'https://img1.baidu.com/it/u=244313577,3675477082&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  },
  {
    id: '2',
    url: 'https://img1.baidu.com/it/u=244313577,3675477082&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  },
  {
    id: '3',
    url: 'https://img1.baidu.com/it/u=244313577,3675477082&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
  }
])
</script>

<template>
  <div>
    <el-descriptions title="画廊">
      <el-descriptions-item label="数字宠物">
        <el-select v-model="selectedPet" class="m-2" placeholder="请选择你的宠物" size="small">
          <el-option
            v-for="item in userStore.pets"
            :key="item.id"
            :label="item.pet_name"
            :value="item.id"
        /></el-select>
      </el-descriptions-item>
      <el-descriptions-item label="风格">
        <el-select v-model="selectedStyle" class="m-2" placeholder="请选择你的风格" size="small">
          <el-option v-for="item in styleList" :key="item" :label="item" :value="item"
        /></el-select>
      </el-descriptions-item>
    </el-descriptions>

    <div class="img-list">
      <el-image
        v-for="item in imgList"
        style="width: 100px; height: 100px"
        fit="cover"
        :src="item.url"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.el-descriptions {
  width: 60%;
}

.el-image {
  width: 100px;
  height: 100px;
  margin-right: 16px;
}
</style>
