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
      pets: [] as { pet_name: string, id: number, pet_uuid: string }[]
    }
  }
  // const user_uuid = ref('user-jHJzoT20');
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }


})
