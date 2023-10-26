<!-- 弹窗外壳组件 -->
<script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
  title: string
  handelCreate?: () => void
  handelBeforeClose?: () => void
}>()

const emits = defineEmits(['update:modelValue'])

const handelClose = () => {
  if (props.handelBeforeClose) props.handelBeforeClose()
  emits('update:modelValue', false)
  // console.log('组件',props.modelValue)
}
</script>

<template>
  <el-dialog
    v-model="props.modelValue"
    :title="props.title"
    :before-close="handelClose"
    width="35%"
    align-center
  >
    <slot />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handelClose">取消</el-button>
        <el-button
          type="primary"
          @click="
            () => {
              props.handelCreate()
              emits('update:modelValue', false)
            }
          "
        >
          创建
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
