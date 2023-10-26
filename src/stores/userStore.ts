import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'userStore',
  state: () => {
    return {
      userId: 'user-jHJzoT20',
      userName: '',
      phone: '',
      email: '',
    }
  }
  // const user_uuid = ref('user-jHJzoT20');
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }


})
