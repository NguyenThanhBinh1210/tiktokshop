/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'
export const createRandom = () => http.get('/v1/random/create')
export const getOrderDay = () => http.get('/v1/random/order-day-user')
export const getAllCountLenh = () => http.get('/v1/random/count-order-user')
export const updateLenh = (body: any) => http.patch('/v1/random/update', body)
export const getAllLenh = (params: any) => http.get('/v1/random/order-user', { params })
