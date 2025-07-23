/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react'
import { Profile } from '~/types/auth.type'
import { clearLS, getAccessTokenFromLS, getProfileFromLS } from '~/utils/auth'
import { initializeSocket, registerOnlineStatusCallbacks, startOnlineStatusVerification } from '~/utils/onlineTracking'

interface User {
  id: string;
  [key: string]: unknown;
}

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: Profile | null
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
  reset: () => void
  onlineUsers: User[]
  onlineCount: number
  checkUserOnlineStatus: (userId: string) => boolean
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  onlineUsers: [],
  onlineCount: 0,
  checkUserOnlineStatus: () => false
})

const initialAppContext = getInitialAppContext()

export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<Profile | null>(initialAppContext.profile)
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [onlineCount, setOnlineCount] = useState<number>(0)

  // Initialize socket connection when the app starts
  useEffect(() => {
    if (isAuthenticated && profile) {
      // Initialize socket with the server URL
      initializeSocket('http://your-server-url:4002')
      
      // Register callbacks for online status changes
      registerOnlineStatusCallbacks({
        userCameOnline: (data) => {
          setOnlineCount(data.onlineCount)
          // Update online users list if needed
          setOnlineUsers(prev => {
            const existingUserIndex = prev.findIndex(user => user.id === data.user.id)
            if (existingUserIndex >= 0) {
              return prev
            } else {
              return [...prev, data.user]
            }
          })
        },
        userWentOffline: (data) => {
          setOnlineCount(data.onlineCount)
          // Update online users list if needed
          setOnlineUsers(prev => prev.filter(user => user.id !== data.user.id))
        },
        onlineUsersList: (data) => {
          setOnlineUsers(data.users)
          setOnlineCount(data.count)
        }
      })

      // Start periodic verification of online status
      startOnlineStatusVerification()

      return () => {
        // Cleanup will be handled by the socket module itself
      }
    }
  }, [isAuthenticated, profile])

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearLS()
  }

  // Check if a specific user is online
  const checkUserOnlineStatus = (userId: string): boolean => {
    return onlineUsers.some(user => user.id === userId)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        onlineUsers,
        onlineCount,
        checkUserOnlineStatus
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
