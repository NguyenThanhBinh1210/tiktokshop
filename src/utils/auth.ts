import { Profile } from '~/types/auth.type'
import { handleUserLogin, handleUserLogout } from './onlineTracking'

export const setAccesTokenToLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearLS = () => {
  // Notify server about user logout
  handleUserLogout()
  
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  localStorage.removeItem('deviceId')
}

export const getAccessTokenFromLS = () => localStorage.getItem('access_token') || ''
export const getRefreshTokenFromLS = () => localStorage.getItem('refresh_token') || ''

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const getDarkModeFromLS = () => {
  const result = localStorage.getItem('darkmode')
  return result ? JSON.parse(result) : null
}

export const setProfileFromLS = (profile: Profile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
export const setDarkModeFromLS = (dark: boolean) => {
  localStorage.setItem('darkmode', JSON.stringify(dark))
}

export const getOrCreateDeviceId = () => localStorage.getItem('deviceId') || ''

// Login helper function that handles both setting profile and registering online status
export const handleSuccessfulLogin = (data: { user: Profile; token: string }) => {
  setAccesTokenToLS(data.token)
  setProfileFromLS(data.user)
  
  // Register user online status
  handleUserLogin({
    user: {
      _id: data.user._id
    },
    token: data.token
  })
  
  return data
}
