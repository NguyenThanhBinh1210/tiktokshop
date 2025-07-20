/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '~/utils/http'

export const createPayment = (body: any) => http.post('/v1/payment/create', body)
export const getPayment = (params: any) => http.get('/v1/payment/info-bank-user', { params })
export const getPaymentS = () => http.get('/v1/payment-admin')
export const createWallet = (body: any) => http.post('/v1/wallet/add', body)
export const getRechargeHistory = () => http.get(`/v1/wallet/history-user`)
export const getWithdrawalHistory = () => http.get(`/v1/wallet/history-user`)
export const createWithdrawal = (body: any) => http.post('/v1/wallet/withdraw', body)
export const getWallet = () => http.get('/v1/wallet/get-wallet')
export const getNumberOrder = () => http.get(`/v1/config/get-number-order`)
export const getGioiHanThem = () => http.get(`/v1/config/get-add`)
