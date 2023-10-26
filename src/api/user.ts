import http from '@/http/request'


/**
 * 获取用户详情
 * @param body 
 * @returns 
 */
export const $getUserDescription = (body: {user_uuid:string}) =>
  http.get('/user/describeUser/', { params: { ...body } })
