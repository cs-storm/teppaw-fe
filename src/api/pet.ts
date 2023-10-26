import http from '@/http/request'


/**
 * 获取宠物详情
 * @param body 
 * @returns 
 */
export const $getPetDescription = (body: any) =>
  http.get('/pet/describePet/', { params: { ...body } })


/**
 * 创建宠物
 * @param body 
 * @returns 
 */
export const $createPet = (body: { images: any, pet_name: string, belong_user_uuid: string }) =>
  http.post('/pet/createPet/', { ...body })
