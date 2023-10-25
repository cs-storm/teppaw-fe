import http from '@/http/request'

export const getPetDescription = (body: any) =>
  http.get('/pet/describePet/', { params: { ...body } })
