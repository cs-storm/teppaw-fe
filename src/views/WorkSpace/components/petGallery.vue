<script setup lang="ts">
import { ref } from 'vue'

const selectedPet = ref('')
const selectedStyle = ref('')

// 宠物列表下拉
const petList = ref(['xx', 'yy'])

const styleList = ref(['outstanding', 'retro'])

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
          <el-option v-for="item in petList" :key="item" :label="item" :value="item"
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
