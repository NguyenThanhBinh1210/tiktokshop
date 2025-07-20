import axios, { type AxiosInstance } from 'axios'
import { getAccessTokenFromLS, setAccesTokenToLS, setProfileFromLS, getOrCreateDeviceId, clearLS } from './auth' // Assume clearLS clears local storage
import toast from 'react-hot-toast'

class Chat {
  instance: AxiosInstance
  private accessToken: string
  private deviceId: string
  private isLogoutToastShown: boolean = false // Flag to track if the toast is already shown

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.deviceId = getOrCreateDeviceId()
    this.instance = axios.create({
      baseURL: 'https://chat.ordersdropship.com/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`
          config.headers['DeviceId'] = `${this.deviceId}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/v1/auth/login') {
          const newUser = response.data.user
          this.accessToken = response.data.token
          setProfileFromLS(newUser)
          setAccesTokenToLS(this.accessToken)
        }
        return response
      },
      (error) => {
        const { response } = error
        if (response?.status === 401 && response?.data?.reset && !this.isLogoutToastShown) {
          this.isLogoutToastShown = true // Set the flag to true
          clearLS() // Xóa token và thông tin người dùng khỏi localStorage
          toast.error('Bạn đã bị đăng nhập bởi thiết bị khác!')

          // Delay redirect to show the toast
          setTimeout(() => {
            this.isLogoutToastShown = false // Reset the flag after handling the error
            window.location.href = '/signin'
          }, 2000)
        } else if (response?.status === 401 && response?.data?.errMessage && !this.isLogoutToastShown) {
          this.isLogoutToastShown = true
          clearLS() // Xóa token và thông tin người dùng khỏi localStorage
          toast.error('Thiết bị bạn hết hạn đăng nhập hãy đăng nhập lại!')
          setTimeout(() => {
            this.isLogoutToastShown = false // Reset the flag after handling the error
            window.location.href = '/signin'
          }, 2000)
        }
        return Promise.reject(error)
      }
    )
  }
}

const postUser = new Chat().instance

export default postUser
