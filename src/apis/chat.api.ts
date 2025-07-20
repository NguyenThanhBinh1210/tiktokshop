/* eslint-disable @typescript-eslint/no-explicit-any */
import chat from '~/utils/chat'
import http from '~/utils/http'
import postUser from '~/utils/post'
import upload from '~/utils/upload'

export const getCFMess = () => postUser.get('/v1/config-message/get-all')
export const getMessages = (limit: any, skip: any, receiver: string) =>
  chat.get(`/v1/message/get-message?limit=${limit}&&skip=${skip}&&receiver=${receiver}`)
export const createMessage = (body: any) => chat.post('/v1/message/create', body)
export const uploadImage = (body: any) => upload.post('/v1/message/upload', body)
export const uploadImageCloudinary = (body: any) => chat.post('/v1/message/upload-cloud', body)
export const getAllNoti = () => http.get('v1/noti/get-all')
