<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted, onBeforeMount } from 'vue'
import router from './router'

// const activePath = ref(router.currentRoute.value.path)

// onMounted(() => {
//   // <div>
//   console.log(router.currentRoute.value, activePath.value)
//   // activePath.value =
// })
</script>

<template>
  <el-container class="home-container">
    <el-container>
      <el-aside width="200px">
        <div class="title">TEPPET</div>
        <el-menu
          :router="true"
          :default-active="router.currentRoute.value.path"
          background-color="#1d222a"
          text-color="#fff"
        >
          <el-menu-item index="/">
            <template #title>
              <el-icon>
                <Right />
              </el-icon>
              <span>工作台</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/user">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>个人中心</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped lang="less">
@aside-color: #1d222a;
@main-color: #f2f3f5;
@head-color: #fff;
@primary-text: #409eff;

.el-header {
  background-color: @head-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border-bottom: 1px solid rgb(214, 214, 214);

  // color: @head-color-text;

  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }
  }
}

.el-aside {
  background-color: @aside-color;

  .title {
    color: @primary-text;
    font-size: 30px;
    font-weight: 500;
    margin: 10px 25px;
  }

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: @main-color;
  padding: 20px;
}

.el-aside {
  height: 100vh;
}

.el-main {
  height: calc(100vh - 60px);
}

.home-container {
  height: 100%;
}
</style>
