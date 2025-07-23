/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from 'react-hot-toast'
import useRouteElements from './routes/useRouteElements'
import { getOrCreateDeviceId } from './utils/utils'
import { useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { AppContext } from './contexts/app.context'
import { useQueryClient } from 'react-query'
import { initializeSocket, handleUserLogin } from './utils/onlineTracking'

const App = () => {
  const serverUrl = 'https://socket.ordersdropship.com'

  const { profile, reset } = useContext(AppContext)
  const [hasShownToast, setHasShownToast] = useState(false) // Add state to track if toast has been shown

  // Initialize online tracking system
  useEffect(() => {
    if (profile) {
      // Initialize socket for online tracking
      initializeSocket(serverUrl)
      
      // Register user as online
      handleUserLogin({
        user: {
          _id: profile._id
        },
        token: localStorage.getItem('access_token') || ''
      })
    }
  }, [profile])

  useEffect(() => {
    const socket = io(serverUrl)

    const handleResetUser = (data: any) => {
      const deviceId = getOrCreateDeviceId()
      console.log(data)
      if (profile?._id === data._id && deviceId !== data.deviceId && !hasShownToast) {
        reset()

        // Dismiss any existing toasts and show only one
        toast.dismiss()
        toast.error('Bạn đã bị đăng nhập bới thiết bị khác!')

        setHasShownToast(true) // Set flag to true after showing the toast
      } else if (profile?._id === data._id) {
        reset()
      }
    }

    const handleResetAdmin = () => {
      if (!hasShownToast) {
        reset()
        // Dismiss any existing toasts and show only one
        toast.dismiss()
        toast.error('Tài khoản bị buộc đăng xuất bởi quản trị viên!')

        setHasShownToast(true) // Set flag to true after showing the toast
      }
    }

    socket.on('resetUser', handleResetUser)
    socket.on('resetAdmin', handleResetAdmin)

    return () => {
      socket.off('resetUser', handleResetUser)
      socket.off('resetAdmin', handleResetAdmin)
      socket.disconnect() // Clean up the socket connection when the component unmounts
    }
  }, [profile, reset, hasShownToast])
  const queryClient = useQueryClient()
  const handleChangeWallet = () => {
    queryClient.invalidateQueries({ queryKey: ['my-wallet', 'deal'] })
    queryClient.invalidateQueries({ queryKey: ['my-wallet', 'menu'] })
    queryClient.invalidateQueries({ queryKey: ['my-wallet', 'withdrawal'] })
    queryClient.invalidateQueries({ queryKey: ['my-wallet', 'recharge'] })
  }
  useEffect(() => {
    const socket = io(serverUrl)
    socket.on('getRequest', handleChangeWallet)
    return () => {
      socket.off('getRequest', handleChangeWallet)
      socket.disconnect()
    }
  }, [])


  const routeElements = useRouteElements()
  return <>{routeElements}</>
}

export default App
